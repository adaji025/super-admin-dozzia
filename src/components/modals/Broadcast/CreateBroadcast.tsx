import { useState } from "react";
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
import Upload from "../../Upload/Upload";
import "../Events/create-event.scss";

const CreateBroadcast = ({ closeModal, submit, edit }: any) => {
  const [file, setFile] = useState<any>(null);

  const form = useForm({
    initialValues: {
      title: edit ? edit.title : "",
      summary: edit ? edit.summary : "",
      date: edit ? edit.date : "",
      time: edit ? edit.time : new Date(),
      visibility: edit ? edit.visibility : "",
    },

    validate: {
      visibility: (value) =>
        value === "" ? "Select the recipients of the broadcast" : null,
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
            submit({ ...values, image: file });
          }
        })}
      >
        <TextInput
          required
          mt="sm"
          variant="filled"
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />

        <Textarea
          mt="md"
          required
          label="Summary"
          placeholder="Provide summary"
          variant="filled"
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("summary")}
        />

        <Select
          mt="md"
          required
          label="Recipients"
          placeholder="Recipients"
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
            label="Publish Date"
            placeholder="Date"
            variant="filled"
            required
            {...form.getInputProps("date")}
          />

          <TimeInput
            label="Time"
            className="form-item"
            variant="filled"
            required
            mt="md"
            format="12"
            {...form.getInputProps("time")}
          />
        </div>

        <div className="upload-wrapper">
          <div className="u-title">
            {edit ? edit?.image && "Broadcast Image" : "Add Image (optional)"}
          </div>
          {edit ? (
            edit?.image && (
              <img
                className="broadcast-image23"
                src={edit?.image}
                alt="broadcast design"
              />
            )
          ) : (
            <Upload
              text={file ? file?.name : "Upload Image"}
              accept={["image/jpeg", "image/png", "image/jpg"]}
              extraClasses={`${file ? "file-selected" : ""}`}
              setFile={setFile}
            />
          )}
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

export default CreateBroadcast;
