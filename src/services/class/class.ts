import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { ClassroomType, CreateClassData } from "../../types/classTypes";
import { AxiosError } from "axios";
import { ApiResponseType } from "../../types/utilityTypes";
import { StudentType } from "../../types/studentTypes";

export const addClass = (data: CreateClassData) => {
  return new Promise<void>((resolve, reject) => {
    AxoisApi.post(`${APIS.CLASS.CREATE_CLASS}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getClasses = (
  page: number,
  perPage: number,
  level: string,
  search: string,
  staffId?: string,
  subjectId?: string
) => {
  return new Promise<ApiResponseType<ClassroomType[]>>((resolve, reject) => {
    AxoisApi.get(
      `${APIS.CLASS.GET_CLASS_LIST(
        page,
        perPage,
        level,
        search,
        staffId,
        subjectId
      )}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getClassInfo = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.CLASS.CLASS(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const updateClass = (id: string, data: CreateClassData) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.CLASS.CLASS(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getClassStudents = (id: string, page: number, perPage: number) => {
  return new Promise<ApiResponseType<StudentType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.CLASS.GET_CLASS_STUDENTS(id, page, perPage)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const addMultipleStudentsToClass = (
  id: string,
  data: {
    students: string[];
  }
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.CLASS.ADD_MULTIPLE_STUDENTS_TO_CLASS(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
