export const setClasses = (classes: any) => ({
  type: "SET_CLASSES",
  payload: { classes },
});

export const setStudents = (students: any) => ({
  type: "SET_STUDENTS",
  payload: { students },
});

export const setSubjects = (subjects: any) => ({
  type: "SET_SUBJECTS",
  payload: { subjects },
});

export const setStaff = (staff: any) => ({
  type: "SET_STAFF",
  payload: { staff },
});

export const setEvents = (events: any) => ({
  type: "SET_EVENTS",
  payload: { events },
});

export const setAttendance = (attendance: any) => ({
  type: "SET_ATTENDANCE",
  payload: { attendance },
});

export const setStats = (stats: any) => ({
  type: "SET_STATS",
  payload: { stats },
});

export const setBroadcast = (broadcast: any) => ({
  type: "SET_BROADCAST",
  payload: { broadcast },
});
