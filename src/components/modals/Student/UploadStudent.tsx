import { useState } from "react";
import { Modal, Button, Group, Select } from "@mantine/core";
import UploadComponent from "../../Upload/Upload";
import { MIME_TYPES } from "@mantine/dropzone";
import { ClassroomType } from "../../../types/classTypes";
import { importStudent } from "../../../services/student/student";
import { showNotification } from "@mantine/notifications";
import useNotification from "../../../hooks/useNotification";

type Props = {
  opened: boolean;
  close: () => void;
  allClasses: ClassroomType[];
  callback: () => void;
};

const UploadStudent = ({ opened, close, callback, allClasses }: Props) => {
  const [file, setFile] = useState<any>(null);
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const handleUploadExcelFile = () => {
    setLoading(true);

    let formData = new FormData();
    formData.append("file_import", file);
    formData.append("classroom_id", classId);

    importStudent(formData)
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

        <Group position="right" mt={20}>
          <Button
            color="dark"
            loading={loading}
            onClick={handleUploadExcelFile}
          >
            Submit
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default UploadStudent;
