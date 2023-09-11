import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";
import { ApiResponseType } from "../../types/utilityTypes";
import { SubjectType } from "../../types/subjectsTypes";

export const addSubject = (data: {
  name: string;
  category: string;
  description: string;
}) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.SUBJECT.SUBJECTS}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getSubjects = (
  page: number,
  perPage: number,
  search: string,
  staffId: string,
  classId: string
) => {
  return new Promise<ApiResponseType<SubjectType[]>>((resolve, reject) => {
    AxoisApi.get(
      `${APIS.SUBJECT.GET_SUBJECT_LIST(
        page,
        perPage,
        search,
        staffId,
        classId
      )}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const updateSubject = (
  id: string,
  data: {
    name: string;
    category: string;
    description: string;
  }
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.SUBJECT.SUBJECT(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const assignClassAndTeacher = (
  id: string,
  data: {
    teacher: string;
    classroom: string;
  }
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.SUBJECT.ASSIGN_CLASS_AND_TEACHER(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
