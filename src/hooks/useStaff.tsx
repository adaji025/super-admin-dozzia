import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStaffList,
  deleteStaff,
  getSuspendedStaff,
  restoreSuspendedStaff,
  getStaffDetails,
} from "../services/staff/staff";
import { setStaff } from "../redux/data/data.actions";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";
import { StaffState, StaffType } from "../types/staffTypes";
import { ApiResponseType } from "../types/utilityTypes";
import { initialArrayDataState } from "../redux/data/data.reducer";

const useStaff = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [allStaff, setAllStaff] = useState<StaffState>(initialArrayDataState);
  const [loading, setLoading] = useState<boolean>(false);
  const staffList = useSelector((state: { data: { staff: StaffState } }) => {
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
    if (!staffList.dataFetched) setLoading(true);

    getStaffList({ page, perPage, query, role })
      .then((res: ApiResponseType<StaffType[]>) => {
        if (all) {
          setAllStaff({ ...res, dataFetched: true });
        } else {
          dispatch(setStaff({ ...res, dataFetched: true }));
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetStaffDetails = (id: string) => {
    return new Promise<ApiResponseType<StaffType>>((resolve) => {
      setLoading(true);

      getStaffDetails(id)
        .then((res: ApiResponseType<StaffType>) => {
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

  const handleDeleteStaff = (id: string) => {
    dispatch(showLoader(true));

    deleteStaff(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Staff account suspended."} 🏫`,
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

  const handleGetSuspendedStaff = () => {
    return new Promise((resolve) => {
      setLoading(true);

      getSuspendedStaff()
        .then((res) => {
          resolve(res);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleRestoreStaff = (id: string) => {
    return new Promise((resolve) => {
      dispatch(showLoader(true));

      restoreSuspendedStaff(id)
        .then((res) => {
          showNotification({
            title: "Success",
            message: `${"Staff account restored."} 🏫`,
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
    allStaff,
    staffList,
    handleGetStaffList,
    setLoading,
    loading,
    handleDeleteStaff,
    username,
    handleGetSuspendedStaff,
    handleRestoreStaff,
    handleGetStaffDetails,
  };
};

export default useStaff;
