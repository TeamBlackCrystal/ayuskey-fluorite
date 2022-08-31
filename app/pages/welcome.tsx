import { motion, useAnimation } from "framer-motion";
import misskeyIcon from "../assets/svg/misskey.svg";
import {
	createMisskeyApp,
	createMisskeySession,
} from "~/middlewares/thirdparty.client";
import { AyuskeyClient } from "~/hooks/useAyuskeyClient";
import { setLocalStorage } from "~/utils/storage.client";
import Button, { LoadingButton } from "@atlaskit/button";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";

const Welcome = () => {
	const divAnimationControls = useAnimation();
	const api = AyuskeyClient();
	const [loading, setLoading] = useState(false);
    const data = useLoaderData()
    console.log(data)

	const handleLogin = async () => {
        setLoading(true)
		const app_secret = await createMisskeyApp(api, `${JSON.parse(data).FRONT_URL}/cb`);
		const session = await createMisskeySession({
			api: api,
			secret: app_secret.secret,
		});
		setLocalStorage("__token", app_secret.secret);
		window.location.href = session.url
	};

	return (
		<div style={{ position: "relative" }}>
			<div
				style={{
					display: "flex",
					minHeight: "100vh",
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundAttachment: "fixed",
				}}
			>
				<motion.div
					onClick={() =>
						window.location.href =
							"https://github.com/TeamBlackCrystal/ayuskey-fluorite"}
					style={{ cursor: "pointer" }}
					onHoverStart={() =>
						divAnimationControls.start({
							transform: ["rotate(0)", "rotate(-25deg)", "rotate(10deg)"],
						})}
					onHoverEnd={() => {
						divAnimationControls.stop();
					}}
				>
					<svg
						width="80"
						height="80"
						viewBox="0 0 250 250"
						aria-hidden="true"
						style={{
							fill: "var(--panel)",
							color: "white",
							position: "absolute",
							zIndex: 10,
							top: "auto",
							border: "0px",
							right: "0px",
						}}
					>
						<path
							d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
							data-v-0e5d0b1b=""
						/>
						<motion.path
							d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
							fill="currentColor"
							className="octo-arm"
							data-v-0e5d0b1b=""
							style={{ transformOrigin: "130px 106px" }}
							animate={divAnimationControls}
							transition={{ duration: 0.5, repeat: Infinity }}
						/>
						<path
							d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
							fill="currentColor"
							className="octo-body"
							data-v-0e5d0b1b=""
						/>
					</svg>
				</motion.div>
				<div
					style={{
						height: "100vh",
						width: "100vw",
						backgroundColor: "rgb(12, 18, 16)",
					}}
				>
					{/* {isLoading && (
				<motion.div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				>
					<Loading />
				</motion.div>
			)} */}
					<div>
						<div
							style={{
								display: "flex",
								textAlign: "center",
								minHeight: "100vh",
								boxSizing: "border-box",
								padding: "16px",
							}}
						>
							{/* <div
						style={{
							position: "absolute",
							top: 0,
							right: 0,
							width: "80%",
							height: "100%",
							backgroundImage: data?.bannerUrl
						}}
					/> */}
							<div
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									background: "rgb(180, 233, 0)",
									clipPath: "polygon(0% 0%,45% 0%,20% 100%,0% 100%)",
								}}
							/>
							<div
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									background: "rgb(180, 233, 0)",
									opacity: ".5",
									clipPath: "polygon(0% 0%,25% 0%,35% 100%,0% 100%)",
								}}
							></div>
							<img
								src={misskeyIcon}
								style={{
									position: "absolute",
									top: "42px",
									left: "42px",
									width: "140px",
								}}
							/>
							<div>
								<img
									src="https://cdn.jsdelivr.net/npm/@discordapp/twemoji@14.0.2/dist/svg/1f44d.svg"
									alt="👍"
									title="👍"
									decoding="async"
								/>
								<img
									src="https://cdn.jsdelivr.net/npm/@discordapp/twemoji@14.0.2/dist/svg/2764.svg"
									alt="❤"
									title="❤"
									decoding="async"
								/>
								<img
									src="https://cdn.jsdelivr.net/npm/@discordapp/twemoji@14.0.2/dist/svg/1f606.svg"
									alt="😆"
									title="😆"
									decoding="async"
								/>
								<img
									src="https://cdn.jsdelivr.net/npm/@discordapp/twemoji@14.0.2/dist/svg/1f389.svg"
									alt="🎉"
									title="🎉"
									decoding="async"
								/>
								<img
									src="https://nr.akarinext.org/twemoji/1f36e.svg"
									alt="🍮"
									title="🍮"
									decoding="async"
								/>
							</div>
							<div
								style={{
									position: "relative",
									width: "min(480px), 100%",
									margin: "auto auto auto",
									background: "rgb(25, 35, 32)",
									borderRadius: "12px",
									boxShadow: "0 12px 32px #00000040",
								}}
							>
								<img
									src="https://nr.akarinext.org/favicon.ico"
									style={{
										width: "85px",
										marginTop: "-47px",
										borderRadius: "100%",
										verticalAlign: "bottom",
									}}
								/>
								<div style={{ position: "relative", zIndex: 1 }}>
									<h1
										style={{
											display: "block",
											margin: 0,
											padding: "16px 32px 24px",
											fontSize: "1.4em",
										}}
									>
										<span style={{ color: "#DEE7E4" }}>{window.location.host}</span>
									</h1>
									<div style={{ padding: "0 32px" }}>
										<div style={{ textAlign: "center", color: "#DEE7E4" }}>
											ノートでつながるネットワーク
										</div>
									</div>
									<div style={{ padding: "32px", textAlign: "left" }}>
										{loading ? <LoadingButton>ログイン</LoadingButton> : (
											<Button onClick={async () => await handleLogin()}>ログイン</Button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
