import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";
import { ApiResponseType, StaffRoleType } from "../../types/utilityTypes";
import { AddStaffData, StaffType } from "../../types/staffTypes";

export const getStaffRoleList = () => {
  return new Promise<ApiResponseType<StaffRoleType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.LISTS.GET_STAFF_ROLE_LIST}`)
      .then((res: { data: ApiResponseType<StaffRoleType[]> }) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => reject(err));
  });
};

export const onboardStaff = (data: AddStaffData) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.STAFF.ONBOARD_STAFF}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
export const uploadStaff = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.STAFF.UPLOAD_SATFF}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getStaffList = (data: {
  page: number;
  perPage: number;
  query: string;
  role: string;
}) => {
  return new Promise<ApiResponseType<StaffType[]>>((resolve, reject) => {
    AxoisApi.get(
      `${APIS.STAFF.GET_STAFF_LIST(
        data.page,
        data.perPage,
        data.query,
        data.role
      )}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const deleteStaff = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.STAFF.DELETE_STAFF(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getSuspendedStaff = () => {
  return new Promise<ApiResponseType<StaffType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.RECYCLE_BIN.LIST_SUSPENDED_STAFF}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const restoreSuspendedStaff = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.RECYCLE_BIN.RESTORE_STAFF(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getStaffDetails = (id: string) => {
  return new Promise<ApiResponseType<StaffType>>((resolve, reject) => {
    AxoisApi.get(`${APIS.STAFF.GET_STAFF_DETAILS(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
