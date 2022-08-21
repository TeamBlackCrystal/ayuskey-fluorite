import { Note } from "@ayuskey/misskey.js/built/entities";
import create from "zustand";

type Notes = {
	notes: Note[];
	addNote: (newNote: Note) => void;
  // addReaction: (noteID: string, reaction: string) => void;
};

export const useNotes = create<Notes>(
	(set) => ({
		notes: [],
		addNote: (newNote: Note) =>
			set((state) => {
        if (!useSubScribeNotes.getState().ids.includes(newNote.id)) {
          return { notes: [newNote, ...state.notes] };
        }
        useSubScribeNotes.getState().subscribe(newNote.id)
        return { notes: state.notes };
			})
      // addReaction(noteID, reaction) {
      //     set((state) => {
      //       let findNote = state.notes.find((note) => {return note.id = noteID})
      //       if (findNote) {
      //         if (findNote.reactions[reaction]) {
      //           findNote.reactions[reaction] = findNote.reactions[reaction] + 1
      //         }
      //         findNote.reactions[reaction] = 1
      //         state.notes.map((note) => {
      //           if (note.id = noteID) {
      //             note = findNote
      //           }
      //         })
      //       }

      //       return {notes: state.notes}
      //     })
      // },
	}),
);

type subscribeNotes = {
  ids: string[]
  subscribe: (id: string) => void
  unsubscribe: () => void
}

export const useSubScribeNotes = create<subscribeNotes>(
  (set) => ({
    ids: [],
    subscribe(id) {
        set((state) => {
          return {ids: [...state.ids, id]}
        })
    },
    unsubscribe() {
        set((state) => {
          state.ids.shift()
          return {ids: [...state.ids]}
        })
    },
  })
)
