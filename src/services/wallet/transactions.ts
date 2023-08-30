import { AxiosError } from "axios";
import AxoisApi from "../../api";
import { APIS } from "../../api/api";
import { ApiResponseType } from "../../types/utilityTypes";

export const getTransactions = (page: number, perPage: number) => {
  return new Promise<ApiResponseType<any[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.TRANSACTIONS.TRANSACTIONS(page, perPage)}`)
      .then((res: { data: ApiResponseType<any[]> }) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
