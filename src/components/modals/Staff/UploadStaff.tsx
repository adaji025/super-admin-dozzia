import { useState } from "react";
import { Modal, Button, Group, LoadingOverlay } from "@mantine/core";
import UploadComponent from "../../Upload/Upload";
import { MIME_TYPES } from "@mantine/dropzone";
import { uploadStaff } from "../../../services/staff/staff";
import { showNotification } from "@mantine/notifications";
import useNotification from "../../../hooks/useNotification";

type Props = {
  opened: boolean;
  close: () => void;
  callback: () => void;
};

const UploadStaff = ({ opened, close, callback }: Props) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);

  const { handleError } = useNotification();

  const handleUploadExcelFile = () => {
    setLoading(true);

    let formData = new FormData();
    formData.append("file_import", file);

    uploadStaff(formData)
      .then(() => {
        close();
        showNotification({
          title: "Success",
          message: "File uploaded Successfully",
          color: "green",
        });
        callback();
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      {/* <LoadingOverlay visible={loading} zIndex={2076} /> */}
      <Modal centered opened={opened} onClose={close}>
        <UploadComponent
          text={
            file
              ? file?.name
              : "Upload File type of xls, xlsx, xlx. Max file size 1mb"
          }
          accept={[MIME_TYPES.xlsx, MIME_TYPES.xls, MIME_TYPES.csv]}
          extraClasses={`${file ? "file-selected" : ""}`}
          setFile={setFile}
        />
        <Group position="right" mt={20} onClick={handleUploadExcelFile}>
          <Button color="dark" loading={loading}>Submit</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default UploadStaff;
