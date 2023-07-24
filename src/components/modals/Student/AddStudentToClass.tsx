import {
  Button,
  TextInput,
  Select,
  Group,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useClass from "../../../hooks/useClass";
import { ClassroomType } from "../../../types/classTypes";
import { useState } from "react";

interface AddStudentToClassProps {
  closeModal: () => void;
  student: {
    fullName: string;
    studentId: string;
    username: string;
  } | null;
  allClasses: ClassroomType[];
  callback: () => void;
}

const AddStudentToClass = ({
  closeModal,
  student,
  allClasses,
  callback,
}: AddStudentToClassProps) => {
  const { addMultipleStudents } = useClass();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      username: student ? student.username : "",
      fullname: student ? student.fullName : "",
      class_id: "",
    },

    validate: {
      class_id: (value) => (value === "" ? "Select class to continue" : null),
    },
  });

  const submit = (values: typeof form.values) => {
    setLoading(true);

    addMultipleStudents(values.class_id, {
      students: [student?.studentId ?? ""],
    })
      .then(() => {
        setLoading(false);
        callback();
        closeModal();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <LoadingOverlay visible={loading} />

      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <TextInput
          required
          mt="sm"
          label="Reg No."
          placeholder="Reg no"
          {...form.getInputProps("username")}
          disabled
        />

        <TextInput
          required
          mt="sm"
          label="Full Name"
          placeholder="Full name"
          {...form.getInputProps("fullname")}
          disabled
        />

        <Select
          mt="md"
          required
          label="Select Class"
          placeholder="Select class to add student"
          searchable
          nothingFound="No class found"
          data={allClasses.map((item: ClassroomType) => ({
            key: item.classroom_id,
            value: item.classroom_id,
            label: item.name,
          }))}
          {...form.getInputProps("class_id")}
        />

        <Group position="right" mt="lg">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>

          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default AddStudentToClass;
