import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createEvent = (data: {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  visibility: string;
}) => {
  return AxoisApi.post(`${APIS.EVENT.CREATE_EVENT}`, data).then((res) => {
    return res.data;
  });
};

export const getEvents = (data: { page: number; perPage: number }) => {
  return AxoisApi.get(`${APIS.EVENT.GET_EVENTS(data.page, data.perPage)}`).then(
    (res) => {
      return res.data;
    }
  );
};
