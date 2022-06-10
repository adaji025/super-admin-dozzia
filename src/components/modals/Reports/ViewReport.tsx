import { useState, useEffect } from "react";
import {
  Button,
  Group,
  Divider,
  Box,
  Table,
  Skeleton,
  Menu,
  Avatar,
  Pagination,
  Alert,
  Tabs,
  TextInput,
  ActionIcon,
  Text,
  Select,
} from "@mantine/core";
import { InfoCircle, Messages } from "tabler-icons-react";
import useTheme from "../../../hooks/useTheme";
import useReports from "../../../hooks/useReports";
import "./view-report.scss";

const ViewReport = ({
  report,
  closeModal,
}: {
  report: any;
  closeModal: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active);
  };

  return (
    <Tabs active={activeTab} onTabChange={onChange} variant="outline">
      <Tabs.Tab icon={<InfoCircle size={14} />} label="Details" tabKey="1">
        <Details closeModal={closeModal} report={report} />
      </Tabs.Tab>
      <Tabs.Tab icon={<Messages size={14} />} label="Conversation" tabKey="2">
        <Conversation />
      </Tabs.Tab>
    </Tabs>
  );
};

const Details = ({ closeModal, report }: any) => {
  const [status, setStatus] = useState<string>("");
  const { handleUpdateStatus } = useReports();

  useEffect(() => {
    setStatus(report?.status);
    //eslint-disable-next-line
  }, []);

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
        <div className="d-r-right">{report?.title}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Created By:</div>
        <div className="d-r-right">
          {report?.parent?.title} {report?.parent?.first_name}{" "}
          {report?.parent?.last_name}
        </div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Date:</div>
        <div className="d-r-right">{report?.date}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Concerned Staff:</div>{" "}
        <div className="d-r-right">
          {report?.teacher?.title} {report?.teacher?.first_name}{" "}
          {report?.teacher?.last_name}
        </div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Student:</div>
        <div className="d-r-right">
          {report?.student?.first_name} {report?.student?.last_name}
        </div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Comment/Update:</div>
        <div className="d-r-right">{report?.comment}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Status:</div>
        <div className="d-r-right fit">
          {" "}
          <Select
            placeholder="Pick one"
            variant="filled"
            value={status}
            onChange={(value: string) => {
              setStatus(value);
            }}
            data={[
              { value: "resolved", label: "Resolved" },
              { value: "in-progress", label: "In-progress" },
              { value: "unresolved", label: "Unresolved" },
            ]}
          />
        </div>
      </div>

      <Group position="right" mt="lg">
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>

        <Button
          onClick={() => {
            closeModal();
            handleUpdateStatus(report?.id, status);
          }}
          disabled={report?.status === status}
        >
          Update Status
        </Button>
      </Group>
    </div>
  );
};

const Conversation = () => {
  return <div className="report-conversation">ssssssss ssssss</div>;
};

export default ViewReport;
