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
    GET_STUDENT_LIST: (page: number, perPage: number) =>
      `${api}/students?per_page=${perPage}&page=${page}`,
    ADD_STUDENT_TO_CLASS: (studentId: string, classId: string) =>
      `${api}/students/${studentId}/classroom/${classId}`,
    GET_STUDENT_WITH_USERNAME: (username: string) =>
      `${api}/students/${username}/info`,
  },
  CLASS: {
    CREATE_CLASS: `${api}/classrooms`,
    GET_CLASS_LIST: (page: number, perPage: number) =>
      `${api}/classrooms?per_page=${perPage}&page=${page}`,
    CLASS: (id: string) => `${api}/classrooms/${id}`,
    GET_CLASS_STUDENTS: (id: string) => `${api}/classrooms/${id}/students`,
    ADD_MULTIPLE_STUDENTS_TO_CLASS: (classId: string) =>
      `${api}/classrooms/${classId}/students`,
  },
  SUBJECT: {
    SUBJECTS: `${api}/subjects`,
    GET_SUBJECT_LIST: (page: number, perPage: number) =>
      `${api}/subjects?per_page=${perPage}&page=${page}`,
    SUBJECT: (id: string) => `${api}/subjects/${id}`,
    ASSIGN_CLASS_AND_TEACHER: (id: string) => `${api}/subjects/${id}/assign`,
  },
};
