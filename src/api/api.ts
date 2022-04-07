const api: string = process.env.REACT_APP_API!;

export const APIS = {
  AUTH: {
    LOGIN: `${api}/login`,
    FORGOT_PASSWORD: `${api}/forgot/password`,
    RESET_PASSWORD: `${api}/reset/password`,
  },
  LISTS: {
    GET_STATE_LIST: `${api}/states`,
    GET_MEDICAL_LIST: `${api}/medicals`,
  },
  ADMIN: {
    ONBOARD_STUDENT: `${api}/students`,
  },
};
