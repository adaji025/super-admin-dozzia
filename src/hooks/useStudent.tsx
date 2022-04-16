import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  getStudents,
  addStudentToClass,
  getStudentWithUsername,
} from "../services/student/student";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";

const useStudent = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [students, setStudents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetStudents = (page: number, perPage: number) => {
    setLoading(true);
    getStudents({ page, perPage })
      .then((res) => {
        setStudents(res);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const addToClass = (values: { studentId: string; classId: string }) => {
    dispatch(showLoader(true));

    addStudentToClass(values.studentId, values.classId)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Student added to class."} 🏫`,
          color: "green",
        });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const getInfoWithUsername = (username: string) => {
    return new Promise((resolve, reject) => {
      getStudentWithUsername(username)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
          reject(error);
        });
    });
  };

  return {
    students,
    handleGetStudents,
    loading,
    setLoading,
    addToClass,
    getInfoWithUsername,
  };
};

export default useStudent;
