import AxoisApi from "../../api";
import { APIS } from "../../api/api";
import { UpdateSchoolTypes } from "../../types/schoolTypes";

export const onboardSchool = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.SCHOOL.ONBOARD_SCHOOL, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getSchoolList = (
  perPage: number,
  page: number,
  search: string
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(APIS.SCHOOL.LIST_SCHOOL(perPage, page, search))
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteSchool = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(APIS.SCHOOL.SINGLE_SCHOOL(id))
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateSchool = (id: string, data: UpdateSchoolTypes) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(APIS.SCHOOL.SINGLE_SCHOOL(id), data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const restoreSchool = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SCHOOL.SINGLE_SCHOOL(id)}/restore`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
