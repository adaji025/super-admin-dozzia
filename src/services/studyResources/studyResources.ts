import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const uploadStudyResourceFile = (data: any) => {
  return AxoisApi.post(
    `${APIS.STUDY_RESOURCES.UPLOAD_STUDY_RESOURCE_FILE}`,
    data
  ).then((res) => {
    return res.data;
  });
};

export const getStudyResourceFiles = (id: string) => {
  return AxoisApi.get(
    `${APIS.STUDY_RESOURCES.GET_STUDY_RESOURCE_FILES(id)}`
  ).then((res) => {
    return res.data;
  });
};

export const deleteStudyResourceFile = (id: string) => {
  return AxoisApi.delete(
    `${APIS.STUDY_RESOURCES.DELETE_STUDY_RESOURCE_FILE(id)}`
  ).then((res) => {
    return res.data;
  });
};

export const postStudyResource = (data: {
  title: string;
  description: string;
  subject_id: string;
  classroom_id: string;
  external_link: string;
  files: Array<string>;
}) => {
  return AxoisApi.post(`${APIS.STUDY_RESOURCES.STUDY_RESOURCE}`, data).then(
    (res) => {
      return res.data;
    }
  );
};

export const getStudyResources = (
  page: number,
  perPage: number,
  classroomId: string,
  subjectId: string
) => {
  return AxoisApi.get(
    `${APIS.STUDY_RESOURCES.STUDY_RESOURCE}?per_page=${perPage}&page=${page}&classroom_id=${classroomId}&subject_id=${subjectId}`
  ).then((res) => {
    return res.data;
  });
};

export const deleteStudyResource = (id: string) => {
  return AxoisApi.delete(
    `${APIS.STUDY_RESOURCES.DELETE_STUDY_RESOURCE(id)}`
  ).then((res) => {
    return res.data;
  });
};
