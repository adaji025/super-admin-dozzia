import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffList } from "../services/staff/staff";
import { setStaff } from "../redux/data/data.actions";

const useStaff = () => {
  const dispatch = useDispatch();
  const [allStaff, setAllStaff] = useState<any>({ data: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const staffList = useSelector((state: any) => {
    return state.data.staff;
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

  return {
    allStaff,
    staffList,
    handleGetStaffList,
    loading,
  };
};

export default useStaff;
