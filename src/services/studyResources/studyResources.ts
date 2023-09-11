import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";
import { ApiResponseType } from "../../types/utilityTypes";
import { StudyResourceType } from "../../types/studyResourcesTypes";

export const uploadStudyResourceFile = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.STUDY_RESOURCES.UPLOAD_STUDY_RESOURCE_FILE}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getStudyResourceFiles = (id: string) => {
  return new Promise((resolve, reject) => {
    return AxoisApi.get(`${APIS.STUDY_RESOURCES.GET_STUDY_RESOURCE_FILES(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const deleteStudyResourceFile = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.STUDY_RESOURCES.DELETE_STUDY_RESOURCE_FILE(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
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
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.STUDY_RESOURCES.STUDY_RESOURCE}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getStudyResources = (
  page: number,
  perPage: number,
  classroomId: string,
  subjectId: string
) => {
  return new Promise<ApiResponseType<StudyResourceType[]>>(
    (resolve, reject) => {
      AxoisApi.get(
        `${APIS.STUDY_RESOURCES.STUDY_RESOURCE}?per_page=${perPage}&page=${page}&classroom_id=${classroomId}&subject_id=${subjectId}`
      )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    }
  );
};

export const deleteStudyResource = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.STUDY_RESOURCES.DELETE_STUDY_RESOURCE(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
