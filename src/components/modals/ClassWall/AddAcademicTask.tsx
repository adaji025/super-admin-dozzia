import { useState } from "react";
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
import Upload from "../../Upload/Upload";
import { useSelector } from "react-redux";
import moment from "moment";
import { SubjectType } from "../../../types/subjectsTypes";

interface AddAcademicTaskProps {
  closeModal: () => void;
  submit: (values: any) => void;
  allSubjects: SubjectType[];
}

const AddAcademicTask = ({
  closeModal,
  submit,
  allSubjects,
}: AddAcademicTaskProps) => {
  const [file, setFile] = useState<any>(null);
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      subject_id: "",
      classroom_id: classWall?.activeClassId,
      link: "",
      end_at: new Date(),
    },

    validate: {
      subject_id: (value) => (value === "" ? "Select resource subject" : null),
      classroom_id: (value) => (value === "" ? "Select resource class" : null),
      link: (value) =>
        value && !isValidURL(value) ? "Enter a valid URL" : null,
    },
  });

  const isValidURL = (string: string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    );
    return res !== null;
  };

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
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />

        <Textarea
          mt="md"
          required
          label="Description"
          placeholder="Resource description"
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
          data={allSubjects.map((item: SubjectType) => ({
            key: item?.subject_id,
            value: item?.subject_id,
            label: `${item?.name} (${item?.category})`,
          }))}
          {...form.getInputProps("subject_id")}
        />

        <DatePicker
          mt="md"
          className="form-item"
          label="Due Date"
          placeholder="Due date"
          required
          {...form.getInputProps("end_at")}
        />

        <TextInput
          mt="md"
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
