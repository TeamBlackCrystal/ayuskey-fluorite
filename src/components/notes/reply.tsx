import { Note as NoteModel  } from "ayuskey.js/built/entities"
import { FC } from "react"
import { Note } from "./note"

interface Props {
  note: NoteModel
}

export const Reply: FC<Props> = ({note}) => {
  if (!note.reply) {
    return <></>
  }
  return (
    <Note note={note.reply} isRenote={false}/>
  )
}
