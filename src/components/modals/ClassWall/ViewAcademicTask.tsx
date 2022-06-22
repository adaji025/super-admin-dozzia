import { useState, useEffect } from "react";
import { Button, Group, LoadingOverlay, Tabs } from "@mantine/core";
import { ArrowUpRight } from "tabler-icons-react";
import useTheme from "../../../hooks/useTheme";
import { InfoCircle, Messages } from "tabler-icons-react";
import useAcademicLog from "../../../hooks/useAcademicLog";
import moment from "moment";

const ViewAcademicTask = ({ closeModal, task, modalActive }: any) => {
  const { loading } = useAcademicLog();
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    // if (modalActive) {
    //   handleGetStudyResourceFiles(task?.id).then((res: any) => {
    //     setResourceFiles(res?.data);
    //   });
    // }
    //eslint-disable-next-line
  }, []);

  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active);
  };

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Tabs active={activeTab} onTabChange={onChange} variant="outline">
        <Tabs.Tab
          icon={<InfoCircle size={14} />}
          label="Task Details"
          tabKey="1"
        >
          <TaskDetails closeModal={closeModal} task={task} />
        </Tabs.Tab>
        <Tabs.Tab icon={<Messages size={14} />} label="Responses" tabKey="2">
          hello
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

const TaskDetails = ({ closeModal, task }: any) => {
  const { dark } = useTheme();

  return (
    <div className="view-details">
      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Title:</div>
        <div className="d-r-right">{task?.title}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Description:</div>
        <div className="d-r-right">{task?.description}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Subject:</div>
        <div className="d-r-right">{task?.subject?.name}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Date Created:</div>
        <div className="d-r-right">
          {moment(task?.created_at).format("Do MMM, YYYY")}
        </div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Submission Deadline:</div>
        <div className="d-r-right">
          {moment(task?.end_at).format("Do MMM, YYYY")}
        </div>
      </div>

      {task?.link && (
        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Download link:</div>
          <div
            className="d-r-right"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            <a href={task?.link} target="_blank" rel="noreferrer">
              {task?.link}
            </a>{" "}
            <ArrowUpRight size={14} />
          </div>
        </div>
      )}

      {task?.file_url && (
        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Document:</div>
          <div
            className="d-r-right"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            <a href={task?.file_url} target="_blank" rel="noreferrer">
              {task?.file_url}
            </a>{" "}
            <ArrowUpRight size={14} />
          </div>
        </div>
      )}

      <Group position="right" mt="lg">
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>
      </Group>
    </div>
  );
};

export default ViewAcademicTask;
