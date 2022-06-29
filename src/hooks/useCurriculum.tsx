import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createCurriculumItem,
  updateCurriculumItem,
  getSubjectCurriculum,
} from "../services/curriculum/curriculum";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";

const useCurriculum = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCurriculumItem = (data: {
    title: string;
    description: string;
    subject_id: string;
    classroom_id: string;
    start_date: string;
    end_date: string;
    color: string;
    components: Array<string>;
  }) => {
    return new Promise((resolve) => {
      dispatch(showLoader(true));

      createCurriculumItem(data)
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Curriculum saved",
            color: "green",
          });
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          dispatch(showLoader(false));
        });
    });
  };

  const handleUpdateCurriculumItem = (
    curriculumId: string,
    data: {
      title: string;
      description: string;
      start_date: string;
      end_date: string;
      status: string;
      color: string;
      components: Array<string>;
    }
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      updateCurriculumItem(curriculumId, data)
        .then((res) => {
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

  const handleGetCurriculum = (
    page: number,
    perPage: number,
    subjectId: string,
    classroomId: string
  ) => {
    return new Promise((resolve) => {
      setLoading(true);

      getSubjectCurriculum(page, perPage, subjectId, classroomId)
        .then((res) => {
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

  return {
    setLoading,
    loading,
    handleCreateCurriculumItem,
    handleUpdateCurriculumItem,
    handleGetCurriculum,
  };
};

export default useCurriculum;
