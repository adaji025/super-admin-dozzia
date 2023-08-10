import { Fragment } from "react";
import { Button, Modal, Group, Text } from "@mantine/core";
import Poses from "../../assets/images/poses.png";

interface ConfirmationProps {
  isOpened: boolean;
  closeModal: () => void;
}

const Confirmation = ({ isOpened, closeModal }: ConfirmationProps) => {
  return (
    <Fragment>
      <Modal opened={isOpened} onClose={closeModal} title="" size="md" centered>
        <div className="confirmation-wrapper">
          <Group position="center">
            <img src={Poses} alt="poses" />
          </Group>

          <Text weight={500} mt={12} mx="auto" align="center">
            Are you sure you want to submit this grade?
          </Text>

          <Text
            size="sm"
            mt={6}
            mx="auto"
            align="center"
            sx={{ maxWidth: 340 }}
          >
            The report card of this student will be automatically updated with
            the information entered.
          </Text>

          <Group position="center" my="lg">
            <Button
              color="dark"
              size="md"
              onClick={closeModal}
              sx={{ minWidth: 200 }}
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
