import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  uploadStudyResourceFile,
  getStudyResourceFiles,
  postStudyResource,
  getStudyResources,
  deleteStudyResource,
} from "../services/studyResources/studyResources";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";
import { ApiResponseType } from "../types/utilityTypes";
import { StudyResourceType } from "../types/studyResourcesTypes";
import { AxiosError } from "axios";

const useStudyResources = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(0);

  const handleUploadStudyResourceFile = (file: any) => {
    return new Promise((resolve) => {
      setLoading(true);

      const data = new FormData();
      data.append("file", file);

      uploadStudyResourceFile(data)
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

  const handlePostStudyResource = (data: {
    title: string;
    description: string;
    subject_id: string;
    classroom_id: string;
    external_link: string;
    files: Array<string>;
  }) => {
    dispatch(showLoader(true));

    postStudyResource(data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Resource created successfully",
          color: "green",
        });
        setTrigger(trigger + 1);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleGetStudyResources = (
    page: number,
    perPage: number,
    classId: string,
    subjectId: string
  ) => {
    return new Promise<ApiResponseType<StudyResourceType[]>>((resolve) => {
      setLoading(true);

      getStudyResources(page, perPage, classId, subjectId)
        .then((res: ApiResponseType<StudyResourceType[]>) => {
          resolve(res);
        })
        .catch((error: AxiosError) => {
          handleError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleDeleteStudyResource = (id: string) => {
    return new Promise((resolve) => {
      dispatch(showLoader(true));

      deleteStudyResource(id)
        .then((res) => {
          showNotification({
            title: "Success",
            message: `${"Resource deleted successfully."}`,
            color: "green",
          });
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          dispatch(showLoader(false));
        });
    });
  };

  const handleGetStudyResourceFiles = (id: string) => {
    return new Promise((resolve) => {
      setLoading(true);

      getStudyResourceFiles(id)
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
    handlePostStudyResource,
    handleUploadStudyResourceFile,
    handleGetStudyResources,
    handleDeleteStudyResource,
    handleGetStudyResourceFiles,
    trigger,
  };
};

export default useStudyResources;
