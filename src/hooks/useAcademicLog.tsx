import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createTask,
  getTaskResponses,
  // gradeTaskResponse,
  getTasks,
} from "../services/academicLog/academicLog";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";

const useAcademicLog = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(0);

  const handleCreateTask = (values: {
    title: string;
    description: string;
    subject_id: string;
    classroom_id: string;
    end_at: string;
    document: any;
    link: string;
  }) => {
    dispatch(showLoader(true));

    const data = new FormData();
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("subject_id", values.subject_id);
    data.append("classroom_id", values.classroom_id);
    data.append("end_at", values.end_at);
    data.append("link", values.link);
    if (values.document) {
      data.append("document", values?.document);
    }

    createTask(data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Task created successfully",
          color: "green",
        });
        setTrigger(trigger + 1);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleGetTasks = (
    page: number,
    perPage: number,
    classId: string,
    subjectId: string
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      getTasks(page, perPage, classId, subjectId)
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

  const handleGetTaskResponses = (
    page: number,
    perPage: number,
    taskId: string
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      getTaskResponses(page, perPage, taskId)
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
    handleCreateTask,
    trigger,
    handleGetTasks,
    handleGetTaskResponses,
  };
};

export default useAcademicLog;
