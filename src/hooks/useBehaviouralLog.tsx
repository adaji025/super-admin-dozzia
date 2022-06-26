import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createRemark,
  updateRemark,
  deleteRemark,
  getRemarks,
  postComment,
  getComments,
} from "../services/behaviouralLog/behaviouralLog";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";

const useBehaviouralLog = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(0);

  const handleCreateRemark = (data: {
    is_draft: string;
    student_id: string;
    category: string;
    description: string;
    published_at: string;
  }) => {
    return new Promise((resolve) => {
      setLoading(true);

      createRemark(data)
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Remark saved",
            color: "green",
          });
          setTrigger(trigger + 1);
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

  const handleGetRemarks = (
    page: number,
    perPage: number,
    studentId: string
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      getRemarks(page, perPage, studentId)
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

  // const handleGetTaskResponses = (
  //   page: number,
  //   perPage: number,
  //   taskId: string
  // ) => {
  //   return new Promise((resolve) => {
  //     setLoading(true);

  //     getTaskResponses(page, perPage, taskId)
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((error) => {
  //         handleError(error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   });
  // };

  // const handleGetStudyResourceFiles = (id: string) => {
  //   return new Promise((resolve) => {
  //     setLoading(true);

  //     getStudyResourceFiles(id)
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((error) => {
  //         handleError(error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   });
  // };

  return {
    setLoading,
    loading,
    handleCreateRemark,
    trigger,
    handleGetRemarks,
  };
};

export default useBehaviouralLog;
