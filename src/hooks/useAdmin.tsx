import { useState } from "react";
import { getMedicalList, getStatesList } from "../services/helper/helper";
import { getStaffRoleList } from "../services/staff/staff";

const useAdmin = () => {
  const [medicals, setMedicals] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const [staffRoles, setStaffRoles] = useState<any>([]);

  const getMedicals = () => {
    getMedicalList().then((res) => {
      setMedicals(res.data);
    });
  };

  const getStates = () => {
    getStatesList().then((res) => {
      setStates(res.data);
    });
  };

  const getStaffRoles = () => {
    getStaffRoleList().then((res) => {
      setStaffRoles(res.data);
    });
  };

  return {
    medicals,
    states,
    staffRoles,
    getMedicals,
    getStates,
    getStaffRoles,
  };
};

export default useAdmin;
