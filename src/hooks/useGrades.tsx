import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  addGrade,
  getGrades,
  deleteGrade,
  updateRemark,
} from "../services/grades/grades";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setGrades } from "../redux/data/data.actions";

const useGrades = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const grades = useSelector((state: any) => {
    return state.data.grades;
  });

  const handleAddGrade = (values: {
    name: string;
    remark: string;
    min_score: string;
    max_score: string;
  }) => {
    return new Promise((resolve) => {
      setLoading(true);

      addGrade(values)
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Grade added successfully.",
            color: "green",
          });
          handleGetGrades();
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

  const handleGetGrades = () => {
    if (!grades) {
      setLoading(true);
    }

    getGrades()
      .then((res) => {
        dispatch(setGrades(res));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteGrade = (id: string) => {
    dispatch(showLoader(true));

    deleteGrade(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Grade deleted successfully."}`,
          color: "green",
        });
        handleGetGrades();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleUpdateRemark = (
    id: string,
    values: {
      remark: string;
    }
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      updateRemark(id, values)
        .then((res) => {
          showNotification({
            title: "Success",
            message: `${"Remark updated successfully."}`,
            color: "green",
          });
          handleGetGrades();
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

  return {
    grades,
    loading,
    setLoading,
    handleAddGrade,
    handleGetGrades,
    handleDeleteGrade,
    handleUpdateRemark,
  };
};

export default useGrades;
