import { useNavigate } from 'react-router-dom';
import { Modal, Button } from "@mantine/core"
import Success from "../../assets/images/Smile.png";

interface SuccessModalProps {
  successOpen: boolean
  close: () => void
}

const SuccessModal = ({ close, successOpen }: SuccessModalProps) => {
  const navigate = useNavigate()
  return (
    <Modal
        size={490}
        opened={successOpen}
        onClose={close}
        centered
      >
        <div className="modal-content">
          <img src={Success} alt="" />
          <span className="title">Transaction successful</span>
          <span className="modal-desc">Virtual account created successfully</span>
          <Button className="download-btn"
            onClick={() => navigate("/settings")}>Go to settings</Button>
        </div>
      </Modal>
  )
}

export default SuccessModal
