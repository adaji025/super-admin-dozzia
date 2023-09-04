import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  addSubject,
  getSubjects,
  updateSubject,
  assignClassAndTeacher,
} from "../services/subject/subject";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setSubjects } from "../redux/data/data.actions";
import {
  CreateSubjectData,
  SubjectType,
  SubjectsState,
} from "../types/subjectsTypes";
import { ApiResponseType } from "../types/utilityTypes";
import { ClassroomType } from "../types/classTypes";
import { getClasses } from "../services/class/class";

const useSubject = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [allSubjects, setAllSubjects] = useState<SubjectType[]>([]);
  const subjects = useSelector(
    (state: { data: { subjects: SubjectsState } }) => {
      return state.data.subjects;
    }
  );

  const handleAddSubject = (values: CreateSubjectData) => {
    dispatch(showLoader(true));

    addSubject({
      name: values.name,
      category: values.category,
      description: values.description,
    })
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Subject added successfully."} 📗`,
          color: "green",
        });
        getSubjectList(1, 10, "");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const getSubjectList = (
    page: number,
    perPage: number,
    search: string,
    all?: boolean,
    staffId?: string,
    classId?: string
  ) => {
    return new Promise((resolve) => {
      if (!subjects.dataFetched || all) setLoading(true);

      getSubjects(page, perPage, search, staffId ?? "", classId ?? "")
        .then((res: ApiResponseType<SubjectType[]>) => {
          if (all) {
            setAllSubjects(res.data);
          } else {
            dispatch(setSubjects({ ...res, dataFetched: true }));
          }
          resolve(res);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleUpdateSubject = (data: CreateSubjectData, id: string) => {
    dispatch(showLoader(true));

    updateSubject(id, data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Subject updated successfully."} ✍️`,
          color: "green",
        });
        getSubjectList(1, 10, "");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleAssignClassAndTeacher = (
    id: string,
    data: {
      teacher: string;
      classroom: string;
    }
  ) => {
    dispatch(showLoader(true));

    assignClassAndTeacher(id, data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Subject added to class."} ✅`,
          color: "green",
        });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleGetSubjectClasses = (subjectId: string) => {
    return new Promise<ClassroomType[]>((resolve, reject) => {
      getClasses(1, 100, "", "", "", subjectId)
        .then((res: ApiResponseType<ClassroomType[]>) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    handleAddSubject,
    subjects,
    getSubjectList,
    loading,
    setLoading,
    handleUpdateSubject,
    handleAssignClassAndTeacher,
    handleGetSubjectClasses,
    allSubjects,
  };
};

export default useSubject;
