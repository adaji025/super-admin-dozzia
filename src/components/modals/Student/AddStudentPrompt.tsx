import { Modal } from "@mantine/core";
import React from "react";
import "./uploadExcel.scss";
import { ReactComponent as DocumentIcon } from "../../../assets/svg/document-upload.svg";
import { Pencil } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
type Props = {
  opened: boolean;
  close: () => void;
  openNext: () => void;
};

const AddStudentPrompt = ({ opened, close, openNext }: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Modal size="lg" centered opened={opened} onClose={close}>
        <div className="upload-container">
          <div
            className="upload-box"
            onClick={() => {
              close();
              openNext();
            }}
          >
            <div>Upload CSV</div>
            <DocumentIcon className="icon" />
          </div>
          <div className="upload-box" onClick={() => navigate("/add-student")}>
            <div>Input data manually</div>
            <Pencil size={20} strokeWidth={2} color={"black"} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddStudentPrompt;
