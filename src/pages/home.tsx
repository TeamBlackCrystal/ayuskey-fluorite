import { Grid, Card, Text } from "@nextui-org/react";
import { FC } from "react";

import { useKeyPress } from "../hooks/useKeyPress";
import { CreateNoteModal } from "../components/notes/createNoteModal";
import { useCreateNoteModal } from "../store/common";
import { Notes } from "../components/notes/notes";
import { Timeline } from "../components/timeline";

const Home = () => {
	const onKeyPress = (event: any) => {
		if (event.key === "n" || "p") {
			useCreateNoteModal.isOpen = true;
		}
	};

	useKeyPress(["n", "p"], onKeyPress);
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
					<Timeline />
				</Grid>
				<Grid xs={12} sm={2}><MockItem text="ウィジェット" /></Grid>
			</Grid.Container>
		</div>
	);
};

export default Home;
