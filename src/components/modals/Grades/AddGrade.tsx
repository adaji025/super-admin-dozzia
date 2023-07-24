import {
  Button,
  TextInput,
  Group,
  Divider,
  LoadingOverlay,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const AddSubject = ({ closeModal, submit, loading }: any) => {
  const form = useForm({
    initialValues: {
      name: "",
      remark: "",
      min_score: "",
      max_score: "",
    },
  });

  return (
    <div>
      <Divider mb="md" variant="dashed" />
      <LoadingOverlay visible={loading} />

      <form
        onSubmit={form.onSubmit((values) => {
          submit(values).then(() => {
            closeModal();
          });
        })}
      >
        <TextInput
          required
          mt="sm"
          label="Grade Name"
          placeholder="e.g. A"
          {...form.getInputProps("name")}
        />

        <TextInput
          required
          mt="sm"
          label="Remark"
          placeholder="e.g. Excellent"
          {...form.getInputProps("remark")}
        />

        <NumberInput
          className="form-item"
          required
          mt="sm"
          label="Min Score"
          placeholder="e.g. 85"
          {...form.getInputProps("min_score")}
        />

        <NumberInput
          className="form-item"
          required
          mt="sm"
          label="Max Score"
          placeholder="e.g. 100"
          {...form.getInputProps("max_score")}
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

export default AddSubject;
