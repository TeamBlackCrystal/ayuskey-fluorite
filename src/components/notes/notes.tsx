import type { FC } from "react";
import { useNote } from "../../state/note";
import { useSnapshot } from "valtio";
import { Note } from "./note";
import { theme } from "../../theme";
import { SpanText } from "../common/text";
import { CircleSpinner } from "react-spinners-kit";

export const Notes: FC = () => {
	const { notes, fetchNote } = useSnapshot(useNote) as typeof useNote;

	return (
		<div style={{ borderRadius: "3px", backgroundColor: theme.props.panel }}>
			<div>
				{fetchNote && (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<CircleSpinner />
					</div>
				)}
				{notes.length === 0 && !fetchNote && <SpanText>ここには何も無いようです</SpanText>}
				{notes.map(
					(note) => (
            <div style={{borderBottom: `solid .4px ${theme.props.divider}`}} key={note.id}>
							<Note originalNote={note}  />
              </div>
					),
				)}
			</div>
		</div>
	);
};
