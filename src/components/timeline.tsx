import type { FC, ReactNode } from "react";
import { theme } from "../theme";
import style from "styled-components";
import {
	FaComment,
	FaGlobe,
	FaHome,
	FaShareAlt,
} from "react-icons/fa";
import type { Timelines } from "../models/timeline";
import { useNote } from "../state/note";
import { useSnapshot } from "valtio";
import { Panel } from "./common/panel";
import { Notes } from "./notes/notes";
import { Button } from "./common/button";
import { useStream } from "../state/stream";

const Base = style.div`
display: flex;
width: 100%;
-webkit-backdrop-filter: blur(15px);
backdrop-filter: blur(15px);
border-bottom: solid .5px ${theme.props.divider};
contain: strict;
height: 55px;
`;

const TitleContainer = style.div`
display: flex;
align-items: center;
max-width: 400px;
overflow: auto;
white-space: nowrap;
text-align: left;
font-weight: 700;
flex-shrink: 0;
margin-left: 24px;
`;

const Title = style.div`
min-width: 0;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
line-height: 1.1;
color: ${theme.text};
`;

const Tabs = style.div`
position: relative;
margin-left: 16px;
font-size: .8em;
overflow: auto;
white-space: nowrap;

.active {
  opacity: 1;
}
`;

const TabButton:FC<{children: ReactNode}> = ({children, ...props}) => {
  return (<Button style={{display: "inline-block",
    position: "relative",
    padding: "0 10px",
    height: "100%",
    fontWeight: 400,
    color: theme.text}} {...props}>{children}</Button>)
}

const TIMELINES = [
	{
		name: "homeTimeline",
		element: <FaHome />,
	},
	{
		name: "localTimeline",
		element: <FaComment />,
	},
	{
		name: "hybridTimeline",
		element: <FaShareAlt />,
	},
	{
		name: "globalTimeline",
		element: <FaGlobe />,
	},
];

export const Timeline: FC = () => {
	const { currentTimeline } = useSnapshot(useStream);
	const { stream } = useSnapshot(useStream);
	const changeTimeline = (timeline: Timelines) => {
		if (currentTimeline === timeline) return;
		if (!stream) throw "error";
		useNote.notes = [];
		useStream.currentTimeline = timeline;
	};
	return (
		<div>
			<div style={{ position: "sticky", top: "0", zIndex: "1000" }}>
				<div
					style={{
						background: theme.base === "dark" ? "rgba(16, 16, 20, 0.85)" : "",
						height: "55px",
						display: "flex",
						width: "100%",
						backdropFilter: "blur(15p)",
						borderBottom: `solid .5 ${theme.props.divider}`,
						contain: "strict",
					}}
				>
					<Base>
						<TitleContainer>
							<FaHome
								color={theme.text}
								style={{
									marginRight: "8px",
									width: "16px",
									textAlign: "center",
								}}
							/>
							<Title>タイムライン</Title>
						</TitleContainer>
						<Tabs>
							{TIMELINES.map(
								(timeline) => (
									<TabButton
                  key={timeline.name}
										className="active"
										onClick={() => changeTimeline(timeline.name as Timelines)}
									>
										{timeline.element}
									</TabButton>
								),
							)}
							{/* <TabButton className="active" onClick={() => changeTimeline('homeTimeline')}>{timeline.}</TabButton> */}
						</Tabs>
					</Base>
				</div>
			</div>
			<div style={{ padding: "24px" }}><Panel><Notes /></Panel></div>
		</div>
	);
};
