import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const addClass = (data: {
  classroom_level: string;
  classroom_name: string;
  classroom_teacher: string;
  classroom_description: string;
}) => {
  return AxoisApi.post(`${APIS.CLASS.CREATE_CLASS}`, data).then((res) => {
    return res.data;
  });
};

export const getClasses = (data: { page: number; perPage: number }) => {
  return AxoisApi.get(
    `${APIS.CLASS.GET_CLASS_LIST(data.page, data.perPage)}`
  ).then((res) => {
    return res.data;
  });
};

export const getClassInfo = (id: string) => {
  return AxoisApi.get(`${APIS.CLASS.CLASS(id)}`).then((res) => {
    return res.data;
  });
};

export const updateClass = (
  id: string,
  data: {
    classroom_level: string;
    classroom_name: string;
    classroom_teacher: string;
    classroom_description: string;
  }
) => {
  return AxoisApi.put(`${APIS.CLASS.CLASS(id)}`, data).then((res) => {
    return res.data;
  });
};

export const getClassStudents = (id: string) => {
  return AxoisApi.get(`${APIS.CLASS.GET_CLASS_STUDENTS(id)}`).then((res) => {
    return res.data;
  });
};
