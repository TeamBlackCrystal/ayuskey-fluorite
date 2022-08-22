import React, { useState } from "react";
import {
	Modal,
	Button,
	Text,
	Input,
	Loading,
} from "@nextui-org/react";
import {
	FaGlobe,
} from "react-icons/fa";
import { kinds } from "../models/permission";
import { useLocalStorage } from "../store/auth";
import { apiClient } from "strictcat";
import { useSnackbar } from "notistack";

export const LoginModal = () => {
	const [visible, setVisible] = useState(false);
	const [instance, setInstance] = useState("");
	const [isLoading, setLoading] = useState(false);
	const storage = useLocalStorage();
	const handler = () => setVisible(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const closeHandler = () => {
		setVisible(false);
		console.log("closed");
	};

	const Login = async () => {
		const api = apiClient<Schema>(`${instance}`);
		const createApp = await api.call(
			"POST",
			"/api/app/create",
			{},
			{
				callbackUrl: "http://localhost:5173/cb",
				description: "test",
				name: "Ayuskey Fluorite",
				permission: kinds,
			},
		);
		if (createApp.type === "failed") {
      enqueueSnackbar("失敗", {variant: "error", anchorOrigin: {horizontal: "left", vertical: "top"}})
      setLoading(false)
			throw createApp.type, createApp.data;
		}
    storage.setHost(instance)
		console.log(createApp.data.secret);
		storage.add("_auth_secret", createApp.data.secret);
		const generateSession = await api.call(
			"POST",
			"/api/auth/session/generate",
			{},
			{ appSecret: createApp.data.secret },
		);

    if (generateSession.type === 'failed') {
      setLoading(false)
      throw generateSession.type, generateSession.data
    }
    console.log(generateSession)

	};

	return (
		<div>
			<Button auto={true} shadow={true} onPress={handler}>ログイン</Button>
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
						clearable={true}
						bordered={true}
						fullWidth={true}
						color="primary"
						size="lg"
						onChange={(e) => setInstance(e.target.value)}
						placeholder="Instance"
						contentLeft={<FaGlobe />}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button auto={true} flat={true} color="error" onPress={closeHandler}>Close</Button>
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
