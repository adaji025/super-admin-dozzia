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
          message: "Resource posted successfully",
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

  return {
    setLoading,
    loading,
    handlePostStudyResource,
    handleUploadStudyResourceFile,
  };
};

export default useStudyResources;
