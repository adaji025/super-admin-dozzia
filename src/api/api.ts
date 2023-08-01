const api: string = process.env.REACT_APP_API!;

export const APIS = {
  AUTH: {
    LOGIN: `${api}/auth/login`,
    FORGOT_PASSWORD: `${api}/auth/request/forgot-password`,
    RESET_PASSWORD: `${api}/auth/verify/reset-password`,
    PROFILE: `${api}/profiles`,
    CHANGE_PASSWORD: `${api}/profiles/change-password`,
    CHANGE_PROFILE_IMAGE: `${api}/picture`,
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
      `${api}/students/${username}/info`,
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
  SUBJECT: {
    SUBJECTS: `${api}/subjects`,
    GET_SUBJECT_LIST: (
      page: number,
      perPage: number,
      search: string,
      staffId: string,
      classId: string
    ) =>
      `${api}/subjects?per_page=${perPage}&page=${page}&staff_id=${staffId}&classroom_id=${classId}&search_query=${search}`,
    SUBJECT: (id: string) => `${api}/subjects/${id}`,
    ASSIGN_CLASS_AND_TEACHER: (id: string) => `${api}/subjects/${id}/assign`,
  },
  EVENT: {
    CREATE_EVENT: `${api}/events`,
    GET_EVENTS: (
      page: number,
      perPage: number,
      search: string,
      classId: string
    ) =>
      `${api}/events?per_page=${perPage}&page=${page}&search_query=${search}&classroom_id=${classId}`,
    EVENT: (id: string) => `${api}/events/${id}`,
  },
  ATTENDANCE: {
    GET_ATTENDANCE: (
      page: number,
      perPage: number,
      date: string,
      search: string
    ) =>
      `${api}/attendance?per_page=${perPage}&page=${page}&date=${date}&search_query=${search}`,
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
    GET_STATS: (date: string) => `${api}/dashboard?specific_date=${date}`,
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
    UPLOAD_STUDY_RESOURCE_FILE: `${api}/study-materials/files`,
    GET_STUDY_RESOURCE_FILES: (id: string) =>
      `${api}/study-materials/files?study_material_id=${id}`,
    DELETE_STUDY_RESOURCE_FILE: (id: string) =>
      `${api}/study_material_files/${id}`,
    STUDY_RESOURCE: `${api}/study-materials`,
    DELETE_STUDY_RESOURCE: (id: string) => `${api}/study-materials/${id}`,
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
  TERMS: {
    ADD_TERM: `${api}/terms`,
    DELETE_TERM: (id: string) => `${api}/terms/${id}`,
    GET_TERMS: (sessionId: string) => `${api}/terms?session_id=${sessionId}`,
  },
  SESSIONS: {
    SESSIONS: `${api}/sessions`,
    DELETE_SESSION: (id: string) => `${api}/sessions/${id}`,
    SET_ACTIVE_SESSION: (sessionId: string) =>
      `${api}/sessions/${sessionId}/set-active`,
  },
  GRADES: {
    GRADES: `${api}/generals/grades`,
    GRADE: (id: string) => `${api}/generals/grades/${id}`,
  },
  TEST_EXAMS: {
    GET_TEST_EXAMS: (classId: string) =>
      `${api}/test-exam-scores?classroom_id=${classId}`,
    POST_TEST_EXAMS: (id: string) => `${api}/test-exam-scores/${id}`,
  },
  REPORT_CARD: {
    GET_ALL_REPORT_CARDS: (
      page: number,
      perPage: number,
      classId: string,
      termId: string,
      sessionId: string
    ) =>
      `${api}/report-cards?per_page=${perPage}&page=${page}&classroom_id=${classId}&term_id=${termId}&session_id=${sessionId}`,
    GET_STUDENT_REPORT_CARD: (termId: string, studentId: string) =>
      `${api}/report-cards/term/${termId}/student/${studentId}`,
    APPROVE_REPORT_CARD: (reportCardId: string) =>
      `${api}/report-cards/${reportCardId}/approve`,
  },
};
