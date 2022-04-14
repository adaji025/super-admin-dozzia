import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useClass from "../../hooks/useClass";

const ClassInfo = () => {
  const location: any = useLocation();
  const { getClass } = useClass();
  useEffect(() => {
    getClass(location?.state?.classId);
    //eslint-disable-next-line
  }, []);

  return <div>ClassInfo</div>;
};

export default ClassInfo;
