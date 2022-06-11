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
    DELETE_STAFF: (id: string) => `${api}/staff/${id}`,
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
    GET_SUBJECT_CLASSES: (id: string) => `${api}/subjects/${id}/classrooms`,
  },
  EVENT: {
    CREATE_EVENT: `${api}/events`,
    GET_EVENTS: (page: number, perPage: number) =>
      `${api}/events?per_page=${perPage}&page=${page}`,
    EVENT: (id: string) => `${api}/events/${id}`,
  },
  ATTENDANCE: {
    GET_GENERAL_ATTENDANCE: (page: number, perPage: number, date: string) =>
      `${api}/attendance?per_page=${perPage}&page=${page}&date=${date}`,
    GET_CLASS_ATTENDANCE: (
      page: number,
      perPage: number,
      date: string,
      classId: string
    ) =>
      `${api}/student/attendance?per_page=${perPage}&page=${page}&date=${date}&classroom_id=${classId}`,
    MARK_ATTENDANCE: `${api}/mark/attendance`,
  },
  STATS: {
    GET_STATS: `${api}/stats`,
  },
  BROADCAST: {
    GET_BROADCAST_LIST: (page: number, perPage: number) =>
      `${api}/broadcasts?per_page=${perPage}&page=${page}`,
    BROADCAST: (id: string) => `${api}/broadcasts/${id}`,
    CREATE_BROADCAST: `${api}/broadcasts`,
  },
  REPORTS: {
    GET_REPORTS: `${api}/complains`,
    UPDATE_STATUS: (id: string) => `${api}/complains/${id}`,
  },
  CONVERSATION: {
    GET_CONVERSATION: (id: string) => `${api}/conversations?complain_id=${id}`,
    POST_CONVERSATION: `${api}/conversations`,
  },
  RECYCLE_BIN: {
    LIST_SUSPENDED_STAFF: `${api}/recycle-bin/staff`,
    RESTORE_STAFF: (id: string) => `${api}/recycle-bin/staff/${id}/restore`,
  },
};
