import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReports, updateStatus } from "../services/reports/reports";
import { setReports } from "../redux/data/data.actions";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";

const useReports = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const reports = useSelector((state: any) => {
    return state.data.reports;
  });

  const handleGetReports = (page: number, perPage: number, status: string) => {
    if (!reports) {
      setLoading(true);
    }

    getReports(page, perPage, status)
      .then((res) => {
        dispatch(setReports(res));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateStatus = (id: string, status: string) => {
    return new Promise((resolve) => {
      dispatch(showLoader(true));

      updateStatus(id, { status })
        .then((res) => {
          showNotification({
            title: "Success",
            message: `${"Status updated."}`,
            color: "green",
          });
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          dispatch(showLoader(false));
        });
    });
  };

  return {
    handleGetReports,
    reports,
    loading,
    setLoading,
    handleUpdateStatus,
  };
};

export default useReports;
