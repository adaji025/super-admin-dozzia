import { ResponseMeta } from "./utilityTypes";

export type CreateEventData = {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  visibility: string;
  classroom_id?: string;
  image?: File | null;
};

export type GetEventsParams = {
  page: number;
  perPage: number;
  search?: string;
  classId?: string;
};

export type GetEventsResponse = {
  data: EventType[];
  meta: ResponseMeta;
};

export type EventType = {
  event_id: string;
  title: string;
  description: string;
  image: string | null;
  visibility: string;
  status: string;
  start_date: string;
  end_date: string;
  location: string | null;
};
