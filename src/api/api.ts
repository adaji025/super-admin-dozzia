const api: string = process.env.REACT_APP_API!;

export const APIS = {
  AUTH: {
    LOGIN: `${api}/auth/login`,
    LOGOUT: `${api}/logout`,
  },
  SCHOOL: {
    ONBOARD_SCHOOL: `${api}/schools`,
    LIST_SCHOOL: (perPage: number, page: number, search: string) =>
      `${api}/schools?per_page=${perPage}&page=${page}&${search}`,
  },
};
