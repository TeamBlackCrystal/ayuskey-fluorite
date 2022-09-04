import type { Note } from "ayuskey.js/built/entities";
import { proxy } from "valtio";

interface Notes {
	notes: Note[];
	fetchNote: boolean;
    changeFetchNode: (status: boolean) => void
    addNote: (note: Note) => void
}

export const useNote = proxy<Notes>({
		notes: [],
		fetchNote: false,
        changeFetchNode(status) {
            useNote.fetchNote = status
        },
        addNote: (note: Note) => {
          useNote.notes = [note, ...useNote.notes]
        }
});
