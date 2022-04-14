const api: string = process.env.REACT_APP_API!;

export const APIS = {
  AUTH: {
    LOGIN: `${api}/login`,
    FORGOT_PASSWORD: `${api}/forgot/password`,
    RESET_PASSWORD: `${api}/reset/password`,
    PROFILE: `${api}/profile`,
    CHANGE_PASSWORD: `${api}/change/password`,
    CHANGE_PROFILE_IMAGE: `${api}/picture`,
    LOGOUT: `${api}/logout`,
  },
  LISTS: {
    GET_STATE_LIST: `${api}/states`,
    GET_MEDICAL_LIST: `${api}/medicals`,
    GET_STAFF_ROLE_LIST: `${api}/roles`,
  },
  STAFF: {
    ONBOARD_STAFF: `${api}/staff`,
    GET_STAFF_LIST: (
      page: number,
      perPage: number,
      query: string,
      role: string
    ) =>
      `${api}/staff?per_page=${perPage}&page=${page}&search_query=${query}&role=${role}`,
  },
  STUDENT: {
    ONBOARD_STUDENT: `${api}/students`,
  },
  CLASS: {
    CREATE_CLASS: `${api}/classrooms`,
    GET_CLASS_LIST: (page: number, perPage: number) =>
      `${api}/classrooms?per_page=${perPage}&page=${page}`,
    CLASS: (id: string) => `${api}/classrooms/${id}`,
  },
  SUBJECT: {
    SUBJECTS: `${api}/subjects`,
    GET_SUBJECT_LIST: (page: number, perPage: number) =>
      `${api}/subjects?per_page=${perPage}&page=${page}`,
    SUBJECT: (id: string) => `${api}/subjects/${id}`,
  },
};
