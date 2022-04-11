import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const onboardStudent = (data: any) => {
  return AxoisApi.post(`${APIS.STUDENT.ONBOARD_STUDENT}`, data).then((res) => {
    return res.data;
  });
};
