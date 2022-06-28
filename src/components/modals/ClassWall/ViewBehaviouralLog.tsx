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
  Popover,
  Text,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useTheme from "../../../hooks/useTheme";
import { List, CirclePlus, ChevronDown, Edit, Trash } from "tabler-icons-react";
import { DatePicker, TimeInput } from "@mantine/dates";
import useBehaviouralLog from "../../../hooks/useBehaviouralLog";
import moment from "moment";
import Conversation from "./../../Conversation/Conversation";
import "./class-wall-modals.scss";

const ViewBehaviouralLog = ({
  closeModal,
  studentId,
  modalActive,
}: {
  closeModal: () => void;
  studentId: string;
  modalActive: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const {
    handleCreateRemark,
    loading,
    setLoading,
    handleGetRemarks,
    handleUpdateRemark,
    handleDeleteRemark,
    handleGetComments,
    handlePostComment,
  } = useBehaviouralLog();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [log, setLog] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      getRemarks();
    }

    //eslint-disable-next-line
  }, [page]);

  const getRemarks = () => {
    handleGetRemarks(page, perPage, studentId).then((res) => {
      setLog(res);
    });
  };

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
    if (active === 0 && edit) {
      setEdit(null);
    }
  };

  const createRemark = (values: {
    is_draft: string;
    category: string;
    description: string;
    time: string;
    date: string;
  }) => {
    handleCreateRemark({
      is_draft: values?.is_draft === "false" ? false : true,
      category: values?.category,
      description: values?.description,
      student_id: studentId,
      published_at: `${moment(values.date).format("YYYY-MM-DD")} ${moment(
        values.time
      ).format("HH:mm")}`,
    }).then(() => {
      setLoading(true);
      onChange(0);
      getRemarks();
    });
  };

  const updateRemark = (
    remarkId: string,
    values: {
      is_draft: string;
      category: string;
      description: string;
      time: string;
      date: string;
    }
  ) => {
    handleUpdateRemark(remarkId, {
      is_draft: values?.is_draft === "false" ? false : true,
      category: values?.category,
      description: values?.description,
      published_at: `${moment(values.date).format("YYYY-MM-DD")} ${moment(
        values.time
      ).format("HH:mm")}`,
    }).then(() => {
      onChange(0);
      setLoading(true);
      getRemarks();
    });
  };

  const deleteRemark = (remarkId: string) => {
    handleDeleteRemark(remarkId).then(() => {
      setLoading(true);
      getRemarks();
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
            deleteRemark={deleteRemark}
            handleGetComments={handleGetComments}
            handlePostComment={handlePostComment}
            loading={loading}
            setLoading={setLoading}
          />
        </Tabs.Tab>
        <Tabs.Tab
          icon={edit ? <Edit size={14} /> : <CirclePlus size={14} />}
          label={`${edit ? "Edit" : "Add"} Remark`}
          tabKey="2"
        >
          <AddToLog
            closeModal={() => {
              if (edit) {
                onChange(0);
              } else {
                closeModal();
              }
            }}
            createRemark={createRemark}
            updateRemark={updateRemark}
            edit={edit}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

const ViewLog = ({
  closeModal,
  log,
  setPage,
  onPressEdit,
  deleteRemark,
  handlePostComment,
  handleGetComments,
  loading,
  setLoading,
}: any) => {
  const { dark } = useTheme();
  const [activeRemark, setActiveRemark] = useState<any>(null);
  const [confirmDeleteRemark, setConfirmDeleteRemark] =
    useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>("details");

  useEffect(() => {
    if (activeView === "comments") {
      getComments();
    }

    //eslint-disable-next-line
  }, [activeView]);

  const getComments = () => {
    return new Promise((resolve) => {
      handleGetComments(activeRemark?.remark_id).then((res: any) => {
        resolve(res);
      });
    });
  };

  const postComment = (text: string) => {
    return new Promise((resolve) => {
      handlePostComment(activeRemark?.remark_id, text).then((res: any) => {
        resolve(res);
      });
    });
  };

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
                    setActiveView("details");
                  } else {
                    setActiveRemark(item);
                  }
                }}
              >
                <div className="b-i-left">
                  {item?.description && item?.description.length > 70
                    ? `${item.description.substring(0, 70)}...`
                    : item.description}
                </div>

                <div className="b-i-right">
                  {moment(item?.published_at).format("Do MMM, YYYY")}{" "}
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

        {activeRemark && activeView === "details" && (
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

            <div
              className="v-d-row"
              style={{
                borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
              }}
            >
              <div className="d-r-left">Comments:</div>
              <div className="d-r-right">
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => {
                    setActiveView("comments");
                  }}
                >
                  View Comments
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeRemark && activeView === "comments" && (
          <Conversation
            onCancel={() => {
              setActiveView("details");
            }}
            disable={false}
            handleGetConversation={getComments}
            loading={false}
            setLoading={setLoading}
            handlePostConversation={postComment}
          />
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

      {!(activeRemark && activeView === "comments") && (
        <Group position="right" mt="xl">
          {activeRemark ? (
            <Popover
              opened={confirmDeleteRemark}
              onClose={() => setConfirmDeleteRemark(false)}
              target={
                <Button
                  color="red"
                  onClick={() => {
                    setConfirmDeleteRemark(!confirmDeleteRemark);
                  }}
                >
                  Delete Remark
                </Button>
              }
              width={260}
              position="top"
              withArrow
            >
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ActionIcon
                    variant="light"
                    title="Toggle color scheme"
                    mr="md"
                  >
                    <Trash size={25} />
                  </ActionIcon>
                  <Text size="sm">Delete remark?</Text>
                </div>

                <Group position="right">
                  <Button
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => {
                      setConfirmDeleteRemark(false);
                    }}
                  >
                    No
                  </Button>
                  <Button
                    variant="light"
                    color="red"
                    size="xs"
                    onClick={() => {
                      deleteRemark(activeRemark?.remark_id);
                      setConfirmDeleteRemark(false);
                      setTimeout(() => {
                        setActiveRemark(null);
                      }, 1000);
                    }}
                  >
                    Yes
                  </Button>
                </Group>
              </>
            </Popover>
          ) : (
            <Button variant="default" onClick={closeModal}>
              Close
            </Button>
          )}

          {activeRemark && (
            <Button
              onClick={() => {
                onPressEdit(activeRemark);
              }}
            >
              Edit Remark
            </Button>
          )}
        </Group>
      )}
    </div>
  );
};

const AddToLog = ({ closeModal, createRemark, updateRemark, edit }: any) => {
  const form = useForm({
    initialValues: {
      is_draft: edit ? `${edit?.is_draft}` : "",
      category: edit ? edit?.category : "",
      date: edit ? moment(edit.plublished_at).toDate() : "",
      time: edit ? moment(edit.plublished_at).toDate() : new Date(),
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
          if (edit) {
            updateRemark(edit?.remark_id, values);
          } else {
            createRemark(values);
          }
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
            {edit ? "Go back" : "Close"}
          </Button>
          <Button type="submit">{edit ? "Save Changes" : "Submit"}</Button>
        </Group>
      </form>
    </div>
  );
};

export default ViewBehaviouralLog;
