import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";

export const createBroadcast = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.BROADCAST.CREATE_BROADCAST}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getBroadcastList = (data: { page: number; perPage: number }) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.BROADCAST.GET_BROADCAST_LIST(data.page, data.perPage)}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const deleteBroadcast = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.BROADCAST.BROADCAST(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const updateBroadcast = (
  id: string,
  data: {
    title: string;
    summary: string;
    published_at: string;
    visibility: string;
  }
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.BROADCAST.BROADCAST(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
