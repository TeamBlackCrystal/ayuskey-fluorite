import { Stream } from "@ayuskey/misskey.js";
import create from "zustand";
import { Timelines } from "../models/timeline";
import { useLocalStorage } from "./auth";

type TCommon = {
	stream: Stream | null;
	setStream: (stream: Stream) => void;
};
const storage = useLocalStorage.getState();
export const useStream = create<TCommon>(
	(set) => ({
		stream: null,
		setStream(stream) {
			set((state) => {
				return { stream: stream };
			});
		},
	}),
);

type TCurrentTimeline = {
	currentTimeline: Timelines
};

export const useCurrentTimeline = create<TCurrentTimeline>(
	(set) => ({
		currentTimeline: "homeTimeline",
	}),
);
