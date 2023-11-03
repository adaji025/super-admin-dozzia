import React, { useState } from "react";
import { Modal, Button, Group, Select } from "@mantine/core";
import UploadComponent from "../../Upload/Upload";
import { MIME_TYPES } from "@mantine/dropzone";
import { ClassroomType } from "../../../types/classTypes";

type Props = {
  opened: boolean;
  close: () => void;
  handleUploadExcelFile: () => void;
  file: any;
  setFile: React.Dispatch<any>;
  allClasses: ClassroomType[];
  setClassId: React.Dispatch<React.SetStateAction<string>>;
};

const UploadStudent = ({
  opened,
  close,
  handleUploadExcelFile,
  file,
  setFile,
  allClasses,
  setClassId,
}: Props) => {
  return (
    <div>
      <Modal centered opened={opened} onClose={close}>
        <div>
          <Select
            mb={24}
            required
            label="Class of Entry"
            placeholder="Select class"
            searchable
            className="form-item"
            nothingFound="No class found"
            data={allClasses.map((item: ClassroomType) => ({
              key: item?.classroom_id,
              value: item.classroom_id,
              label: `${item.name} ${item.level} ${item.type}`,
            }))}
            onChange={(e: any) => setClassId(e)}
          />
        </div>
        
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

export default UploadStudent;
