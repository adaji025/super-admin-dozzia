import { useEffect, Fragment } from "react";
import useClass from "../../../hooks/useClass";

const ClassStudents = ({
  classId,
  closeModal,
  modalActive,
}: {
  classId: string;
  closeModal: () => void;
  modalActive: boolean;
}) => {
  const { handleGetClassStudents, classStudents } = useClass();

  useEffect(() => {
    if (modalActive) {
      handleGetClassStudents(classId);
    }
    console.log(classStudents);

    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="div">saaaaaaaaa</div>
    </Fragment>
  );
};

export default ClassStudents;
