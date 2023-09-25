export type ResponseMeta = {
  current_page: number;
  last_page: number;
  path: string;
  per_page: number;
  total: number;
};

export type Link = {
  url?: string;
  label: string;
  active: boolean;
};

export type SuccessResponse = {
  message: string;
  status: string;
  code: number;
};

export type ApiResponseType<T> = {
  status_code: number;
  data: T;
  status: string;
  meta: ResponseMeta;
};

export type StateType = {
  name: string;
  state_id: string;
};

export type StaffRoleType = {
  role_id: string;
  name: string;
};
