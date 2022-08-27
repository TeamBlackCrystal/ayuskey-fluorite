import { Card, Text } from "@nextui-org/react";
import { FC } from "react";
import { useNotes } from "../../state/note";
import { useSnapshot } from "valtio";
import { Note } from "./note";
import { FaComment, FaGlobe, FaHome, FaShareAlt, FaShareAltSquare } from "react-icons/fa";
import { theme } from "../../theme";
import { useStream } from "../../store/stream";
import styled from "styled-components";



export const Notes: FC = () => {
	const { notes } = useSnapshot(useNotes) as typeof useNotes;

	return (
		<Card css={{ borderRadius: "3px", backgroundColor: theme.props.panel }}>

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
