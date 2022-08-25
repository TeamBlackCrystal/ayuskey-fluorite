import { Note } from "ayuskey.js/built/entities"
import { useNotes } from "../state/note"

export const onNote = (note: Note) => {
  useNotes.addNote(note)
}
