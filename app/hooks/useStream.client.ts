import { Stream } from "ayuskey.js";
import type { Note } from "ayuskey.js/built/entities";
import { useEffect, useMemo, useState } from "react";
import type { Timelines } from "../models/timeline";
import { useNote } from "../state/note";
import { AyuskeyClient } from "./useAyuskeyClient";
import { useAuth } from "~/state/auth";
import { useSession } from "~/state/session";
import { useStream } from "~/state/stream";
import { useSnapshot } from "valtio";
import { useFetcher } from "@remix-run/react";
import { useCommon } from "~/state/common";

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
	useCommon.host = JSON.parse(window.ENV).INSTANCE_URL;
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
