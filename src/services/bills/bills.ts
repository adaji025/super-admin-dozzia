import { AxiosError } from "axios";
import AxoisApi from "../../api";
import { APIS } from "../../api/api";
import { CreateBillData } from "../../types/billsTypes";

export const createBill = (data: CreateBillData) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.BILLS.CREATE_BILL, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getBills = (page: number, perPage: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.BILLS.BILLS(page, perPage)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getBill = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.BILLS.BILL(id)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const updateBill = (id: string, data: CreateBillData) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.BILLS.BILL(id)}, data)`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteBill = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.BILLS.BILL(id)}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
