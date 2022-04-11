import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getStaffRoleList = () => {
  return AxoisApi.get(`${APIS.LISTS.GET_STAFF_ROLE_LIST}`).then((res) => {
    return res.data;
  });
};

export const onboardStaff = (data: any) => {
  return AxoisApi.post(`${APIS.STAFF.ONBOARD_STAFF}`, data).then((res) => {
    return res.data;
  });
};
