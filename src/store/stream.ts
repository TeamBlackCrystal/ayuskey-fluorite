import { Stream } from "ayuskey.js";
import { Timelines } from "../models/timeline";
import { proxy } from "valtio";

type TCommon = {
	stream: Stream | null;
	currentTimeline: Timelines;
};

export const useStream = proxy<TCommon>({
	stream: null,
	currentTimeline: "homeTimeline",
});
