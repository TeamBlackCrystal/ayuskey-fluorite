
import { Stream } from "@ayuskey/misskey.js";
import { Note } from "@ayuskey/misskey.js/built/entities";
import { useEffect, useState } from "react";
import { onNote } from "../events/note";
import { Timelines } from "../models/timeline";
import { useNotes } from "../state/note";
import { useLocalStorage } from "../store/auth";
import { useCurrentTimeline, useStream } from "../store/stream";
import { useAyuskeyClient } from "./useAyuskeyClient";

const storage = useLocalStorage.getState()
const stream = new Stream(`https://${storage.host}`, {token: String(storage.i)})

const getTimelineEndpoint = (timeline: Timelines) => {
  switch (timeline) {
    case 'globalTimeline': return 'notes/global-timeline'
    case 'homeTimeline' : return 'notes/timeline'
    case 'localTimeline' : return 'notes/local-timeline'
    case 'hybridTimeline' : return 'notes/hybrid-timeline'
    default: return null
  }
}

export const useStreaming = () => {
  const storage = useLocalStorage()
  const api = useAyuskeyClient()
  const {currentTimeline} = useCurrentTimeline.getState()
  // const [stream, setStream] = useState<Stream | null>(null)
  useEffect(() => {
    const mainChannel = stream.useChannel('main')
    // setStream(stream)
  }, [storage.i])

  useEffect(() => {
    if (!stream) return
    useStream.getState().setStream(stream)
    const homeTimeLine = stream.useChannel('homeTimeline')
    homeTimeLine.on('note', (note: Note) => {
      onNote(note)
    })
  }, [stream]);
  useEffect(() => {
    const currentE = getTimelineEndpoint(currentTimeline)
    if (currentE === null) return
    api.request(currentE).then((res) => {
      res.reverse().map((note) => {
        useNotes.getState().addNote(note)
      })
    })
  }, [api, stream, currentTimeline])
  return stream
};
