import type { FC } from "react";
import { ImpulseSpinner } from "react-spinners-kit";
import ayuskeyIcon from "../assets/images/ayuskey.webp";

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
				<div><img src={ayuskeyIcon} alt="ayuskey" height="70px" /></div>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<ImpulseSpinner />
				</div>
			</div>
		</div>
	);
};
