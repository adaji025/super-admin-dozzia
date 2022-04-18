import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const addSubject = (data: {
  name: string;
  category: string;
  description: string;
}) => {
  return AxoisApi.post(`${APIS.SUBJECT.SUBJECTS}`, data).then((res) => {
    return res.data;
  });
};

export const getSubjects = (data: { page: number; perPage: number }) => {
  return AxoisApi.get(
    `${APIS.SUBJECT.GET_SUBJECT_LIST(data.page, data.perPage)}`
  ).then((res) => {
    return res.data;
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
  return AxoisApi.put(`${APIS.SUBJECT.SUBJECT(id)}`, data).then((res) => {
    return res.data;
  });
};

export const assignClassAndTeacher = (
  id: string,
  data: {
    teacher: string;
    classroom: string;
  }
) => {
  return AxoisApi.post(
    `${APIS.SUBJECT.ASSIGN_CLASS_AND_TEACHER(id)}`,
    data
  ).then((res) => {
    return res.data;
  });
};

export const getSubjectClasses = (id: string) => {
  return AxoisApi.get(`${APIS.SUBJECT.GET_SUBJECT_CLASSES(id)}`).then((res) => {
    return res.data;
  });
};
