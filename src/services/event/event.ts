import { AxiosError } from "axios";
import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import {
  CreateEventData,
  GetEventsParams,
  GetEventsResponse,
} from "../../types/eventTypes";

export const createEvent = (data: CreateEventData) => {
  return AxoisApi.post(`${APIS.EVENT.CREATE_EVENT}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      return err;
    });
};

export const getEvents = (params: GetEventsParams) => {
  return new Promise<GetEventsResponse>((resolve, reject) => {
    AxoisApi.get(
      `${APIS.EVENT.GET_EVENTS(
        params.page,
        params.perPage,
        params.search ?? "",
        params.classId ?? ""
      )}`
    )
      .then((res: { data: GetEventsResponse }) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
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
