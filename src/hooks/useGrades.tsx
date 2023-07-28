import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  addGrade,
  getGrades,
  deleteGrade,
  updateRemark,
  updateGrade,
} from "../services/grades/grades";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setGrades } from "../redux/data/data.actions";
import { CreateGradeData } from "../types/gradeTypes";

const useGrades = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const grades = useSelector((state: any) => {
    return state.data.grades;
  });

  const handleAddGrade = (values: CreateGradeData) => {
    return new Promise((resolve, reject) => {
      addGrade(values)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleUpdateGrade = (values: CreateGradeData, id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);

      updateGrade(values, id)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
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
    handleUpdateGrade,
    handleGetGrades,
    handleDeleteGrade,
    handleUpdateRemark,
  };
};

export default useGrades;
