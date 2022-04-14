import { useState } from "react";
import { useDispatch } from "react-redux";
import { getStaffList } from "../services/staff/staff";
import { showNotification } from "@mantine/notifications";
import {
  addClass,
  getClasses,
  getClassInfo,
  updateClass,
  getClassStudents,
} from "../services/class/class";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";

const useClass = () => {
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState<any>([]);
  const [classInfo, setClassInfo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { handleError } = useNotification();
  const [classStudents, setClassStudents] = useState<any[]>([]);

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

  const handleAddClass = (values: {
    classroom_level: string;
    classroom_name: string;
    classroom_teacher: string;
    classroom_description: string;
  }) => {
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
        getClassList(1, 10);
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

  const getClass = (id: string) => {
    getClassInfo(id)
      .then((res) => {
        setClassInfo(res);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleUpdateClass = (
    id: string,
    data: {
      classroom_level: string;
      classroom_name: string;
      classroom_teacher: string;
      classroom_description: string;
    }
  ) => {
    dispatch(showLoader(true));

    updateClass(id, data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Class updated successfully."} ✍️`,
          color: "green",
        });
        getClassList(1, 10);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleGetClassStudents = (id: string) => {
    getClassStudents(id)
      .then((res) => {
        setClassStudents(res);
        console.log(res);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return {
    classes,
    teachers,
    getTeachers,
    handleAddClass,
    getClassList,
    loading,
    setLoading,
    getClass,
    classInfo,
    handleUpdateClass,
    handleGetClassStudents,
    classStudents,
  };
};

export default useClass;
