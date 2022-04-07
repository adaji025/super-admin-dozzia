import { useState } from "react";
import { getMedicalList } from "../services/administration/administration";

const useAdministration = () => {
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

export default useAdministration;
