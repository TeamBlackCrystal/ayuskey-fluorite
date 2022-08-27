import { FC } from "react";
import { useNotes } from "../../state/note";
import { useSnapshot } from "valtio";
import { Note } from "./note";
import { theme } from "../../theme";
import { SpanText } from "../atoms/text";
import { CircleSpinner } from "react-spinners-kit";

export const Notes: FC = () => {
	const { notes, fetchNote } = useSnapshot(useNotes) as typeof useNotes;

	return (
		<div style={{ borderRadius: "3px", backgroundColor: theme.props.panel }}>
			<div style={{ padding: "14px" }}>
				{fetchNote && (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<CircleSpinner />
					</div>
				)}
				{notes.length === 0 && !fetchNote && <SpanText>ここには何も無いようです</SpanText>}
				{notes.map(
					(note) => (
						<div style={{ borderBottom: "solid black 1px" }} key={note.id}>
							{/* <Note note={note} isRenote={false} key={note.id} /> */}
							<Note originalNote={note} key={note.id} />
						</div>
					),
				)}
			</div>
		</div>
	);
};
