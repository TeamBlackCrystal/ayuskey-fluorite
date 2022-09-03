import type { FC } from "react";
import type { Note as NoteModel } from "ayuskey.js/built/entities";
import { FaEllipsisH, FaPlus, FaReply, FaRetweet } from "react-icons/fa";
import "../../assets/css/note.css";
import { extractUrlFromMfm, MFM } from "../../utils/mfm";
import * as mfm from "mfm-js";
import UrlPreview from "./urlPreview";
import { UserName } from "../common/username";
import { theme } from "../../theme";
import style from "styled-components";
import { NoteHeader } from "./noteHeader";
import { InstanceSticker } from "./instanceSticker";
import { Avatar } from "../common/avatar";
import { Time } from "../time";
import { Link } from "../common/link";
import { Panel } from "../common/panel";
interface Props {
	originalNote: NoteModel;
}

const FooterButton = style.button`
color: ${theme.text};
margin-right: 28px;
margin: 0;
padding: 8px;
opacity: .7;
`;

export const Note: FC<Props> = ({ originalNote }) => {
	const note = originalNote?.renote ? originalNote.renote : originalNote;
	const urls = note.text ? extractUrlFromMfm(mfm.parse(note.text)) : null;

	return (
		<Panel>
		{originalNote.renote && (
			<div
				className="renote"
				style={{
					display: "flex",
					alignItems: "center",
					padding: "16px 32px 8px",
					lineHeight: "28px",
					whiteSpace: "pre",
					color: "rgb(99, 226, 183)",
				}}
			>
				<Link
					href={
						`/@${originalNote.user.username}` + (
							originalNote.user.instance ? `@/${originalNote.user.instance
								.host}` : ""
						)
					}
					style={{
						flexShrink: 0,
						position: "relative",
						verticalAlign: "bottom",
						lineHeight: "16px",
						display: "inline-block",
						width: "28px",
						height: "28px",
						margin: "0 8px 0 0",
						borderRadius: "6px",
					}}
				>
					<img
						src={originalNote.user.avatarUrl}
						style={{
							position: "absolute",
							inset: 0,
							borderRadius: "100%",
							zIndex: 1,
							overflow: "hidden",
							objectFit: "cover",
							width: "100%",
							height: "100%",
						}}
						alt={originalNote.user.username}
					/>
				</Link>
				<FaRetweet />
				<span
					style={{
						overflow: "hidden",
						flexShrink: 1,
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Link
						href={
							`/@${originalNote.user.username}` + (
								originalNote.user.instance ? `@/${originalNote.user.instance
									.host}` : ""
							)
						}
						style={{ fontWeight: 700 }}
					>
						<span
							style={{
								whiteSpace: "pre",
								wordWrap: "normal",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
              <Link href={`/user/${originalNote.user.username}${originalNote.user.host && `@${originalNote.user.host}`}`}>
							<UserName user={originalNote.user} />
              </Link>
						</span>
					</Link>
					がRenote
				</span>
				<div style={{ marginLeft: "auto", fontSize: "0.9em" }}>
					<Time
						originalTime={originalNote.createdAt}
						style={{ flexShrink: 0, color: "inherit" }}
					/>
				</div>
			</div>
		)}
		<article style={{ display: "flex", padding: "28px 32px 18px" }}>
			<Link
				style={{
					flexShrink: 0,
					display: "block",
					margin: "0 14px 8px 0",
					width: "58px",
					height: "58px",
					position: "sticky",
					top: 55,
					alignSelf: "flex-start",
					left: 0,
				}}
			>
				<Avatar
					user={originalNote.user}
					style={{
						flexShrink: 0,
						display: "block",
						margin: "0 14px 8px 0",
						width: "58px",
						height: "58px",
						position: "sticky",
						top: 0,
						left: 0,
					}}
				/>
			</Link>
			<div className="main" style={{ flex: 1, minWidth: 0 }}>
				<NoteHeader note={note} />
				<InstanceSticker note={note} />
				<div className="body">
					<div className="text">
						<span
							style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
						>
							{note.text && (
								<MFM
									text={note.text}
									style={{ color: theme.text }}
									emojis={note.emojis}
								/>
							)}
							{urls && urls.map((url) => <UrlPreview url={url} />)}
						</span>
					</div>
				</div>
				<footer>
					<FooterButton aria-label="返信"><FaReply /></FooterButton>
					<FooterButton aria-label="リノート"><FaRetweet /></FooterButton>
					<FooterButton aria-label="リアクション"><FaPlus /></FooterButton>
					<FooterButton aria-label="その他"><FaEllipsisH /></FooterButton>
				</footer>
			</div>
		</article>
		</Panel>
	);
};
