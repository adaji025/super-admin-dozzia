import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  getStudents,
  addStudentToClass,
  getStudentWithUsername,
  getStudentDetails,
} from "../services/student/student";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setStudents } from "../redux/data/data.actions";

const useStudent = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const students = useSelector((state: any) => {
    return state.data.students;
  });

  const handleGetStudents = (page: number, perPage: number, search: string) => {
    if (students === null) {
      setLoading(true);
    }
    getStudents(page, perPage, search)
      .then((res) => {
        dispatch(setStudents(res));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetStudentDetails = (id: string) => {
    return new Promise((resolve) => {
      setLoading(true);

      getStudentDetails(id)
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
    handleGetStudentDetails,
  };
};

export default useStudent;
