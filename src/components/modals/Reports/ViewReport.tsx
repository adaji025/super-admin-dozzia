import { useState, useEffect } from "react";
import { Button, Group, Tabs, Select, LoadingOverlay } from "@mantine/core";
import { InfoCircle, Messages } from "tabler-icons-react";
import useTheme from "../../../hooks/useTheme";
import useReports from "../../../hooks/useReports";
import Conversation from "./../../Conversation/Conversation";
import useConversation from "../../../hooks/useConversation";
import "./view-report.scss";
import { ReportStatusTypes, ReportType } from "../../../types/reportsTypes";

interface Props {
  report: ReportType | null;
  closeModal: () => void;
  callback: () => void;
}

const ViewReport = ({ report, closeModal, callback }: Props) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { handleGetConversation, loading, setLoading, handlePostConversation } =
    useConversation(report?.id ?? "");

  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active);
  };

  return (
    <div className="r32">
      <Tabs active={activeTab} onTabChange={onChange} variant="outline">
        <Tabs.Tab icon={<InfoCircle size={14} />} label="Details" tabKey="1">
          <Details
            closeModal={closeModal}
            report={report}
            callback={callback}
          />
        </Tabs.Tab>
        <Tabs.Tab icon={<Messages size={14} />} label="Conversation" tabKey="2">
          <Conversation
            id={report?.id}
            onCancel={closeModal}
            disable={report?.status === "resolved"}
            {...{
              handleGetConversation,
              loading,
              setLoading,
              handlePostConversation,
            }}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

const Details = ({ closeModal, report, callback }: Props) => {
  const [status, setStatus] = useState<ReportStatusTypes | "">("");
  const { handleUpdateStatus } = useReports();
  const { dark } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (report) setStatus(report?.status);
    //eslint-disable-next-line
  }, []);

  const handleStatusChange = () => {
    setLoading(true);

    handleUpdateStatus(report?.id ?? "", status)
      .then(() => {
        callback();
        closeModal();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="view-details">
      <LoadingOverlay visible={loading} />

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Title:</div>
        <div className="d-r-right">{report?.title}</div>l
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
          {report?.staff_name ?? "No staff assigned"}
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
            value={status}
            onChange={(value: ReportStatusTypes) => {
              setStatus(value);
            }}
            data={[
              { value: ReportStatusTypes.RESOLVED, label: "Resolved" },
              { value: ReportStatusTypes.PENDING, label: "In-progress" },
              { value: ReportStatusTypes.UNRESOLVED, label: "Unresolved" },
            ]}
          />
        </div>
      </div>

      <Group position="right" mt="lg">
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>

        <Button
          onClick={handleStatusChange}
          disabled={report?.status === status}
        >
          Update Status
        </Button>
      </Group>
    </div>
  );
};

export default ViewReport;
