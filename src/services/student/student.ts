import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { ApiResponseType } from "../../types/utilityTypes";
import { StudentType } from "../../types/studentTypes";

export const onboardStudent = (data: any) => {
  return AxoisApi.post(`${APIS.STUDENT.ONBOARD_STUDENT}`, data).then((res) => {
    return res.data;
  });
};

export const getStudents = (page: number, perPage: number, search: string) => {
  return new Promise<ApiResponseType<StudentType>>((resolve, reject) => {
    AxoisApi.get(`${APIS.STUDENT.GET_STUDENT_LIST(page, perPage, search)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getStudentDetails = (id: string) => {
  return AxoisApi.get(`${APIS.STUDENT.GET_STUDENT_DETAILS(id)}`).then((res) => {
    return res.data;
  });
};

export const addStudentToClass = (studentId: string, classId: string) => {
  return AxoisApi.get(
    `${APIS.STUDENT.ADD_STUDENT_TO_CLASS(studentId, classId)}`
  ).then((res) => {
    return res.data;
  });
};

export const getStudentWithUsername = (username: string) => {
  return AxoisApi.get(
    `${APIS.STUDENT.GET_STUDENT_WITH_USERNAME(username)}`
  ).then((res) => {
    return res.data;
  });
};
