import { AxiosError } from "axios";
import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import {
  ApiResponseType,
  MedicalType,
  StateType,
} from "../../types/utilityTypes";

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

export const getMedicalList = () => {
  return new Promise<ApiResponseType<MedicalType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.LISTS.GET_MEDICAL_LIST}`)
      .then((res: { data: ApiResponseType<MedicalType[]> }) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
