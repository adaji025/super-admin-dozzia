import { useState } from "react";
import { useDispatch } from "react-redux";
import { getStaffList } from "../services/staff/staff";
import { showNotification } from "@mantine/notifications";
import { addClass, getClasses } from "../services/class/class";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";

const useClass = () => {
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { handleError } = useNotification();

  const getTeachers = (
    page: number,
    perPage: number,
    query: "",
    role: string
  ) => {
    getStaffList({ page, perPage, query, role })
      .then((res) => {
        setTeachers(res.data);
      })
      .catch(() => {});
  };

  const handleAddClass = (values: any) => {
    dispatch(showLoader(true));

    addClass({
      classroom_level: values.classroom_level,
      classroom_name: values.classroom_name,
      classroom_teacher: values.classroom_teacher,
      classroom_description: values.classroom_description,
    })
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Class added successfully."} 🏫`,
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

  const getClassList = (page: number, perPage: number) => {
    getClasses({ page, perPage })
      .then((res) => {
        setLoading(false);
        setClasses(res);
      })
      .catch(() => {});
  };

  return {
    classes,
    teachers,
    getTeachers,
    handleAddClass,
    getClassList,
    loading,
    setLoading,
  };
};

export default useClass;
