import { useState } from "react";
import { getMedicalList } from "../services/admin/admin";

const useAdmin = () => {
  const [medicals, setMedicals] = useState<any>(null);

  const getMedicals = () => {
    getMedicalList().then((res) => {
      setMedicals(res.data);
    });
  };

  return {
    medicals,
    getMedicals,
  };
};

export default useAdmin;
