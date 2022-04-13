import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const addClass = (data: {
  classroom_level: string;
  classroom_name: string;
  classroom_teacher: string;
  classroom_description: string;
}) => {
  return AxoisApi.post(`${APIS.CLASS.CLASS}`, data).then((res) => {
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
  return AxoisApi.get(`${APIS.CLASS.GET_CLASS_INFO(id)}`).then((res) => {
    return res.data;
  });
};
