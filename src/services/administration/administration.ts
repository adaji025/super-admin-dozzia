import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getStatesList = () => {
  return AxoisApi.get(`${APIS.LISTS.GET_STATE_LIST}`).then((res) => {
    return res.data;
  });
};

export const getMedicalList = () => {
  return AxoisApi.get(`${APIS.LISTS.GET_MEDICAL_LIST}`).then((res) => {
    return res.data;
  });
};
