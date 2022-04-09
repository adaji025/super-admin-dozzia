const api: string = process.env.REACT_APP_API!;

export const APIS = {
  AUTH: {
    LOGIN: `${api}/login`,
    FORGOT_PASSWORD: `${api}/forgot/password`,
    RESET_PASSWORD: `${api}/reset/password`,
    UPDATE_PROFILE: `${api}/profile`,
    CHANGE_PASSWORD: `${api}/change/password`,
    LOGOUT: `${api}/logout`,
  },
  LISTS: {
    GET_STATE_LIST: `${api}/states`,
    GET_MEDICAL_LIST: `${api}/medicals`,
    GET_STAFF_ROLE_LIST: `${api}/roles`,
  },
  ADMIN: {
    ONBOARD_STUDENT: `${api}/students`,
    ONBOARD_STAFF: `${api}/staff`,
  },
};
