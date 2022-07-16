import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { postTestExams, getTestExams } from "../services/testExams/testExams";
import useNotification from "./useNotification";

const useTestExams = () => {
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostTestExam = (
    id: string,
    values: {
      first_ca_score: string;
      second_ca_score: string;
      third_ca_score: string;
      exam_score: string;
      grade_id: string;
    }
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      postTestExams(id, values)
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Scores saved successfully.",
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

  const handleGetTestExams = (classId: string) => {
    return new Promise((resolve) => {
      setLoading(true);

      getTestExams(classId)
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

  return {
    loading,
    setLoading,
    handlePostTestExam,
    handleGetTestExams,
  };
};

export default useTestExams;
