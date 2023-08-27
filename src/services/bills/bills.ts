import { AxiosError } from "axios";
import AxoisApi from "../../api";
import { APIS } from "../../api/api";
import { BillType, CreateBillData } from "../../types/billsTypes";
import { ApiResponseType } from "../../types/utilityTypes";

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
  return new Promise<ApiResponseType<BillType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.BILLS.BILLS(page, perPage)}`)
      .then((res: { data: ApiResponseType<BillType[]> }) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
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
    AxoisApi.put(APIS.BILLS.BILL(id))
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
    AxoisApi.delete(APIS.BILLS.BILL(id))
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
