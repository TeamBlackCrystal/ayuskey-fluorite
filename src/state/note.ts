import { Note } from "ayuskey.js/built/entities";
import {proxy} from "valtio"

type Notes = {
	notes: Note[];
  addNote: (note: Note) => void
};

export const useNotes = proxy<Notes>({
  notes: [],
  addNote: (note: Note) => {
    useNotes.notes = [note, ...useNotes.notes]
  }
})
