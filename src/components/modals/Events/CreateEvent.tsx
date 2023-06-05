import {
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { AxiosError } from "axios";
import { useForm } from "@mantine/form";
import { DatePicker, TimeInput } from "@mantine/dates";
import "./create-event.scss";
import { createEvent, updateEvent } from "../../../services/event/event";
import { useState } from "react";
import moment from "moment";
import { showNotification } from "@mantine/notifications";
import useNotification from "../../../hooks/useNotification";

interface CreateEventProps {
  closeModal: () => void;
  callback?: () => void;
  edit?: any;
  classId?: string;
}

const CreateEvent = ({
  closeModal,
  callback,
  edit,
  classId,
}: CreateEventProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleError } = useNotification();

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

  const submit = (values: typeof form.values) => {
    return new Promise((resolve) => {
      setLoading(true);

      const action = edit ? updateEvent : createEvent;

      const payload = {
        title: values.title,
        description: values.description,
        start_at: `${moment(values.startDate).format("YYYY-MM-DD")} ${moment(
          values.startTime
        ).format("HH:mm:ss")}`,
        end_at: `${moment(values.endDate).format("YYYY-MM-DD")} ${moment(
          values.endTime
        ).format("HH:mm:ss")}`,
        visibility: values.visibility,
        ...(classId && { classroom_id: classId }),
      };

      action(payload, edit ? edit.id : undefined)
        .then(() => {
          showNotification({
            title: "Success",
            message: `Event ${edit ? "updated" : "created"} successfully.`,
            color: "green",
          });
          closeModal();
          callback && callback();
        })
        .catch((err: AxiosError) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
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
