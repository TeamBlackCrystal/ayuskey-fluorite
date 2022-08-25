import { Image, Loading as NextUILoading } from "@nextui-org/react";
import { FC } from "react";
import ayuskeyIcon from "../assets/images/ayuskey.webp"

export const Loading: FC = () => {
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#232323",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<div>
					<img
						src={ayuskeyIcon}
						alt="ayuskey"
						height="70px"
					/>
				</div>
				<NextUILoading type="points-opacity" />
			</div>
		</div>
	);
};
