import { Grid, Card, Text } from "@nextui-org/react";
import { FC } from "react";

import { useKeyPress } from "../hooks/useKeyPress";
import { CreateNoteModal } from "../components/notes/createNoteModal";
import { useCreateNoteModal } from "../store/common";
import { Notes } from "../components/notes/notes";
import { Timeline } from "../components/timeline";
import { theme } from "../theme";
import style from "styled-components";
import { Sidebar } from "../components/sidebar";



const Contents = style.div`
min-width: 0;
min-height: 100vh;
width: 750px;
margin: 0 16px 0 0;
background: ${theme.props.panel};
border-left: solid 1px ${theme.props.divider};
border-right: solid 1px ${theme.props.divider};
border-radius: 0;
overflow: clip;
`;

const Widgets = style.div`
width: 300px;
margin-top: 16px;
`;

const Columns = style.div`
display: flex;
justify-content: center;
max-width: 100%;
`;

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

	return (
		<Columns>
			<CreateNoteModal />
				<Sidebar />
				<Contents><Timeline /></Contents>
				<Widgets></Widgets>
		</Columns>
	);
};

export default Home;
