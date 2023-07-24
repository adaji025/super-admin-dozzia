import { AxiosError } from "axios";
import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { ApiResponseType, StateType } from "../../types/utilityTypes";

export const getStatesList = () => {
  return new Promise<ApiResponseType<StateType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.LISTS.GET_STATE_LIST}`)
      .then((res: { data: ApiResponseType<StateType[]> }) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
