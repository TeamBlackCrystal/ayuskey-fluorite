import { Note as NoteModel } from "@ayuskey/misskey.js/built/entities";
import { Avatar, Button, Card, Collapse, Image, Text, Tooltip } from "@nextui-org/react";
import { FC, memo, useState } from "react";
import { FaReply } from "react-icons/fa";
import { Reply } from "./reply";
// import { MFM } from "./mfm";
import { NoteUser } from "./noteUser";
import { RenoteHeader } from "../renoteHeader";
import { Time } from "../time";
import { UserCard } from "../userCard";

interface Props {
	note: NoteModel;
	isRenote: boolean;
}

export const Note: FC<Props> = memo(({ note, isRenote }) => {
	const [openCW, setOpenCW] = useState(false);
	return (
		<>
		{note.reply && (
			<Note note={note.reply} isRenote={note.renote ? true : false} />
		)}
		<div style={{margin: note.reply ? '8px' : 0}}>
			<RenoteHeader note={note} />
			<div style={{ display: "flex", height: "100%" }}>
				<div
					style={{
						position: "sticky",
						top: 0,
						alignSelf: "flex-start",
						height: "100%",
					}}
				>
					{!note.renote && (
						<Tooltip content={<UserCard user={note.user} />}>
							<Avatar
								src={note.user.avatarUrl}
								alt={`${note.user.username}_${note.user.instance?.host}`}
							/>
						</Tooltip>
					)}
				</div>
				{<div style={{ width: "100%" }}>
					{!note.renote && <NoteUser note={note} />}
					{note.cw && (
						<div style={{ display: "flex" }}>
							{note.cw}
							<Button size="xs" onPress={() => setOpenCW(!openCW)}>
								{openCW ? "閉じる" : `もっと見る (${note.text?.length}) 文字`}
							</Button>
						</div>
					)}
					{openCW && (
						<>{note.replyId && <FaReply />}
						<Text style={{ overflowWrap: "break-word" }}>{note.text}</Text></>
					)}
					{!note.cw &&
						note.text &&
						(
              <div style={{display: "flex", alignItems: "center"}}>
							<>{note.replyId && <FaReply style={{marginRight: "4px"}}/>}
							<Text style={{ overflowWrap: "break-word" }}>{note.text}</Text></>
              </div>
						)}
					{note.renote && (
						<Note note={note.renote} isRenote={true} key={note.renote.id} />
					)}
					{note.files.map(
						(file) => <Image src={file.url} loading="lazy" key={file.id} />,
					)}
					<div className="note-reactions">
						{note.reactions.length > 0 && Object.values(note.reactions).map(
							(reaction) => <Text>{reaction}</Text>,
						)}
					</div>
					{note.renoteId && <div className="note-footer"><div>reply</div></div>}
				</div>}
			</div>
		</div>
		</>
	);
});
