import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffList, deleteStaff } from "../services/staff/staff";
import { setStaff } from "../redux/data/data.actions";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";

const useStaff = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [allStaff, setAllStaff] = useState<any>({ data: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const staffList = useSelector((state: any) => {
    return state.data.staff;
  });
  const username = useSelector((state: any) => {
    return state.user.userdata.username;
  });

  const handleGetStaffList = (
    page: number,
    perPage: number,
    query: string,
    role: string,
    all?: boolean
  ) => {
    setLoading(true);

    getStaffList({ page, perPage, query, role })
      .then((res) => {
        if (all) {
          setAllStaff(res);
        } else {
          dispatch(setStaff(res));
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteStaff = (id: string) => {
    dispatch(showLoader(true));

    deleteStaff(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Staff account deleted."} 🏫`,
          color: "green",
        });
        handleGetStaffList(1, 10, "", "");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  return {
    allStaff,
    staffList,
    handleGetStaffList,
    loading,
    handleDeleteStaff,
    username,
  };
};

export default useStaff;
