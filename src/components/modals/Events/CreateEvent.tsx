import {
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker, TimeInput } from "@mantine/dates";
import "./create-event.scss";

const CreateEvent = ({ closeModal, submit, edit }: any) => {
  const form = useForm({
    initialValues: {
      title: edit ? edit.title : "",
      description: edit ? edit.description : "",
      startDate: edit ? edit.startDate : "",
      startTime: edit ? edit.startTime : new Date(),
      endDate: edit ? edit.endDate : "",
      endTime: edit ? edit.endTime : new Date(),
      visibility: edit ? edit.visibility : "",
    },

    validate: {
      visibility: (value) =>
        value === "" ? "Select who can see the event" : null,
    },
  });

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form
        onSubmit={form.onSubmit((values) => {
          closeModal();
          if (edit) {
            submit(edit.id, values);
          } else {
            submit(values);
          }
        })}
      >
        <TextInput
          required
          mt="sm"
          variant="filled"
          label="Event Title"
          placeholder="Event title"
          {...form.getInputProps("title")}
        />

        <Textarea
          mt="md"
          required
          label="Event Description"
          placeholder="e.g. Parents and guardians visiting day for 2nd term."
          variant="filled"
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("description")}
        />

        <Select
          mt="md"
          required
          label="Participants"
          placeholder="Select participants"
          variant="filled"
          data={[
            { value: "1", label: "Staff Only" },
            { value: "2", label: "Parents and Staff" },
          ]}
          {...form.getInputProps("visibility")}
        />

        <div className="form-row">
          <DatePicker
            mt="md"
            initialLevel="year"
            className="form-item"
            label="Start Date"
            placeholder="Start date"
            variant="filled"
            required
            {...form.getInputProps("startDate")}
          />

          <TimeInput
            label="Start Time"
            className="form-item"
            variant="filled"
            required
            mt="md"
            format="12"
            {...form.getInputProps("startTime")}
          />
        </div>

        <div className="form-row">
          <DatePicker
            mt="md"
            initialLevel="year"
            className="form-item"
            label="End Date"
            placeholder="End date"
            variant="filled"
            required
            {...form.getInputProps("endDate")}
          />

          <TimeInput
            label="End Time"
            className="form-item"
            variant="filled"
            required
            mt="md"
            format="12"
            {...form.getInputProps("endTime")}
          />
        </div>

        <Group position="right" mt="xl">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">{edit ? "Update" : "Submit"}</Button>
        </Group>
      </form>
    </div>
  );
};

export default CreateEvent;
