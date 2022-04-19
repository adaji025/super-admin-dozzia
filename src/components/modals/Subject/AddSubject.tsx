import {
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const AddSubject = ({ closeModal, submit, edit }: any) => {
  const form = useForm({
    initialValues: {
      name: edit ? edit.subject_name : "",
      category: edit ? edit.subject_category : "",
      description: edit ? edit.subject_description : "",
    },

    validate: {
      category: (value) => (value === "" ? "Select subject category" : null),
    },
  });

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          closeModal();
          if (edit) {
            submit(edit.subject_id, values);
          } else {
            submit(values);
          }
        })}
      >
        <TextInput
          required
          mt="sm"
          variant="filled"
          label="Subject Name"
          placeholder="Subject name"
          {...form.getInputProps("name")}
        />

        <Select
          mt="md"
          required
          label="Subject Category"
          placeholder="Select Subject category"
          variant="filled"
          data={[
            { value: "Core Course", label: "Core Course" },
            { value: "Selective Course", label: "Selective Course" },
            { value: "Elective Course", label: "Elective Course" },
          ]}
          {...form.getInputProps("category")}
        />

        <Textarea
          mt="md"
          required
          label="Subject Description"
          placeholder="Subject description"
          variant="filled"
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("description")}
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

export default AddSubject;
