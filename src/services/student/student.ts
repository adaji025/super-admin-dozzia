import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const onboardStudent = (data: any) => {
  return AxoisApi.post(`${APIS.STUDENT.ONBOARD_STUDENT}`, data).then((res) => {
    return res.data;
  });
};

export const getStudents = (data: { page: number; perPage: number }) => {
  return AxoisApi.get(
    `${APIS.STUDENT.GET_STUDENT_LIST(data.page, data.perPage)}`
  ).then((res) => {
    return res.data;
  });
};
