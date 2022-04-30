import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createEvent = (data: {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  visibility: string;
}) => {
  return AxoisApi.post(`${APIS.EVENT.EVENTS}`, data).then((res) => {
    return res.data;
  });
};

export const getEvents = () => {
  return AxoisApi.get(`${APIS.EVENT.EVENTS}`).then((res) => {
    return res.data;
  });
};
