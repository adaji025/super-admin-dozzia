import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { GetMetricsResponse } from "../../types/metricsTypes";

export const getMetrics = (date: string) => {
  return new Promise<GetMetricsResponse>((resolve, reject) => {
    AxoisApi.get(`${APIS.STATS.GET_STATS(date)}`)
      .then((res: { data: { data: GetMetricsResponse } }) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
