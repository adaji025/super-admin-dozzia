import { Fragment, useState } from "react";
import { Button, Modal, Text, Divider, Group, TextInput } from "@mantine/core";
import "./confirmation.scss";

interface ConfirmationProps {
  isOpened: boolean;
  closeModal: () => void;
  title: string;
  confirmText: string;
  submit: any;
  hasInput: boolean;
  confirmButtonColor?: string;
}

const Confirmation = ({
  isOpened,
  closeModal,
  title,
  confirmText,
  submit,
  hasInput,
  confirmButtonColor,
}: ConfirmationProps) => {
  const [inputText, setInputText] = useState<string>("");

  return (
    <Fragment>
      <Modal
        opened={isOpened}
        onClose={closeModal}
        title={
          <Text className="modal-title324">
            Confirm {confirmText.toLowerCase()}
          </Text>
        }
        size="lg"
        centered
      >
        <div className="confirmation-wrapper">
          <div className="c-title">{title}</div>

          {hasInput && (
            <TextInput
              placeholder=""
              label={`Type "${confirmText}" to continue`}
              size="md"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
          )}

          <Divider variant="dashed" my={20} />

          <Group position="right" mt="lg">
            <Button
              variant="default"
              onClick={() => {
                setInputText("");
                closeModal();
              }}
            >
              Cancel
            </Button>
            <Button
              color={confirmButtonColor || "red"}
              disabled={hasInput && inputText !== confirmText}
              onClick={() => {
                setInputText("");
                submit();
              }}
            >
              Confirm
            </Button>
          </Group>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Confirmation;
