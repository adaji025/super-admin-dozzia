import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getReports = (page: number, perPage: number, status: string) => {
  return AxoisApi.get(
    `${APIS.REPORTS.GET_REPORTS}?per_page=${perPage}&page=${page}&status=${status}`
  ).then((res) => {
    return res.data;
  });
};

export const updateStatus = (
  id: string,
  data: {
    status: string;
  }
) => {
  return AxoisApi.put(`${APIS.REPORTS.UPDATE_STATUS(id)}`, data).then((res) => {
    return res.data;
  });
};
