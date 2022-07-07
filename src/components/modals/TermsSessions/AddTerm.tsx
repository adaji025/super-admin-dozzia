import { Button, Select, Group, LoadingOverlay, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import useTermsSessions from "../../../hooks/useTermsSessions";
import "../Events/create-event.scss";

const AddTerm = ({ closeModal }: any) => {
  const { loading, handleAddTerm } = useTermsSessions();

  const form = useForm({
    initialValues: {
      term: "",
      start_date: new Date(),
      end_date: new Date(),
    },

    validate: {
      term: (value) => (value === "" ? "Select term number" : null),
      start_date: (value) => (!value ? "Select start date" : null),
      end_date: (value) => (!value ? "Select end date" : null),
    },
  });

  const submit = (values: {
    term: string;
    start_date: Date;
    end_date: Date;
  }) => {
    handleAddTerm(values).then(() => {
      closeModal();
    });
  };

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <Divider mb="xs" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          submit(values);
        })}
      >
        <Select
          required
          label="Term"
          placeholder="Term"
          variant="filled"
          data={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
          ]}
          {...form.getInputProps("term")}
        />

        <DatePicker
          mt="md"
          initialLevel="year"
          className="form-item"
          label="Start Date"
          placeholder="Start date"
          variant="filled"
          required
          {...form.getInputProps("start_date")}
        />

        <DatePicker
          mt="md"
          initialLevel="year"
          className="form-item"
          label="End Date"
          placeholder="End date"
          variant="filled"
          required
          {...form.getInputProps("end_date")}
        />

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

export default AddTerm;
