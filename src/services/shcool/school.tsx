import AxoisApi from "../../api";
import { APIS } from "../../api/api";

export const onboardSchool = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.SCHOOL.ONBOARD_SCHOOL}`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getSchoolList = (perPage: number, page: number, search: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SCHOOL.LIST_SCHOOL(perPage, page, search)}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
