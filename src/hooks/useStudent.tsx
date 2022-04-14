import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { getStudents } from "../services/student/student";
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

  return {
    students,
    handleGetStudents,
    loading,
    setLoading,
  };
};

export default useStudent;
