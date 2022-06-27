import { useState, useEffect } from "react";
import {
  Button,
  Group,
  Tabs,
  Select,
  Textarea,
  LoadingOverlay,
  Pagination,
  Alert,
  Accordion,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useTheme from "../../../hooks/useTheme";
import { List, CirclePlus, ChevronDown } from "tabler-icons-react";
import { DatePicker, TimeInput } from "@mantine/dates";
import useBehaviouralLog from "../../../hooks/useBehaviouralLog";
import moment from "moment";
import "./class-wall-modals.scss";

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
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      handleGetRemarks(page, perPage, studentId).then((res) => {
        setLog(res);
      });
    }

    //eslint-disable-next-line
  }, [page]);

  const onPressEdit = (remark: {
    description: string;
    is_draft: boolean;
    published_at: string;
    remark_id: string;
    teacher: {
      first_name: string;
      last_name: string;
      title: string;
    };
  }) => {
    setEdit(remark);
    onChange(1);
  };

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
            setPage={setPage}
            onPressEdit={onPressEdit}
          />
        </Tabs.Tab>
        <Tabs.Tab icon={<CirclePlus size={14} />} label="Add Remark" tabKey="2">
          <AddToLog
            closeModal={closeModal}
            createRemark={createRemark}
            edit={edit}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

const ViewLog = ({ closeModal, log, setPage, onPressEdit }: any) => {
  const { dark } = useTheme();
  const [activeRemark, setActiveRemark] = useState<any>(null);

  return (
    <div>
      <div className="behavioural-log-list">
        {log &&
          log?.data &&
          log?.data.length > 0 &&
          log?.data.map(
            (item: {
              description: string;
              is_draft: boolean;
              published_at: string;
              remark_id: string;
              teacher: {
                first_name: string;
                last_name: string;
                title: string;
              };
            }) => (
              <div
                className={`b-l-item click no-select ${
                  activeRemark && activeRemark?.remark_id !== item?.remark_id
                    ? "hide"
                    : ""
                }`}
                style={{ background: dark ? "#121212" : "#f6f6f6fc" }}
                key={item?.remark_id}
                onClick={() => {
                  if (activeRemark?.remark_id === item?.remark_id) {
                    setActiveRemark(null);
                  } else {
                    setActiveRemark(item);
                  }
                }}
              >
                <div className="b-i-left">Misdemeanor notice</div>

                <div className="b-i-right">
                  23rd Dec, 2021{" "}
                  <span>
                    <ChevronDown
                      className={`arrow-down r-arr ${
                        activeRemark?.remark_id === item?.remark_id
                          ? "rotate"
                          : ""
                      }`}
                      size={18}
                    />
                  </span>
                </div>
              </div>
            )
          )}

        {activeRemark && (
          <div className="view-details">
            <div
              className="v-d-row"
              style={{
                borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
              }}
            >
              <div className="d-r-left">Category:</div>
              <div className="d-r-right">{activeRemark?.category}</div>
            </div>

            <div
              className="v-d-row"
              style={{
                borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
              }}
            >
              <div className="d-r-left">Description:</div>
              <div className="d-r-right">{activeRemark?.description}</div>
            </div>

            <div
              className="v-d-row"
              style={{
                borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
              }}
            >
              <div className="d-r-left">Posted by:</div>
              <div className="d-r-right">
                {activeRemark?.teacher?.title}{" "}
                {activeRemark?.teacher?.first_name}{" "}
                {activeRemark?.teacher?.last_name}
              </div>
            </div>
          </div>
        )}

        {log?.data.length === 0 && (
          <Group grow position="center" mt={80}>
            <Alert title="Bummer!" color="red" style={{ maxWidth: "300px" }}>
              Log is empty.
            </Alert>
          </Group>
        )}
      </div>

      {log?.meta && log?.data.length > 0 && !activeRemark && (
        <Pagination
          sx={{ maxWidth: 900 }}
          position="center"
          mt={25}
          onChange={(value) => {
            if (value !== log.meta.current_page) {
              setPage(value);
            }
          }}
          initialPage={log.meta.current_page}
          total={log.meta.last_page}
        />
      )}

      <Group position="right" mt="xl">
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>

        <Button
          disabled={!activeRemark}
          onClick={() => {
            onPressEdit(activeRemark);
          }}
        >
          Edit Remark
        </Button>
      </Group>
    </div>
  );
};

const AddToLog = ({ closeModal, createRemark, edit }: any) => {
  const form = useForm({
    initialValues: {
      is_draft: edit ? edit?.is_draft : "",
      category: edit ? edit?.category : "",
      date: edit ? edit?.date : "",
      time: edit ? edit?.time : new Date(),
      description: edit ? edit?.description : "",
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
