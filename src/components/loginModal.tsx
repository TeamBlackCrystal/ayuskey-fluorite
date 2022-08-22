import React, { FC, useState } from "react";
import { Modal, Button, Text, Input, Loading } from "@nextui-org/react";
import { FaGlobe } from "react-icons/fa";
import { kinds } from "../models/permission";
import { useLocalStorage } from "../store/auth";
import { apiClient } from "strictcat";
import { useSnackbar } from "notistack";
import { strToBoolean } from "../utils/common";
import { Schema } from "../models/api";

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
	const storage = useLocalStorage();
	const handler = () => setVisible(true);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const closeHandler = () => {
		setVisible(false);
	};

	const Login = async () => {
		const api = apiClient<Schema>(`${instance}`);
		const createApp = await api.call(
			"POST",
			"/api/app/create",
			{},
			{
				callbackUrl: `${import.meta.env.VITE_FRONT_DOMAIN}/cb`,
				description: "test",
				name: "Ayuskey Fluorite",
				permission: kinds,
			},
		);
		if (createApp.type === "failed") {
			enqueueSnackbar("失敗", {
				variant: "error",
				anchorOrigin: { horizontal: "left", vertical: "top" },
			});
			setLoading(false);
			throw createApp.type, createApp.data;
		}
		console.log(instance);
		storage.add("_auth_secret", createApp.data.secret);
		const generateSession = await api.call(
			"POST",
			"/api/auth/session/generate",
			{},
			{ appSecret: createApp.data.secret },
		);

		if (generateSession.type === "failed") {
			setLoading(false);
			throw generateSession.type, generateSession.data;
		}
		if (storage.accounts && storage.mainAccount) {
			storage.accounts = [
				...storage.accounts,
				{ host: storage.mainAccount.host, i: storage.mainAccount.i },
			];
		} else if (storage.mainAccount) {
			storage.accounts = [
				{ host: storage.mainAccount.host, i: storage.mainAccount.i },
			];
		}
		storage.setMainAccountHost(instance);
		window.location.href = generateSession.data.url;
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
						disabled={strToBoolean(import.meta.env.VITE_PRODUCTION)}
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
