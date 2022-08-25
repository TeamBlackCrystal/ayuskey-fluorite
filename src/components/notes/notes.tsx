import { Card, Text } from "@nextui-org/react";
import { FC } from "react";
import { useNotes } from "../../state/note";
import { useSnapshot } from "valtio";
import { Note } from "./note";

export const Notes: FC = () => {
	const { notes } = useSnapshot(useNotes) as typeof useNotes;

	return (
		<Card css={{ borderRadius: "3px" }}>
			<Card.Body style={{ padding: "14px" }}>
				{notes.length === 0 && <Text>ここには何も無いようです</Text>}
				{notes.map(
					(note) => (
						<div style={{ borderBottom: "solid black 1px" }} key={note.id}>
							{/* <Note note={note} isRenote={false} key={note.id} /> */}
							<Note originalNote={note} key={note.id} />
						</div>
					),
				)}
			</Card.Body>
		</Card>
	);
};
