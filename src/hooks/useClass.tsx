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
  addMultipleStudentsToClass,
} from "../services/class/class";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";

const useClass = () => {
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState<any>([]);
  const [classes, setClasses] = useState<any>({});
  const [allClasses, setAllClasses] = useState<any>([]);
  const [classInfo, setClassInfo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { handleError } = useNotification();
  const [classStudents, setClassStudents] = useState<any>([]);

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

  const getClassList = (page: number, perPage: number, all?: boolean) => {
    setLoading(true);

    getClasses({ page, perPage })
      .then((res) => {
        if (all) {
          setAllClasses(res.data);
        } else {
          setClasses(res);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
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
    setLoading(true);

    getClassStudents(id)
      .then((res) => {
        setClassStudents(res);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addMultipleStudents = (
    id: string,
    data: {
      students: string[];
    }
  ) => {
    dispatch(showLoader(true));

    addMultipleStudentsToClass(id, data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Students added successfully."} ✍️`,
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
    allClasses,
    addMultipleStudents,
  };
};

export default useClass;
