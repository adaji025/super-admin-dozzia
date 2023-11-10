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
import { ClassroomType, CreateClassData } from "../../../types/classTypes";

interface AddClassProps {
  closeModal: () => void;
  submit: (values: CreateClassData, classId?: string) => void;
  edit: ClassroomType | null;
  modalActive: boolean;
}

const AddClass = ({ closeModal, submit, edit, modalActive }: AddClassProps) => {
  const { teachers, getTeachers } = useClass();

  useEffect(() => {
    if (modalActive) {
      getTeachers(1, 500, "", "");
    }
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      level: edit ? `${edit.level}` : "",
      name: edit ? edit.name : "",
      staff_id: edit ? edit.class_teacher.staff_id : "",
      description: edit ? edit.description : "",
      type: "",
    },

    validate: {
      level: (value) => (value === "" ? "Select class level" : null),
    },
  });

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          closeModal();
          if (edit) {
            submit(values as CreateClassData, edit?.classroom_id);
          } else {
            submit(values as CreateClassData);
          }
        })}
      >
        <Select
          mt="md"
          required
          label="Classroom Level"
          placeholder="Select class level"
          data={[
            { value: "jss", label: "JSS" },
            { value: "sss", label: "SSS" },
          ]}
          {...form.getInputProps("name")}
        />

        <Select
          mt="md"
          required
          label="Classroom Level"
          placeholder="Select class level"
          data={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
          ]}
          {...form.getInputProps("level")}
        />

        <TextInput
          mt="md"
          required
          label="Classroom Type"
        placeholder="e.g. A or B"
          {...form.getInputProps("type")}
        />

        <Textarea
          mt="md"
          required
          label="Classroom Description"
          placeholder="e.g. A class of 20, JSS 2 students."
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("description")}
        />

        <Select
          required
          mt="md"
          label="Class Teacher"
          placeholder="Select class teacher"
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
          {...form.getInputProps("staff_id")}
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