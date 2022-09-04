import { useKeyPress } from "../hooks/useKeyPress";
import { Timeline } from "../components/timeline";
import { useCreateNoteModal } from "../store/common";
import { DefaultLayout } from "../components/defaultLayout";

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
		<DefaultLayout>
			<Timeline />
      </DefaultLayout>
	);
};

export default Home;
