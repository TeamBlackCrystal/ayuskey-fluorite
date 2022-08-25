import { Card, Text } from "@nextui-org/react";
import { FC } from "react";
import { useNotes } from "../../state/note";
import { useSnapshot } from "valtio";
import { Note } from "./note";
import { FaComment, FaGlobe, FaHome, FaShareAlt, FaShareAltSquare } from "react-icons/fa";
import { theme } from "../../theme";
import { useStream } from "../../store/stream";
import styled from "styled-components";

const TIMELINES = [
	{
		name: "homeTimeline",
		element: <><FaHome />ホーム</>,
	},
	{
		name: "localTimeline",
		element: <><FaComment />ローカル</>,
	},
	{
		name: "hybridTimeline",
		element: <><FaShareAlt />ソーシャル</>,
	},
	{
		name: "globalTimeline",
		element: <><FaGlobe />グローバル</>,
	},
];

const Timeline = () => {
  const stream = useSnapshot(useStream)
  const TimelineContainer = styled.div`
  .active: before {
    background: ${theme.primary};
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: -8px;
    position: absolute;
    width: calc(100% + 16px);
  }
  `
  const TimelineButton = styled.button<{timeline:string}>`
  padding: 10px;
  font-weight: 700;
  color: ${props => stream.currentTimeline ===  props.timeline ? theme.primary : theme.text};
  `
	return (
		<TimelineContainer>
		{TIMELINES.map(
			(timeline) => (
				<TimelineButton key={timeline.name} timeline={timeline.name} className={`${stream.currentTimeline ===  timeline.name ? 'active': ''}`}>
					{timeline.element}
				</TimelineButton>
			),
		)}
		</TimelineContainer>
	);
};
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
