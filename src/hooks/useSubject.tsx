import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  addSubject,
  getSubjects,
  updateSubject,
} from "../services/subject/subject";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";

const useSubject = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [subjects, setSubjects] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    getSubjects({ page, perPage })
      .then((res) => {
        setLoading(false);
        setSubjects(res);
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

  return {
    handleAddSubject,
    subjects,
    getSubjectList,
    loading,
    setLoading,
    handleUpdateSubject,
  };
};

export default useSubject;
