import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";

export const getReports = (page: number, perPage: number, status: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.REPORTS.GET_REPORTS}?per_page=${perPage}&page=${page}&status=${status}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const updateStatus = (
  id: string,
  data: {
    status: string;
  }
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.REPORTS.UPDATE_STATUS(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
