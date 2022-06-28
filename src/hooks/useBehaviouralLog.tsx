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

  const handleCreateRemark = (data: {
    is_draft: boolean;
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

  const handleUpdateRemark = (
    remarkId: string,
    data: {
      is_draft: boolean;
      category: string;
      description: string;
      published_at: string;
    }
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      updateRemark(remarkId, data)
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Remark updated",
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

  const handleDeleteRemark = (remarkId: string) => {
    return new Promise((resolve) => {
      setLoading(true);

      deleteRemark(remarkId)
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Remark Deleted",
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
    setLoading,
    loading,
    handleCreateRemark,
    handleGetRemarks,
    handleUpdateRemark,
    handleDeleteRemark,
  };
};

export default useBehaviouralLog;
