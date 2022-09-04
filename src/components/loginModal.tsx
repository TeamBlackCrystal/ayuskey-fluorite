import React, { FC, useState } from "react";
import { Modal, Button, Text, Input, Loading } from "@nextui-org/react";
import { FaGlobe } from "react-icons/fa";
import { apiClient } from "strictcat";
import { useSnackbar } from "notistack";
import { strToBoolean } from "../utils/common";
import { Schema } from "../models/api";
import {
	createMisskeyApp,
	createMisskeySession,
} from "../middlewares/thirdparty";
import { setLocalStorage } from "../utils/storage";

interface Props {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	useButton?: boolean;
}

export const LoginModal: FC<Props> = (
	{ visible, setVisible, useButton = true },
) => {
	const [instance, setInstance] = useState(
		import.meta.env.VITE_INSTANCE_DOMAIN,
	);
	const [isLoading, setLoading] = useState(false);
	const handler = () => setVisible(true);
	const { enqueueSnackbar } = useSnackbar();

	const closeHandler = () => {
		setVisible(false);
	};

	const Login = async () => {
		const api = apiClient<Schema>(`${instance}`);
		const app = await createMisskeyApp(api);
		if (app.type === "failed") {
			enqueueSnackbar("失敗", {
				variant: "error",
				anchorOrigin: { horizontal: "left", vertical: "top" },
			});
			setLoading(false);
			throw app.type, app.data;
		}
		setLocalStorage("_auth_secret", app.data.secret);
		const session = await createMisskeySession({
			api,
			secret: app.data.secret,
		});
		if (session.type === "failed") {
			setLoading(false);
			throw session.type, session.data;
		}
    setLocalStorage('_host', instance)
		window.location.href = session.data.url;
	};

	return (
		<div>
			{useButton && (
				<Button auto={true} shadow={true} onPress={handler}>ログイン</Button>
			)}
			<Modal
				closeButton={true}
				aria-labelledby="ログインモーダル"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Welcome to<Text b={true} size={18}>Ayuskey Fluorite</Text>
					</Text>
				</Modal.Header>
				<Modal.Body>
					<Input
						aria-label="インスタンス名"
						clearable={
							strToBoolean(import.meta.env.VITE_PRODUCTION) ? false : true
						}
						bordered={true}
						fullWidth={true}
						disabled={true}
						value={instance}
						color="primary"
						size="lg"
						onChange={(e) => setInstance(e.target.value)}
						placeholder="https://kr.akirin.xyz"
						contentLeft={<FaGlobe />}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button auto={true} flat={true} color="error" onPress={closeHandler}>
						Close
					</Button>
					<Button auto={true} onPress={Login} disabled={isLoading}>
						{isLoading ? (
							<Loading type="points-opacity" color="currentColor" size="sm" />
						) : <>Sign in</>}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
