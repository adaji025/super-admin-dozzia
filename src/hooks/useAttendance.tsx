import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassAttendance,
  getGeneralAttendance,
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

  return {
    handleGetGeneralAttendance,
    loading,
    setLoading,
    attendance,
  };
};

export default useAttendance;
