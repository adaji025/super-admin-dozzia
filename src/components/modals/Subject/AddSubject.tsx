import {
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  CreateSubjectData,
  SubjectCategories,
  SubjectType,
} from "../../../types/subjectsTypes";

interface AddSubjectProps {
  closeModal: () => void;
  submit: (values: CreateSubjectData, subjectId?: string) => void;
  edit?: SubjectType | null;
}

const AddSubject = ({ closeModal, submit, edit }: AddSubjectProps) => {
  const form = useForm({
    initialValues: {
      name: edit ? edit.name : "",
      category: edit ? edit.category : "",
      description: edit ? edit.description ?? "" : "",
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
            submit(values, edit.subject_id);
          } else {
            submit(values);
          }
        })}
      >
        <TextInput
          required
          mt="sm"
          label="Subject Name"
          placeholder="Subject name"
          {...form.getInputProps("name")}
        />

        <Select
          mt="md"
          required
          label="Subject Category"
          placeholder="Select Subject category"
          data={[
            { value: SubjectCategories.Core, label: "Core Course" },
            { value: SubjectCategories.Selective, label: "Selective Course" },
            { value: SubjectCategories.Elective, label: "Elective Course" },
          ]}
          {...form.getInputProps("category")}
        />

        <Textarea
          mt="md"
          label="Subject Description"
          placeholder="Subject description"
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("description")}
        />

        <Group position="right" mt="lg">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default AddSubject;
