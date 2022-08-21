import { FC } from "react";
import { Avatar, Text } from "@nextui-org/react";
import { Note } from "@ayuskey/misskey.js/built/entities";

interface Props {
	note: Note;
}

export const RenoteHeader: FC<Props> = ({ note }) => {
	return (
		<>
		{note.renote && (
			<div style={{ display: "flex", alignItems: "center" }}>
				<Avatar src={note.user.avatarUrl} alt={note.user.name} size="sm" />
				<Text>{note.user.name ? note.user.name : note.user.username}がRenote</Text>
			</div>
		)}
		</>
	);
};
