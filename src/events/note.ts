import { Note } from "@ayuskey/misskey.js/built/entities"
import { useNotes, useSubScribeNotes } from "../state/note"

export const onNote = (note: Note) => {
  console.log(note)
  useNotes.getState().addNote(note)
  const subscribeNote = useSubScribeNotes.getState()
  // if (subscribeNote.ids.length + 1 > 20) {
  //   const unSubscribeNoteID = subscribeNote.ids[0]
  //   ws.send(
  //     `{ "type": "un", "body": { "id": "${[unSubscribeNoteID]}" } }`,
  //   )
  //   subscribeNote.unsubscribe()
  // }
  subscribeNote.subscribe(note.id)
  // ws.send(
  //   `{
  //     "type": "sn",
  //     "body": {
  //       "id": "${note.id}"
  //     }
  //   }`,
  // );
}
