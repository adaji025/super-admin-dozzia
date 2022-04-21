import { Fragment, useState } from "react";
import { Button, Modal, Text, Divider, Group, TextInput } from "@mantine/core";
import "./confirmation.scss";

interface ConfirmationProps {
  isOpened: boolean;
  closeModal: () => void;
  title: string;
  confirmText: string;
  submit: any;
}

const Confirmation = ({
  isOpened,
  closeModal,
  title,
  confirmText,
  submit,
}: ConfirmationProps) => {
  const [inputText, setInputText] = useState<string>("");

  return (
    <Fragment>
      <Modal
        opened={isOpened}
        onClose={closeModal}
        title={<Text className="modal-title324">Confirm delete</Text>}
        size="lg"
      >
        <div className="confirmation-wrapper">
          <div className="c-title">{title} This action is irreversible.</div>

          <TextInput
            placeholder=""
            label={`Type "${confirmText}" to continue`}
            size="md"
            variant="filled"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />

          <Divider variant="dashed" my={20} />

          <Group position="right" mt="lg">
            <Button
              variant="light"
              onClick={() => {
                setInputText("");
                closeModal();
              }}
            >
              Cancel
            </Button>
            <Button
              color="red"
              disabled={inputText !== confirmText}
              onClick={() => {
                setInputText("");
                submit();
              }}
            >
              Confirm Delete
            </Button>
          </Group>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Confirmation;
