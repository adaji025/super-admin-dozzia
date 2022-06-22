import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Divider,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import useClass from "../../../hooks/useClass";
import useSubject from "../../../hooks/useSubject";
import Upload from "../../Upload/Upload";
import { useSelector } from "react-redux";
import moment from "moment";

const AddAcademicTask = ({ closeModal, submit, modalActive }: any) => {
  const { getClassList, allClasses } = useClass();
  const { getSubjectList, allSubjects } = useSubject();
  const [file, setFile] = useState<any>(null);
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      subject_id: "",
      classroom_id:
        userdata?.role?.name === "Teacher" ? classWall?.activeClassId : "",
      link: "",
      end_at: new Date(),
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

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          closeModal();
          submit({
            ...values,
            document: file,
            end_at: moment(values.end_at).format("YYYY-MM-DD"),
          });
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
          disabled={userdata?.role?.name === "Teacher"}
          data={allClasses.map(
            (item: { classroom_id: string; classroom_name: string }) => ({
              key: item?.classroom_id,
              value: item?.classroom_id,
              label: item.classroom_name,
            })
          )}
          {...form.getInputProps("classroom_id")}
        />

        <DatePicker
          mt="md"
          className="form-item"
          label="Due Date"
          placeholder="Due date"
          variant="filled"
          required
          {...form.getInputProps("end_at")}
        />

        <TextInput
          mt="md"
          variant="filled"
          label="Insert Link"
          placeholder="Enter external URL"
          {...form.getInputProps("link")}
        />

        <div className="upload-wrapper">
          <div className="u-title">Attach file</div>

          <Upload
            text={file ? file?.name : "Upload Image"}
            accept={[]}
            acceptAll
            extraClasses={`${file ? "file-selected" : ""}`}
            setFile={setFile}
          />
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

export default AddAcademicTask;
