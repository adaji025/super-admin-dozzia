import { Button, Group, LoadingOverlay, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import useTermsSessions from "../../../hooks/useTermsSessions";
import "../Events/create-event.scss";

const AddSession = ({ closeModal }: any) => {
  const { loading, handleAddSession } = useTermsSessions();

  const form = useForm({
    initialValues: {
      start_year: new Date(),
      end_year: new Date(),
    },

    validate: {
      start_year: (value) => (!value ? "Select start year" : null),
      end_year: (value) => (!value ? "Select end year" : null),
    },
  });

  const submit = (values: { start_year: Date; end_year: Date }) => {
    handleAddSession(values).then(() => {
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
        <DatePicker
          mt="md"
          initialLevel="year"
          className="form-item"
          label="Start Year"
          placeholder="Start year"
          variant="filled"
          required
          {...form.getInputProps("start_year")}
        />

        <DatePicker
          allowLevelChange={false}
          mt="md"
          initialLevel="year"
          className="form-item"
          label="End Year"
          placeholder="End year"
          variant="filled"
          required
          {...form.getInputProps("end_year")}
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

export default AddSession;
