import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { getStaffList } from "../services/staff/staff";
// import { showNotification } from "@mantine/notifications";

const useClass = () => {
  const [allStaff, setAllStaff] = useState<any>({ data: [] });
  const [staffList, setStaffList] = useState<any>([]);
  // const classes = useSelector((state: any) => {
  //   return state.data.classes;
  // });

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
