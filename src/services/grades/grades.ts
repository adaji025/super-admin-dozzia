import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { CreateGradeData } from "../../types/gradeTypes";
import { AxiosError } from "axios";

export const addGrade = (data: CreateGradeData) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.GRADES.GRADES}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getGrades = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.GRADES.GRADES}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const deleteGrade = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.GRADES.GRADE(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const updateGrade = (data: CreateGradeData, id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.GRADES.GRADE(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const updateRemark = (
  id: string,
  data: {
    remark: string;
  }
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.GRADES.GRADE(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
