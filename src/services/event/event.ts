import { AxiosError } from "axios";
import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createEvent = (data: {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  visibility: string;
  classroom_id?: string;
}) => {
  return AxoisApi.post(`${APIS.EVENT.CREATE_EVENT}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      return err;
    });
};

export const getEvents = (
  page: number,
  perPage: number,
  search: string,
  classId?: string
) => {
  return AxoisApi.get(
    `${APIS.EVENT.GET_EVENTS(page, perPage, search, classId ?? "")}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      return err;
    });
};

export const deleteEvent = (id: string) => {
  return AxoisApi.delete(`${APIS.EVENT.EVENT(id)}`)
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      return err;
    });
};

export const updateEvent = (
  data: {
    title: string;
    description: string;
    start_at: string;
    end_at: string;
    visibility: string;
  },
  id: string
) => {
  return AxoisApi.put(`${APIS.EVENT.EVENT(id)}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      return err;
    });
};
