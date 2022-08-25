import { Grid, Card, Text, Loading } from "@nextui-org/react";
import newNoteSound from "../assets/sounds/syuilo/down.mp3";
import { FC, useEffect, useState } from "react";
import { Note } from "../components/notes/note";
import { useNotes } from "../state/note";
import useSound from "use-sound";
import { UserChnager } from "../components/notes/userChanger";

const Home = () => {
	const notes = useNotes();
	const [isTimeLineLoading] = useState(true);
	// const [play, { stop, pause }] = useSound(newNoteSound, {volume: 0.3});
  console.log('home')
	// useEffect(() => {
	// 	play();
	// }, [notes]);


	const MockItem: FC<{ text: string }> = ({ text }) => {
		return (
			<Card css={{ h: "$24", $$cardColor: "$colors$primary" }}>
				<Card.Body>
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
                            {/* <UserChnager /> */}
							</div>
						)}
            {notes.notes.length === 0 && <Text>ここには何も無いようです</Text>}
						{notes.notes.map(
							(note) => <div style={{borderBottom: "solid black 1px"}} key={note.id}><Note note={note} isRenote={false} key={note.id} /></div>,
						)}
					</Card.Body>
				</Card>
			</Grid>
			<Grid xs={12} sm={2}><MockItem text="ウィジェット" /></Grid>
		</Grid.Container>
	);
};

export default Home
