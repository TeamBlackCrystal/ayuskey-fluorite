import { styled } from "@stitches/react";
import { useTranslation } from "react-i18next";
import { FaExclamationTriangle } from "react-icons/fa";
import { theme } from "~/stitches.config";
import { Panel } from "./common/panel";

export const RemoteCaution = () => {
	const Container = styled("div", {
		fontSize: ".8em",
		padding: "16px",
		background: theme.colors.infoWarnBg,
		color: theme.colors.infoWarnFg,
	});

	const { t } = useTranslation();
	return (
    <Panel>
		<Container>
			<FaExclamationTriangle style={{ marginRight: "8px" }} />
			{t("remoteUserCaution")}
			<a className="link" href="href" rel="nofollow noopener" target="_blank">
				{t("showOnRemote")}
			</a>
		</Container>
    </Panel>
	);
};
