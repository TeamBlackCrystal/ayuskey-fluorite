import { Note } from "ayuskey.js/built/entities";
import {proxy} from "valtio"

type Notes = {
	notes: Note[];
  fetchNote: boolean,
  changeFetchNode: (status: boolean) => void
  addNote: (note: Note) => void
};

export const useNotes = proxy<Notes>({
  notes: [],
  fetchNote: false,
  changeFetchNode(status) {
      useNotes.fetchNote = status
  },
  addNote: (note: Note) => {
    useNotes.notes = [note, ...useNotes.notes]
  }
})
