import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { CreateClassData } from "../../types/classTypes";

export const addClass = (data: CreateClassData) => {
  return AxoisApi.post(`${APIS.CLASS.CREATE_CLASS}`, data).then((res) => {
    return res.data;
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
  return AxoisApi.get(
    `${APIS.CLASS.GET_CLASS_LIST(
      page,
      perPage,
      level,
      search,
      staffId,
      subjectId
    )}`
  ).then((res) => {
    return res.data;
  });
};

export const getClassInfo = (id: string) => {
  return AxoisApi.get(`${APIS.CLASS.CLASS(id)}`).then((res) => {
    return res.data;
  });
};

export const updateClass = (id: string, data: CreateClassData) => {
  return AxoisApi.put(`${APIS.CLASS.CLASS(id)}`, data).then((res) => {
    return res.data;
  });
};

export const getClassStudents = (id: string, page: number, perPage: number) => {
  return AxoisApi.get(
    `${APIS.CLASS.GET_CLASS_STUDENTS(id, page, perPage)}`
  ).then((res) => {
    return res.data;
  });
};

export const addMultipleStudentsToClass = (
  id: string,
  data: {
    students: string[];
  }
) => {
  return AxoisApi.post(
    `${APIS.CLASS.ADD_MULTIPLE_STUDENTS_TO_CLASS(id)}`,
    data
  ).then((res) => {
    return res.data;
  });
};
