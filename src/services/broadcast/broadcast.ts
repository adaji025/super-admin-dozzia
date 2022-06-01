import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createBroadcast = (data: any) => {
  return AxoisApi.post(`${APIS.BROADCAST.CREATE_BROADCAST}`, data).then(
    (res) => {
      return res.data;
    }
  );
};

export const getBroadcastList = (data: { page: number; perPage: number }) => {
  return AxoisApi.get(
    `${APIS.BROADCAST.GET_BROADCAST_LIST(data.page, data.perPage)}`
  ).then((res) => {
    return res.data;
  });
};

export const deleteBroadcast = (id: string) => {
  return AxoisApi.delete(`${APIS.BROADCAST.BROADCAST(id)}`).then((res) => {
    return res.data;
  });
};

export const getBroadcastItem = (id: string) => {
  return AxoisApi.get(`${APIS.BROADCAST.BROADCAST(id)}`).then((res) => {
    return res.data;
  });
};

export const updateBroadcast = (
  id: string,
  data: {
    title: string;
    summary: string;
    published_at: string;
    visibility: string;
    image: any;
  }
) => {
  return AxoisApi.put(`${APIS.BROADCAST.BROADCAST(id)}`, data).then((res) => {
    return res.data;
  });
};
