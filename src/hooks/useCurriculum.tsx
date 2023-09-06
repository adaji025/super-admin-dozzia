import { useState } from "react";
import {
  createCurriculumItem,
  updateCurriculumItem,
  getSubjectCurriculum,
} from "../services/curriculum/curriculum";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";
import moment from "moment";

const useCurriculum = () => {
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCurriculumItem = (data: {
    title: string;
    description: string;
    subject_id: string;
    classroom_id: string;
    term_id: string;
    start_date: string;
    end_date: string;
    color: string;
    components: Array<string>;
  }) => {
    return new Promise((resolve) => {
      setLoading(true);

      createCurriculumItem({
        ...data,
        start_date: moment(data?.start_date).format("YYYY-MM-DD"),
        end_date: moment(data?.end_date).format("YYYY-MM-DD"),
      })
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Curriculum saved",
            color: "green",
          });
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
