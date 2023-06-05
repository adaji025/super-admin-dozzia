import { AxiosError } from "axios";
import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import {
  CreateEventData,
  GetEventsParams,
  GetEventsResponse,
} from "../../types/eventTypes";
import { SuccessResponse } from "../../types/utilityTypes";

export const createEvent = (data: CreateEventData) => {
  return new Promise<SuccessResponse>((resolve, reject) => {
    AxoisApi.post(`${APIS.EVENT.CREATE_EVENT}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
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
  return new Promise<SuccessResponse>((resolve, reject) => {
    AxoisApi.delete(`${APIS.EVENT.EVENT(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
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
  return new Promise<SuccessResponse>((resolve, reject) => {
    AxoisApi.put(`${APIS.EVENT.EVENT(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
