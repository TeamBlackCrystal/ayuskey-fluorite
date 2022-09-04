import { Modal, Text, Input, Button, Row, Checkbox, Textarea } from "@nextui-org/react";
import type { FC } from "react";
import { useCreateNoteModal } from "../../store/common";
import {useSnapshot} from "valtio"

export const CreateNoteModal: FC = () => {
  const visible = useSnapshot(useCreateNoteModal)

  const closeHandler = () => {
    useCreateNoteModal.isOpen = false
  }

	return (
		<div>
			<Modal
				closeButton={true}
				blur={true}
				aria-labelledby="modal-title"
				open={visible.isOpen}
				onClose={closeHandler}
			>

				<Modal.Body>
            <Textarea placeholder="ここに入力"/>
					<Row justify="space-between">
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button auto={true}>送信</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
