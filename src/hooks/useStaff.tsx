import { useState } from "react";
import { getStaffList } from "../services/staff/staff";

const useClass = () => {
  const [allStaff, setAllStaff] = useState<any>({ data: [] });
  const [staffList, setStaffList] = useState<any>([]);

  const handleGetStaffList = (
    page: number,
    perPage: number,
    query: "",
    role: string,
    all?: boolean
  ) => {
    getStaffList({ page, perPage, query, role })
      .then((res) => {
        if (all) {
          setAllStaff(res);
        } else {
          setStaffList(res);
        }
      })
      .catch(() => {});
  };

  return {
    allStaff,
    staffList,
    handleGetStaffList,
  };
};

export default useClass;
