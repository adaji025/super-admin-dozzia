import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import {
  getStudentReportCard,
  approveReportCard,
} from "../services/reportCard/reportCard";
import useNotification from "./useNotification";

const useReportCard = () => {
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetStudentReportCard = (termId: string, studentId: string) => {
    return new Promise((resolve) => {
      setLoading(true);

      getStudentReportCard(termId, studentId)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleApproveReportCard = (reportCardId: string) => {
    return new Promise((resolve) => {
      setLoading(true);

      approveReportCard(reportCardId)
        .then((res) => {
          showNotification({
            title: "Success",
            message: `${"Report card approved."}`,
            color: "green",
          });
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return {
    loading,
    setLoading,
    handleGetStudentReportCard,
    handleApproveReportCard,
  };
};

export default useReportCard;
