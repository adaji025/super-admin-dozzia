import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getGeneralAttendance = (
  page: number,
  perPage: number,
  date: string
) => {
  return AxoisApi.get(
    `${APIS.ATTENDANCE.GET_GENERAL_ATTENDANCE(page, perPage, date)}`
  ).then((res) => {
    return res.data;
  });
};

export const getClassAttendance = (
  page: number,
  perPage: number,
  date: string,
  classId: string
) => {
  return AxoisApi.get(
    `${APIS.ATTENDANCE.GET_CLASS_ATTENDANCE(page, perPage, date, classId)}`
  ).then((res) => {
    return res.data;
  });
};

export const markAttendance = (data: any) => {
  return AxoisApi.post(`${APIS.ATTENDANCE.MARK_ATTENDANCE}`, data).then(
    (res) => {
      return res.data;
    }
  );
};
