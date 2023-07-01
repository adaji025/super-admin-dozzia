import { Modal, Button } from "@mantine/core";
import Success from "../../assets/images/Smile.png";

interface SuccessModalProps {
  modalOpen: boolean;
  close: () => void;
}

const SuccessModal = ({ close, modalOpen }: SuccessModalProps) => {
  return (
    <Modal size={490} opened={modalOpen} onClose={close} centered>
      {modalOpen && (
        <div className="modal-content">
          <img src={Success} alt="" />

          <div className="title">Transaction successful</div>

          <div className="modal-desc">Virtual account created successfully</div>

          <Button fullWidth color="dark" my={24} onClick={close}>
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default SuccessModal;
