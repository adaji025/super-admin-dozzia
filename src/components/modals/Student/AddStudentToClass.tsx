import { Button, TextInput, Select, Group, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import useStudent from "../../../hooks/useStudent";

const AddStudentToClass = ({ closeModal, student, allClasses }: any) => {
  const { addToClass } = useStudent();

  const form = useForm({
    initialValues: {
      username: student ? student.username : "",
      fullname: student ? student.fullName : "",
      class_id: student ? student.subject_description : "",
    },

    validate: {
      class_id: (value) => (value === "" ? "Select class to continue" : null),
    },
  });

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          addToClass({
            studentId: student.studentId,
            classId: values.class_id,
          });
          closeModal();
        })}
      >
        <TextInput
          required
          mt="sm"
          variant="filled"
          label="Reg No."
          placeholder="Reg no"
          {...form.getInputProps("username")}
          disabled
        />

        <TextInput
          required
          mt="sm"
          variant="filled"
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
          variant="filled"
          searchable
          nothingFound="No class found"
          data={allClasses.map(
            (item: {
              classroom_id: string;
              classroom_level: number;
              classroom_name: string;
            }) => ({
              key: item?.classroom_id,
              value: item?.classroom_id,
              label: item?.classroom_name,
            })
          )}
          {...form.getInputProps("class_id")}
        />

        <Group position="right" mt="lg">
          <Button variant="light" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default AddStudentToClass;
