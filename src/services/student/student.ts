import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { ApiResponseType } from "../../types/utilityTypes";
import { StudentType } from "../../types/studentTypes";
import { AxiosError } from "axios";

export const onboardStudent = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.STUDENT.ONBOARD_STUDENT}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getStudents = (page: number, perPage: number, search: string) => {
  return new Promise<ApiResponseType<StudentType>>((resolve, reject) => {
    AxoisApi.get(`${APIS.STUDENT.GET_STUDENT_LIST(page, perPage, search)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getStudentDetails = (id: string) => {
  return new Promise<ApiResponseType<StudentType>>((resolve, reject) => {
    AxoisApi.get(`${APIS.STUDENT.GET_STUDENT_DETAILS(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const addStudentToClass = (studentId: string, classId: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.STUDENT.ADD_STUDENT_TO_CLASS(studentId, classId)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getStudentWithUsername = (username: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.STUDENT.GET_STUDENT_WITH_USERNAME(username)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
