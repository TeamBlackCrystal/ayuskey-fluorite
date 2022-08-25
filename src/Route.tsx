import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageTransition } from "./components/PageTransition";
import { UserProfile } from "./pages/user/profile";
import { useAuth } from "./store/auth";
import { useSnapshot } from "valtio";
import { Loading } from "./components/Loading";

const Home = lazy(() => import("./pages/home"));
const CallBack = lazy(() => import("./pages/cb"));
const Welcome = lazy(() => import("./pages/welcome"));

export default function Router() {
	const { data: account } = useSnapshot(useAuth);
	return (
		<PageTransition>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={account ? <Home /> : <Welcome />} />
					<Route path="/@:username" element={<UserProfile />} />
					<Route path="/cb" element={<CallBack />} />
				</Routes>
			</Suspense>
		</PageTransition>
	);
}
