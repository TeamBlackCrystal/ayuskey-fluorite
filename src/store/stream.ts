import { Stream } from "@ayuskey/misskey.js";
import create from "zustand";
import { Timelines } from "../models/timeline";
import {proxy} from "valtio"
type TCommon = {
	stream: Stream | null;
};

export const useStream = proxy<TCommon>({stream: null})

type TCurrentTimeline = {
	currentTimeline: Timelines
  setCurrentTimeline: (timeline: Timelines) => void
};

export const useCurrentTimeline = create<TCurrentTimeline>(
	(set) => ({
		currentTimeline: "homeTimeline",
    setCurrentTimeline(timeline: Timelines) {
        set(() => {
          return {currentTimeline: timeline}
        })
    },
	}),
);
