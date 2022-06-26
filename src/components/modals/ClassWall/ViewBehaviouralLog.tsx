import { useState, useEffect } from "react";
import {
  Button,
  Group,
  Tabs,
  Select,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ArrowUpRight } from "tabler-icons-react";
import useTheme from "../../../hooks/useTheme";
import { List, CirclePlus } from "tabler-icons-react";
import { DatePicker, TimeInput } from "@mantine/dates";
import useBehaviouralLog from "../../../hooks/useBehaviouralLog";
import moment from "moment";

const ViewBehaviouralLog = ({
  closeModal,
  studentId,
  modalActive,
}: {
  closeModal: (value: boolean) => void;
  studentId: string;
  modalActive: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { handleCreateRemark, loading, handleGetRemarks } = useBehaviouralLog();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [log, setLog] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      handleGetRemarks(page, perPage, studentId).then((res) => {
        setLog(res);
      });
    }

    //eslint-disable-next-line
  }, [page]);

  const onChange = (active: number) => {
    setActiveTab(active);
  };

  const createRemark = (values: {
    is_draft: string;
    category: string;
    description: string;
    time: string;
    date: string;
  }) => {
    handleCreateRemark({
      is_draft: values?.is_draft,
      category: values?.category,
      description: values?.description,
      student_id: studentId,
      published_at: `${moment(values.date).format("YYYY-MM-DD")} ${moment(
        values.time
      ).format("HH:mm")}`,
    }).then(() => {
      onChange(0);
      handleGetRemarks(page, perPage, studentId);
    });
  };

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Tabs active={activeTab} onTabChange={onChange} variant="outline">
        <Tabs.Tab icon={<List size={14} />} label="View Log" tabKey="1">
          <ViewLog
            log={log}
            closeModal={closeModal}
            page={page}
            setPage={setPage}
          />
        </Tabs.Tab>
        <Tabs.Tab icon={<CirclePlus size={14} />} label="Add Remark" tabKey="2">
          <AddToLog closeModal={closeModal} createRemark={createRemark} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

const ViewLog = ({ closeModal, log, page, setPage }: any) => {
  const { dark } = useTheme();
  console.log(log);

  return <div>jsjsjs</div>;
};

const AddToLog = ({ closeModal, createRemark, edit }: any) => {
  const form = useForm({
    initialValues: {
      is_draft: edit ? edit.is_draft : "",
      category: edit ? edit.category : "",
      date: edit ? edit.date : "",
      time: edit ? edit.time : new Date(),
      description: edit ? edit.description : "",
    },

    validate: {
      is_draft: (value) => (value === "" ? "Save remark as draft?" : null),
      category: (value) => (value === "" ? "Select remark category" : null),
      date: (value) => (value === "" ? "Select send date" : null),
    },
  });

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => {
          createRemark(values);
        })}
      >
        <Select
          required
          label="Concern"
          placeholder="Concern Category"
          variant="filled"
          className="form-item"
          data={[
            { value: "Behavior", label: "Behavior" },
            { value: "Academics", label: "Academics" },
            { value: "Routine", label: "Routine" },
            { value: "Other", label: "Other" },
          ]}
          {...form.getInputProps("category")}
        />

        <Select
          mt="md"
          required
          label="Draft?"
          placeholder="Save as draft?"
          variant="filled"
          className="form-item"
          data={[
            { value: "false", label: "Don't save as draft" },
            { value: "true", label: "Save as draft" },
          ]}
          {...form.getInputProps("is_draft")}
        />

        <Textarea
          mt="md"
          required
          label="Note"
          placeholder="Enter brief description on this concern"
          variant="filled"
          autosize
          minRows={5}
          maxRows={5}
          {...form.getInputProps("description")}
        />

        <div className="form-row">
          <DatePicker
            mt="md"
            initialLevel="year"
            className="form-item"
            label="Send Date"
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
            clearable
            {...form.getInputProps("time")}
          />
        </div>

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

export default ViewBehaviouralLog;
