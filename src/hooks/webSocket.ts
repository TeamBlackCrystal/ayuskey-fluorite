import { Stream } from "ayuskey.js";
import type { Note } from "ayuskey.js/built/entities";
import { useEffect, useMemo } from "react";
import type { Timelines } from "../models/timeline";
import { useNote } from "../state/note";
import { AyuskeyClient } from "./useAyuskeyClient";

import { useSnapshot } from "valtio";
import { useAuth } from "../state/auth";
import { useStream } from "../state/stream";
import { useCommon } from "../state/common";
import { useSession } from "../state/session";

const getTimelineEndpoint = (timeline: Timelines) => {
	switch (timeline) {
		case "globalTimeline":
			return "notes/global-timeline";
		case "homeTimeline":
			return "notes/timeline";
		case "localTimeline":
			return "notes/local-timeline";
		case "hybridTimeline":
			return "notes/hybrid-timeline";
		default:
			return null;
	}
};

export const useStreaming = () => {
	const { account } = useSnapshot(useAuth);
	const { currentTimeline } = useSnapshot(useStream);

	//@ts-ignore
	useCommon.host = import.meta.env.VITE_INSTANCE_DOMAIN;
	const { host } = useSnapshot(useCommon);

	const stream = useMemo(
		() =>
			//@ts-ignore
			account ? new Stream(host, {
				token: String(account?.token),
			}) : null,
		[account],
	);
	const api = AyuskeyClient();
	useEffect(() => {
		if (!stream) return;
		const mainChannel = stream.useChannel("main");
		// mainChannel.on('', (notification) => {

		// })
	}, [stream]);
	useEffect(() => {
		if (!stream) return;
		useStream.stream = stream;
		const homeTimeLine = stream.useChannel(currentTimeline);
    console.log('切り替えた', currentTimeline)
		homeTimeLine.on("note", (note: Note) => {
			useNote.addNote(note);
		});
	}, [stream, currentTimeline]);
	useEffect(() => {
		if (!account) return;
		const currentE = getTimelineEndpoint(useStream.currentTimeline);
		if (currentE === null) return;
		useNote.changeFetchNode(true);
		api.request(currentE).then((res) => {
			res.reverse().map((note) => {
				useNote.addNote(note);
			});
			useNote.changeFetchNode(false);
		});
		api.request("meta").then((res) => {
			useSession.meta = res;
		});
	}, [api, stream, currentTimeline, account]);
	return stream;
};
