import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  uploadStudyResourceFile,
  getStudyResourceFiles,
  deleteStudyResourceFile,
  postStudyResource,
  getStudyResources,
  deleteStudyResource,
} from "../services/studyResources/studyResources";
import { showLoader } from "../redux/utility/utility.actions";
import useNotification from "./useNotification";
import { showNotification } from "@mantine/notifications";

const useStudyResources = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadStudyResourceFile = (file: any) => {
    return new Promise((resolve) => {
      setLoading(true);

      const data = new FormData();
      data.append("study_resource_file", file);

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
    return new Promise((resolve) => {
      setLoading(true);

      getStudyResources(page, perPage, classId, subjectId)
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

  return {
    setLoading,
    loading,
    handlePostStudyResource,
    handleUploadStudyResourceFile,
    handleGetStudyResources,
    handleDeleteStudyResource,
  };
};

export default useStudyResources;
