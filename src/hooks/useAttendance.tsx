import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassAttendance,
  getGeneralAttendance,
  markAttendance,
} from "../services/attendance/attendance";
import { showNotification } from "@mantine/notifications";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setAttendance } from "../redux/data/data.actions";

const useAttendance = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const attendance = useSelector((state: any) => {
    return state.data.attendance;
  });

  const handleGetGeneralAttendance = (
    page: number,
    perPage: number,
    date: string
  ) => {
    if (!attendance) {
      dispatch(showLoader(true));
    }

    getGeneralAttendance(page, perPage, date)
      .then((res) => {
        dispatch(setAttendance(res));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        dispatch(showLoader(false));
      });
  };

  const handleGetClassAttendance = (
    page: number,
    perPage: number,
    date: string,
    classId: string
  ) => {
    return new Promise((resolve) => {
      if (!attendance) {
        dispatch(showLoader(true));
      }

      getClassAttendance(page, perPage, date, classId)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setLoading(false);
          dispatch(showLoader(false));
        });
    });
  };

  const handleMarkAttendance = (data: any) => {
    dispatch(showLoader(true));

    markAttendance(data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Attendance marked successfully."} ✅`,
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
    handleGetGeneralAttendance,
    loading,
    setLoading,
    attendance,
    handleGetClassAttendance,
    handleMarkAttendance,
  };
};

export default useAttendance;
