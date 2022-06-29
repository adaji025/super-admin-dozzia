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
    GET_CLASS_LIST: (page: number, perPage: number, staffId?: string) =>
      `${api}/classrooms?per_page=${perPage}&page=${page}&staff_id=${
        staffId ?? ""
      }`,
    CLASS: (id: string) => `${api}/classrooms/${id}`,
    GET_CLASS_STUDENTS: (id: string, page: number, perPage: number) =>
      `${api}/classrooms/${id}/students?per_page=${perPage}&page=${page}`,
    ADD_MULTIPLE_STUDENTS_TO_CLASS: (classId: string) =>
      `${api}/classrooms/${classId}/students`,
  },
  SUBJECT: {
    SUBJECTS: `${api}/subjects`,
    GET_SUBJECT_LIST: (
      page: number,
      perPage: number,
      staffId: string,
      classId: string
    ) =>
      `${api}/subjects?per_page=${perPage}&page=${page}&staff_id=${staffId}&classroom_id=${classId}`,
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
  STUDY_RESOURCES: {
    UPLOAD_STUDY_RESOURCE_FILE: `${api}/study-resource-files`,
    GET_STUDY_RESOURCE_FILES: (id: string) =>
      `${api}/study-resource-files?study_resource_id=${id}`,
    DELETE_STUDY_RESOURCE_FILE: (id: string) =>
      `${api}/study-resource-files/${id}`,
    STUDY_RESOURCE: `${api}/study-resources`,
    DELETE_STUDY_RESOURCE: (id: string) => `${api}/study-resources/${id}`,
  },
  ACADEMIC_LOG: {
    CREATE_TASK: `${api}/tasks`,
    LIST_TASKS: (
      page: number,
      perPage: number,
      classroomId: string,
      subjectId: string
    ) =>
      `${api}/tasks?classroom_id=${classroomId}&per_page=${perPage}&page=${page}&subject_id=${subjectId}`,
    GET_TASK_RESPONSES: (page: number, perPage: number, taskId: string) =>
      `${api}/tasks/${taskId}/response?per_page=${perPage}&page=${page}`,
    GRADE_TASK_RESPONSE: `${api}/tasks/grading/response`,
  },
  BEHAVIOURAL_LOG: {
    CREATE_REMARK: `${api}/remarks`,
    REMARK: (id: string) => `${api}/remarks/${id}`,
    GET_REMARKS: (page: number, perPage: number, studentId: string) =>
      `${api}/remarks?per_page=${perPage}&page=${page}&student_id=${studentId}`,
    POST_COMMENT: (id: string) => `${api}/remarks/${id}/comments`,
    GET_COMMENTS: (id: string, page: number, perPage: number) =>
      `${api}/remarks/${id}/comments?per_page=${perPage}&page=${page}`,
  },
  CURRICULUM: {
    CREATE_CURRICULUM_ITEM: `${api}/curricula`,
    UPDATE_CURRICULUM: (id: string) => `${api}/curricula/${id}`,
    GET_CURRICULUM_LIST: (
      page: number,
      perPage: number,
      subjectId: string,
      classroomId: string
    ) =>
      `${api}/curricula?per_page=${perPage}&page=${page}&subject_id=${subjectId}&classroom_id=${classroomId}`,
  },
};
