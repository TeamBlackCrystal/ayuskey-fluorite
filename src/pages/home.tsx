import { Stack } from "@chakra-ui/react";
import { Grid, Card, Text, Avatar, Loading, Button } from "@nextui-org/react";
import newNoteSound from "../assets/sounds/syuilo/down.mp3";
import { FC, useEffect, useState } from "react";
import { Note } from "../components/note";
import { useNotes } from "../state/note";
import Sound from "react-sound";
import useSound from "use-sound";
import { useQuery } from "react-query";

export const Home = () => {
	const notes = useNotes();
	const [isTimeLineLoading, setTimeLineLoading] = useState(true);
	const [play, { stop, pause }] = useSound(newNoteSound, {volume: 0.3});

	// const _notes = useQuery("global-time-line", getGlobalTimeLine);
	// useEffect(() => {
	// 	if (_notes.data) {
	// 		const __notes = _notes.data;
	// 		__notes?.reverse().map((note) => {
	// 			notes.addNote(note);
	// 		});
	// 	}
	// }, [_notes.isLoading]);
	useEffect(() => {
		play();
	}, [notes]);
	// useEffect(() => {
	// 	const init_ws = () =>
	// 		setTimeout(() => {
	// 			if (!ws.session.readyState) {
	// 				init_ws();
	// 			}
	// 			setTimeLineLoading(false);
	// 			console.log("きた");
	// 			ws.session.send(
	// 				`{"type": "connect","body": {"channel": "main","id": "${Math.random().toString(
	// 					2,
	// 				).substring(2, 8)}"}}`,
	// 			);
	// 			ws.session.send(
	// 				`{"type": "connect","body": {"channel": "globalTimeline","id": ${Math.random().toString(
	// 					2,
	// 				).substring(2, 8)}}}`,
	// 			);
	// 		}, 1000);
	// 	init_ws();
	// }, []);

	const MockItem: FC<{ text: string }> = ({ text }) => {
		return (
			<Card css={{ h: "$24", $$cardColor: "$colors$primary" }}>
				<Card.Body>
					{/* <Button onClick={() => console.log()}>aa</Button> */}
					<Text h6={true} size={15} color="white" css={{ mt: 0 }}>{text}</Text>
				</Card.Body>
			</Card>
		);
	};
	return (
		<Grid.Container gap={1} justify="center" style={{ width: "100%" }}>
			<Grid xs={12} sm={2}><MockItem text="ウィジェット" /></Grid>
			<Grid xs={12} sm={6}>
				{/* <MockItem text="2 of 3" /> */}
				<Card css={{ borderRadius: "3px" }}>
					<Card.Body style={{ padding: "14px" }}>
						{isTimeLineLoading && (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: "100%",
								}}
							>
								<Loading />
							</div>
						)}
            {notes.notes.length === 0 && <Text>ここには何も無いようです</Text>}
						{notes.notes.map(
							(note) => <div style={{borderBottom: "solid black 1px"}}><Note note={note} isRenote={false} key={note.id} /></div>,
						)}
					</Card.Body>
				</Card>
			</Grid>
			<Grid xs={12} sm={2}><MockItem text="ウィジェット" /></Grid>
		</Grid.Container>
	);
};
