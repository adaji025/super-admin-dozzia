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
import { StudentsState, StudentType } from "../types/studentTypes";
import { ApiResponseType } from "../types/utilityTypes";

const useStudent = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const students = useSelector(
    (state: { data: { students: StudentsState } }) => {
      return state.data.students;
    }
  );

  const handleGetStudents = (page: number, perPage: number, search: string) => {
    if (!students.dataFetched) setLoading(true);

    getStudents(page, perPage, search)
      .then((res: ApiResponseType<StudentType>) => {
        dispatch(setStudents({ ...res, dataFetched: true }));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetStudentDetails = (id: string) => {
    return new Promise<ApiResponseType<StudentType>>((resolve) => {
      setLoading(true);

      getStudentDetails(id)
        .then((res: ApiResponseType<StudentType>) => {
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
