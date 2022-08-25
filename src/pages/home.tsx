import { Grid, Card, Text } from "@nextui-org/react";
import { FC, useState } from "react";

import { useNotes } from "../state/note";
import { useKeyPress } from "../hooks/useKeyPress";
import { CreateNoteModal } from "../components/notes/createNoteModal";
import { useCreateNoteModal } from "../store/common";
import { Note } from "../components/notes/note";
import { useSnapshot } from "valtio";

const Home = () => {
	const [isTimeLineLoading] = useState(true);
	const onKeyPress = (event: any) => {
		if (event.key === "n") {
			useCreateNoteModal.isOpen = true;
		}
	};

	const { notes } = useSnapshot(useNotes) as typeof useNotes
	useKeyPress(["n"], onKeyPress);
	// const [play, { stop, pause }] = useSound(newNoteSound, {volume: 0.3});
	console.log("home");
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
		<div>
			<CreateNoteModal />
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
							{notes.length === 0 && <Text>ここには何も無いようです</Text>}
							{notes.map(
								(note) => (
									<div
										style={{ borderBottom: "solid black 1px" }}
										key={note.id}
									>
										{/* <Note note={note} isRenote={false} key={note.id} /> */}
										<Note originalNote={note} key={note.id} />
									</div>
								),
							)}
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={2}><MockItem text="ウィジェット" /></Grid>
			</Grid.Container>
		</div>
	);
};

export default Home;
