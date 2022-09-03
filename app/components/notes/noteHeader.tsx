import type { Note } from "ayuskey.js/built/entities"
import type { FC } from "react"
import { theme } from "../../theme"
import { SpanText } from "../common/text"
import { UserName } from "../common/username"
import { Time } from "../time"

interface Props {
  note: Note
}

export const NoteHeader: FC<Props> = ({note}) => {
  return (
    <header
    style={{
      display: "flex",
      alignItems: "baseline",
      whiteSpace: "nowrap",
    }}
  >
    <a
      style={{
        flexShrink: 1,
        display: "block",
        margin: "0 .5em 0 0",
        padding: 0,
        overflow: "hidden",
        fontSize: "1em",
        fontWeight: 700,
        textDecoration: "none",
        textOverflow: "ellipsis",
      }}
      className="name"
    >
      <span
        style={{
          whiteSpace: "pre",
          wordWrap: "normal",
          overflow: "hidden",
          textDecoration: "ellipsis",
        }}
      ><SpanText>
        <UserName user={note.user} />
        </SpanText>
      </span>
    </a>
    <div
      className="username"
      style={{
        flexShrink: 9999999,
        margin: "0 .5em 0 0",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <span>
        <SpanText>@{note.user.username}</SpanText>
        {note.user.instance && <SpanText>@{note.user.instance.host}</SpanText>}
      </span>
    </div>
    <div
      className="info"
      style={{ flexShrink: 0, marginLeft: "auto", fontSize: ".9em" }}
    >
      <Time originalTime={note.createdAt} style={{ color: theme.text }} />
    </div>
  </header>

  )

}
