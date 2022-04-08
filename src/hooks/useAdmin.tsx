import { useState } from "react";
import {
  getMedicalList,
  getStatesList,
  getStaffRoleList,
} from "../services/admin/admin";

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
