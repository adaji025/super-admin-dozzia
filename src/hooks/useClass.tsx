import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setClasses } from "../redux/data/data.actions";
import { ApiResponseType } from "../types/utilityTypes";
import {
  ClassesState,
  ClassroomType,
  CreateClassData,
} from "../types/classTypes";
import { StudentType, StudentsState } from "../types/studentTypes";
import { initialArrayDataState } from "../redux/data/data.reducer";

const useClass = () => {
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState<any>([]);
  const [classLevels] = useState<Array<string>>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const [allClasses, setAllClasses] = useState<ClassroomType[]>([]);
  const [classInfo, setClassInfo] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { handleError } = useNotification();
  const [classStudents, setClassStudents] = useState<StudentsState>(
    initialArrayDataState
  );
  const classes = useSelector(
    (state: { data: { classes: ClassesState } }) => state.data.classes
  );

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

  const handleAddClass = (values: CreateClassData) => {
    dispatch(showLoader(true));

    addClass(values)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Class added successfully."} 🏫`,
          color: "green",
        });
        getClassList(1, 20, "", "");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const getClassList = (
    page: number,
    perPage: number,
    level: string,
    search: string,
    all?: boolean,
    staffId?: string
  ) => {
    return new Promise<ClassroomType[]>((resolve) => {
      if (!classes.dataFetched) setLoading(true);

      getClasses(page, perPage, level, search, staffId)
        .then((res: ApiResponseType<ClassroomType[]>) => {
          if (all) {
            setAllClasses(res.data);
          } else {
            dispatch(setClasses({ ...res, dataFetched: true }));
          }
          resolve(res.data);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
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

  const handleUpdateClass = (data: CreateClassData, id: string) => {
    dispatch(showLoader(true));

    updateClass(id, data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Class updated successfully."} ✍️`,
          color: "green",
        });
        getClassList(1, 10, "", "");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleGetClassStudents = (
    id: string,
    page: number,
    perPage: number
  ) => {
    setLoading(true);

    getClassStudents(id, page, perPage)
      .then((res: ApiResponseType<StudentType[]>) => {
        setClassStudents({ ...res, dataFetched: true });
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
    return new Promise((resolve, reject) => {
      addMultipleStudentsToClass(id, data)
        .then((res) => {
          showNotification({
            title: "Success",
            message: `${"Students added successfully."} ✍️`,
            color: "green",
          });
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
          reject(error);
        });
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
    classLevels,
  };
};

export default useClass;
