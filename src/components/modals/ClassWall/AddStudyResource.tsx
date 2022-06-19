import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Divider,
  LoadingOverlay,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useClass from "../../../hooks/useClass";
import useSubject from "../../../hooks/useSubject";
import { Trash } from "tabler-icons-react";
import useStudyResources from "../../../hooks/useStudyResources";
import Upload from "../../Upload/Upload";
import { showNotification } from "@mantine/notifications";
import { useSelector } from "react-redux";

const AddStudyResource = ({ closeModal, submit, modalActive }: any) => {
  const { getClassList, allClasses } = useClass();
  const { getSubjectList, allSubjects } = useSubject();
  const [fileListNames, setFileListNames] = useState<Array<string>>([]);
  const [fileListIds, setFileListIds] = useState<Array<string>>([]);
  const { loading, handleUploadStudyResourceFile } = useStudyResources();
  const [file, setFile] = useState<any>(null);
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      subject_id: "",
      classroom_id: "",
      external_link: "",
    },

    validate: {
      subject_id: (value) => (value === "" ? "Select resource subject" : null),
      classroom_id: (value) => (value === "" ? "Select resource class" : null),
    },
  });

  useEffect(() => {
    if (modalActive) {
      if (userdata?.role?.name === "Teacher") {
        getClassList(1, 300, true, userdata?.user_id);
      } else {
        getClassList(1, 300, true);
      }
      getSubjectList(1, 300, true);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (file) {
      handleUpload();
    }
    //eslint-disable-next-line
  }, [file]);

  const handleUpload = () => {
    handleUploadStudyResourceFile(file).then((res: any) => {
      let fileNames = fileListNames;
      let fileIds = fileListIds;

      fileNames.push(file?.name);
      fileIds.push(res?.data?.id);

      setFileListNames(fileNames);
      setFileListIds(fileIds);

      setFile(null);
    });
  };

  const handleRemoveFile = (index: number) => {
    let fileNames: Array<string> = [];
    let fileIds: Array<string> = [];

    for (let i = 0; i < fileListNames.length; i++) {
      if (i !== index) {
        fileNames.push(fileListNames[i]);
        fileIds.push(fileListIds[i]);
      }
    }

    setFileListNames(fileNames);
    setFileListIds(fileIds);
  };

  return (
    <div>
      <LoadingOverlay visible={loading} />

      <Divider mb="md" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          if (values?.external_link || fileListIds.length > 0) {
            closeModal();
            submit({ ...values, files: fileListIds });
          } else {
            showNotification({
              title: "Warning",
              message: "Add file(s) or enter file download URL",
              color: "yellow",
            });
          }
        })}
      >
        <TextInput
          required
          mt="sm"
          variant="filled"
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />

        <Textarea
          mt="md"
          required
          label="Description"
          placeholder="Resource description"
          variant="filled"
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("description")}
        />

        <Select
          mt="md"
          required
          label="Subject"
          placeholder="Select subject"
          variant="filled"
          data={allSubjects.map(
            (item: {
              subject_id: string;
              subject_name: string;
              subject_category: string;
            }) => ({
              key: item?.subject_id,
              value: item?.subject_id,
              label: `${item?.subject_name} (${item?.subject_category})`,
            })
          )}
          {...form.getInputProps("subject_id")}
        />

        <Select
          mt="md"
          required
          label="Classroom"
          placeholder="Select classroom"
          variant="filled"
          data={allClasses.map(
            (item: { classroom_id: string; classroom_name: string }) => ({
              key: item?.classroom_id,
              value: item?.classroom_id,
              label: item.classroom_name,
            })
          )}
          {...form.getInputProps("classroom_id")}
        />

        <TextInput
          mt="md"
          variant="filled"
          label="External File URL"
          placeholder="Enter file download URL"
          {...form.getInputProps("external_link")}
        />

        <div className="upload-wrapper">
          <div className="u-title">Select Files</div>

          <Upload
            text={
              file
                ? file?.name
                : fileListNames.length > 0
                ? "Add another file"
                : "Select file"
            }
            accept={[]}
            acceptAll
            extraClasses={`${file ? "file-selected" : ""}`}
            setFile={setFile}
          />

          <div className="multiple-file-list">
            {fileListNames.map((item: string, index: number) => (
              <div className="file-name" key={index}>
                <span>{item}</span>
                <ActionIcon
                  color="red"
                  variant="hover"
                  onClick={() => {
                    handleRemoveFile(index);
                  }}
                >
                  <Trash size={16} />
                </ActionIcon>
              </div>
            ))}
          </div>
        </div>

        <Group position="right" mt="xl">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default AddStudyResource;
