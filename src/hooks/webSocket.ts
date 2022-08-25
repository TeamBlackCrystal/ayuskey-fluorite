import { Stream } from "ayuskey.js";
import { Note } from "ayuskey.js/built/entities";
import { useEffect } from "react";
import { onNote } from "../events/note";
import { Timelines } from "../models/timeline";
import { useNotes } from "../state/note";
import { useLocalStorage } from "../store/auth";
import { useStream } from "../store/stream";
import { useAyuskeyClient } from "./useAyuskeyClient";
import { useLogin } from "./useLogin";
import { useAsync } from "react-async"
import { useSession } from "../store/session";
import { useSnapshot } from 'valtio'

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
	const storage = useLocalStorage;
  const login = useAsync({promiseFn: useLogin})
	const stream = login.data ? new Stream(`${storage.host}`, {
		token: String(login.data?.token),
	}) : null;
  const {currentTimeline} = useSnapshot(useStream)
	const api = useAyuskeyClient();
	useEffect(() => {
		if (!stream) return;
		const mainChannel = stream.useChannel("main");
    // mainChannel.on('', (notification) => {

    // })
	}, []);
	useEffect(() => {
		if (!stream) return;
		useStream.stream = stream;
		const homeTimeLine = stream.useChannel(currentTimeline);
		homeTimeLine.on("note", (note: Note) => {
			onNote(note);
		});
	}, [stream, currentTimeline]);
	useEffect(() => {
		if (!login.data) return;
		const currentE = getTimelineEndpoint(useStream.currentTimeline);
		if (currentE === null) return;
		api.request(currentE).then((res) => {
			res.reverse().map((note) => {
				useNotes.addNote(note);
			});
		});
    api.request('meta').then((res) => {
      useSession.meta = res
    })
	}, [api, stream, useStream.currentTimeline]);
	return stream;
};
