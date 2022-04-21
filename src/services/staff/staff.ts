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

export const getStaffList = (data: {
  page: number;
  perPage: number;
  query: string;
  role: string;
}) => {
  return AxoisApi.get(
    `${APIS.STAFF.GET_STAFF_LIST(
      data.page,
      data.perPage,
      data.query,
      data.role
    )}`
  ).then((res) => {
    return res.data;
  });
};

export const deleteStaff = (id: string) => {
  return AxoisApi.delete(`${APIS.STAFF.DELETE_STAFF(id)}`).then((res) => {
    return res.data;
  });
};
