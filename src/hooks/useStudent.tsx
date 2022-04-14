import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { getStudents, addStudentToClass } from "../services/student/student";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";

const useStudent = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [students, setStudents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetStudents = (page: number, perPage: number) => {
    getStudents({ page, perPage })
      .then((res) => {
        setStudents(res);
      })
      .catch(() => {});
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

  return {
    students,
    handleGetStudents,
    loading,
    setLoading,
    addToClass,
  };
};

export default useStudent;
