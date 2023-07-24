import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";
import {
  GetGeneralAttendanceResponse,
  GetClassAttendanceResponse,
} from "../../types/attendanceTypes";
import { SuccessResponse } from "../../types/utilityTypes";

export const getGeneralAttendance = (
  page: number,
  perPage: number,
  date: string,
  search: string
) => {
  return new Promise<GetGeneralAttendanceResponse>((resolve, reject) => {
    AxoisApi.get(APIS.ATTENDANCE.GET_ATTENDANCE(page, perPage, date, search))
      .then((res: { data: GetGeneralAttendanceResponse }) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getClassAttendance = (
  page: number,
  perPage: number,
  date: string,
  classId: string
) => {
  return new Promise<GetClassAttendanceResponse>((resolve, reject) => {
    AxoisApi.get(
      APIS.ATTENDANCE.GET_CLASS_ATTENDANCE(page, perPage, date, classId)
    )
      .then((res: { data: GetClassAttendanceResponse }) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const markAttendance = (data: any) => {
  return new Promise<SuccessResponse>((resolve, reject) => {
    AxoisApi.post(APIS.ATTENDANCE.MARK_ATTENDANCE, data)
      .then((res: { data: SuccessResponse }) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
