import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  addSubject,
  getSubjects,
  updateSubject,
  assignClassAndTeacher,
  getSubjectClasses,
} from "../services/subject/subject";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setSubjects } from "../redux/data/data.actions";

const useSubject = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const subjects = useSelector((state: any) => {
    return state.data.subjects;
  });

  const handleAddSubject = (values: {
    name: string;
    category: string;
    description: string;
  }) => {
    dispatch(showLoader(true));

    addSubject({
      name: values.name,
      category: values.category,
      description: values.description,
    })
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Subject added successfully."} 📗`,
          color: "green",
        });
        getSubjectList(1, 10);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const getSubjectList = (page: number, perPage: number) => {
    if (subjects === null) {
      setLoading(true);
    }

    getSubjects({ page, perPage })
      .then((res) => {
        setLoading(false);
        dispatch(setSubjects(res));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateSubject = (
    id: string,
    data: {
      name: string;
      category: string;
      description: string;
    }
  ) => {
    dispatch(showLoader(true));

    updateSubject(id, data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Subject updated successfully."} ✍️`,
          color: "green",
        });
        getSubjectList(1, 10);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleAssignClassAndTeacher = (
    id: string,
    data: {
      teacher: string;
      classroom: string;
    }
  ) => {
    dispatch(showLoader(true));

    assignClassAndTeacher(id, data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Subject added to class."} ✅`,
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

  const handleGetSubjectClasses = (id: string) => {
    return new Promise((resolve, reject) => {
      getSubjectClasses(id)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    handleAddSubject,
    subjects,
    getSubjectList,
    loading,
    setLoading,
    handleUpdateSubject,
    handleAssignClassAndTeacher,
    handleGetSubjectClasses,
  };
};

export default useSubject;
