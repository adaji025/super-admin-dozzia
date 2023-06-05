export type ResponseMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Link = {
  url?: string;
  label: string;
  active: boolean;
};

export const initialMetadata = {
  current_page: 0,
  from: 0,
  last_page: 0,
  links: [],
  path: "",
  per_page: 10,
  to: 0,
  total: 0,
};
