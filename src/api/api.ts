const api: string = process.env.REACT_APP_API!;

export const APIS = {
  AUTH: {
    LOGIN: `${api}/auth/login`,
    LOGOUT: `${api}/logout`,
  },
  LISTS: {
    GET_STATE_LIST: `${api}/generals/states`,
    GET_STAFF_ROLE_LIST: `${api}/generals/roles`,
  },
  STAFF: {
    ONBOARD_STAFF: `${api}/staff`,
    GET_STAFF_LIST: (
      page: number,
      perPage: number,
      search: string,
      role: string
    ) =>
      `${api}/staff?per_page=${perPage}&page=${page}&search_query=${search}&role=${role}`,
    GET_STAFF_DETAILS: (id: string) => `${api}/staff/${id}`,
    DELETE_STAFF: (id: string) => `${api}/staff/${id}`,
  },
  STUDENT: {
    ONBOARD_STUDENT: `${api}/students`,
    GET_STUDENT_LIST: (page: number, perPage: number, search: string) =>
      `${api}/students?per_page=${perPage}&page=${page}&search_query=${search}`,
    ADD_STUDENT_TO_CLASS: (studentId: string, classId: string) =>
      `${api}/students/${studentId}/classroom/${classId}`,
    GET_STUDENT_WITH_USERNAME: (username: string) =>
      `${api}/student/reg-no/info?registration_number=${username}`,
    GET_STUDENT_DETAILS: (id: string) => `${api}/students/${id}`,
  },
  CLASS: {
    CREATE_CLASS: `${api}/classrooms`,
    GET_CLASS_LIST: (
      page: number,
      perPage: number,
      level: string,
      search: string,
      staffId?: string,
      subjectId?: string
    ) =>
      `${api}/classrooms?per_page=${perPage}&page=${page}&staff_id=${
        staffId ?? ""
      }&level=${level}&search_query=${search}${
        subjectId ? `&subject_id=${subjectId}` : ""
      }`,
    CLASS: (id: string) => `${api}/classrooms/${id}`,
    GET_CLASS_STUDENTS: (id: string, page: number, perPage: number) =>
      `${api}/classrooms/${id}/students?per_page=${perPage}&page=${page}`,
    ADD_MULTIPLE_STUDENTS_TO_CLASS: (classId: string) =>
      `${api}/classrooms/${classId}/students`,
  },
  SCHOOL: {
    ONBOARD_SCHOOL: `${api}/schools`,
  }
};
