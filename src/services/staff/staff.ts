import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getStaffRoleList = () => {
  return AxoisApi.get(`${APIS.LISTS.GET_STAFF_ROLE_LIST}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

export const onboardStaff = (data: any) => {
  return AxoisApi.post(`${APIS.STAFF.ONBOARD_STAFF}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
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
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

export const deleteStaff = (id: string) => {
  return AxoisApi.delete(`${APIS.STAFF.DELETE_STAFF(id)}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

export const getSuspendedStaff = () => {
  return AxoisApi.get(`${APIS.RECYCLE_BIN.LIST_SUSPENDED_STAFF}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

export const restoreSuspendedStaff = (id: string) => {
  return AxoisApi.get(`${APIS.RECYCLE_BIN.RESTORE_STAFF(id)}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

export const getStaffDetails = (id: string) => {
  return AxoisApi.get(`${APIS.STAFF.GET_STAFF_DETAILS(id)}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
