import React, { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import UploadComponent from "../../Upload/Upload";
import { MIME_TYPES } from "@mantine/dropzone";

type Props = {
  opened: boolean;
  close: () => void;
  handleUploadExcelFile: () => void;
  file: any;
  setFile: React.Dispatch<any>;
};

const UploadStaff = ({
  opened,
  close,
  handleUploadExcelFile,
  file,
  setFile,
}: Props) => {
  return (
    <div>
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
          <Button color="dark">Submit</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default UploadStaff;
