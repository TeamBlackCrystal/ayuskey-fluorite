import { FC } from "react";
import { Note as NoteModel } from "ayuskey.js/built/entities";
import { Time } from "../time";
import { FaEllipsisH, FaPlus, FaReply, FaRetweet } from "react-icons/fa";
import "../../assets/css/note.css";
import { extractUrlFromMfm, MFM } from "../../utils/mfm";
import * as mfm from "mfm-js";
import UrlPreview from "./urlPreview";
import { UserName } from "../common/username";
import { theme } from "../../theme";
import { SpanText } from "../atoms/text";
import style from "styled-components";
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
	const instanceTextShadow =
		"1px 0 1px #000, 0.866px 0.5px 1px #000, 0.5px 0.866px 1px #000, 0 1px 1px #000, -0.5px 0.866px 1px #000, -0.866px 0.5px 1px #000, -1px 0 1px #000, -0.866px -0.5px 1px #000, -0.5px -0.866px 1px #000, 0 -1px 1px #000, 0.5px -0.866px 1px #000, 0.866px -0.5px 1px #000";

	return (
		<>
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
				<a
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
				</a>
				<FaRetweet />
				<span
					style={{
						overflow: "hidden",
						flexShrink: 1,
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<a
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
							<UserName user={originalNote.user}/>
						</span>
					</a>
					がRenote
				</span>
			</div>
		)}
		<article style={{ display: "flex", padding: "28px 32px 18px" }}>
			<a
				style={{
					flexShrink: 0,
					display: "block",
					margin: "0 14px 8px 0",
					width: "58px",
					height: "58px",
					position: "sticky",
					top: 0,
					alignSelf: "flex-start",
					left: 0,
				}}
			>
				<img
					src={note.user.avatarUrl}
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
				/>
			</a>
			<div className="main" style={{ flex: 1, minWidth: 0 }}>
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
				{note.user.instance && (
					<div
						style={{
							background: `linear-gradient(90deg, ${note.user.instance
								.themeColor}, rgba(134, 179, 0, 0))`,
							display: "flex",
							height: "1.1rem",
							overflow: "hidden",
							borderRadius: "4px 0 0 4px",
							color: "#fff",
							textShadow: instanceTextShadow,
						}}
					>
						<img
							src={note.user.instance.iconUrl}
							height="100%"
							style={{
								margin: "0px !important",
								marginRight: ".2em",
							}}
						/>
						<span
							style={{
								marginLeft: "4px",
								lineHeight: "1.1rem",
								fontSize: ".9em",
								verticalAlign: "top",
								fontWeight: 700,
							}}
						>
							{note.user.instance.name}
						</span>
					</div>
				)}
				<div className="body">
					<div className="text">
						<span style={{ whiteSpace: "pre-wrap" }}>
							{note.text && <MFM text={note.text} style={{ color: theme.text }} emojis={note.emojis} />}
							{urls && urls.map((url) => <UrlPreview url={url} />)}
						</span>
					</div>
				</div>
				<footer>
					<FooterButton><FaReply /></FooterButton>
					<FooterButton><FaRetweet /></FooterButton>
					<FooterButton><FaPlus /></FooterButton>
					<FooterButton><FaEllipsisH /></FooterButton>
				</footer>
			</div>
		</article>
		</>
	);
};
