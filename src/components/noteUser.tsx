import { FC } from "react";
import { Image, Spacer, Text, Tooltip } from "@nextui-org/react";
import { Note } from "@ayuskey/misskey.js/built/entities";
import { Time } from "./time";
import { FaGlobe, FaHome, FaUnlock } from "react-icons/fa";
import {GiEarthAmerica} from "react-icons/gi"

interface Props {
	note: Note;
}

export const NoteUser: FC<Props> = ({ note }) => {
	const instanceTextShadow =
		"1px 0 1px #000, 0.866px 0.5px 1px #000, 0.5px 0.866px 1px #000, 0 1px 1px #000, -0.5px 0.866px 1px #000, -0.866px 0.5px 1px #000, -1px 0 1px #000, -0.866px -0.5px 1px #000, -0.5px -0.866px 1px #000, 0 -1px 1px #000, 0.5px -0.866px 1px #000, 0.866px -0.5px 1px #000";

	return (
		<div style={{ flex: 1 }}>
			<div
				style={{
					display: "flex",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				<Text>{note.user.name}</Text>
				<Text>
					@{note.user.username}
					{note.user.instance?.host && <>@{note.user.instance?.host}</>}
				</Text>
				<Spacer />
        <div style={{display: "flex", alignItems:"center",  marginLeft: "auto"}}>
				<Time originalTime={note.createdAt} />
        {note.visibility === 'followers' && <FaUnlock />}
        {note.visibility === 'home' && <Tooltip content="ホーム"><FaHome /></Tooltip>}
        {note.user.instance && <Tooltip content="リモート"><GiEarthAmerica color="#4dabf7"/></Tooltip>}
        </div>

			</div>
			{note.user.instance && (
				<div
					style={{
						background: `linear-gradient(90deg, ${note.user.instance
							.themeColor}, rgba(134, 179, 0, 0))`,
						display: "flex",
					}}
				>
					<Image
						src={note.user.instance.iconUrl}
						height="1em"
						width="1em"
						containerCss={{
							margin: "0px !important",
							marginRight: ".2em",
						}}
					/>
					<Text
						style={{
							display: "flex",
							alignItems: "center",
							textShadow: instanceTextShadow,
							height: "1.1rem",
							borderRadius: "4px 0 0 4px",
							overflow: "hidden",
							color: "white",
						}}
					>
						{note.user.instance.name}
					</Text>
				</div>
			)}
		</div>
	);
};
