import { useEffect } from "react";
import {
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useClass from "../../../hooks/useClass";

const AddClass = ({ closeModal, submit, edit, modalActive }: any) => {
  const { teachers, getTeachers } = useClass();

  useEffect(() => {
    if (modalActive) {
      getTeachers(1, 500, "", "teacher");
    }
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      classroom_level: edit ? edit.classroom_level : "",
      classroom_name: edit ? edit.classroom_name : "",
      classroom_teacher: edit ? edit.classroom_teacher : "",
      classroom_description: edit ? edit.classroom_description : "",
    },

    validate: {
      classroom_level: (value) => (value === "" ? "Select class level" : null),
    },
  });

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          closeModal();
          if (edit) {
            submit(edit.classroom_id, values);
          } else {
            submit(values);
          }
        })}
      >
        <TextInput
          required
          mt="sm"
          variant="filled"
          label="Classroom Name"
          placeholder="Classroom name"
          {...form.getInputProps("classroom_name")}
        />

        <Select
          mt="md"
          required
          label="Classroom Level"
          placeholder="Select class level"
          variant="filled"
          data={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
            { value: "9", label: "9" },
            { value: "10", label: "10" },
          ]}
          {...form.getInputProps("classroom_level")}
        />

        <Textarea
          mt="md"
          required
          label="Classroom Description"
          placeholder="e.g. A class of 20, JSS 2 students."
          variant="filled"
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("classroom_description")}
        />

        <Select
          required
          mt="md"
          label="Class Teacher"
          placeholder="Select class teacher"
          variant="filled"
          searchable
          nothingFound="No teacher found"
          data={teachers.map(
            (teacher: {
              staff_id: string;
              first_name: string;
              middle_name: string;
              last_name: string;
              title: string;
            }) => ({
              key: teacher?.staff_id,
              value: teacher?.staff_id,
              label: `${teacher.title} ${teacher.first_name} ${teacher.middle_name} ${teacher.last_name}`,
            })
          )}
          {...form.getInputProps("classroom_teacher")}
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

export default AddClass;
