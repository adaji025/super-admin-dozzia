const INITIAL_STATE = {
  classes: null,
  students: null,
  subjects: null,
  staff: null,
  events: null,
  attendance: null,
  stats: {
    total_student: 0,
    total_staff: 0,
    total_attendance: 0,
    total_classroom: 0,
    total_present_count: 0,
    total_absent_count: 0,
  },
  broadcast: null,
  reports: null,
  classWall: {
    activeClassName: "",
    activeClassId: "",
    classes: [],
  },
  terms: null,
  sesions: null,
  grades: null,
};

const dataReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SET_CLASSES":
      return {
        ...state,
        classes: action.payload.classes,
      };

    case "SET_STUDENTS":
      return {
        ...state,
        students: action.payload.students,
      };

    case "SET_SUBJECTS":
      return {
        ...state,
        subjects: action.payload.subjects,
      };

    case "SET_STAFF":
      return {
        ...state,
        staff: action.payload.staff,
      };

    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload.events,
      };

    case "SET_ATTENDANCE":
      return {
        ...state,
        attendance: action.payload.attendance,
      };

    case "SET_STATS":
      return {
        ...state,
        stats: action.payload.stats,
      };

    case "SET_BROADCAST":
      return {
        ...state,
        broadcast: action.payload.broadcast,
      };

    case "SET_REPORTS":
      return {
        ...state,
        reports: action.payload.reports,
      };

    case "SET_CLASS_WALL":
      return {
        ...state,
        classWall: action.payload.classWall,
      };

    case "SET_TERMS":
      return {
        ...state,
        terms: action.payload.terms,
      };

    case "SET_SESSIONS":
      return {
        ...state,
        sessions: action.payload.sesions,
      };

    case "SET_GRADES":
      return {
        ...state,
        grades: action.payload.grades,
      };
    default:
      return state;
  }
};

export default dataReducer;
