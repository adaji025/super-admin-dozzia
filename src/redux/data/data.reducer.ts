import { initialMetadata } from "../../lib/util";


export const initialArrayDataState = {
  data: [],
  meta: initialMetadata,
  dataFetched: false,
};

export type DataState = {
  classes: any;
  students: any;
  subjects: any;
  staff: any;
  events: any;
  eventsDashboard: any;
  attendance: any;
  broadcast: any;
  reports: any;
  reportsDashboard: any;
  classWall: any;
  terms: any[];
  sessions: any[];
  grades: any;
  bills: any;
  wallet: any | null;
};

const INITIAL_STATE: DataState = {
  classes: initialArrayDataState,
  students: initialArrayDataState,
  subjects: initialArrayDataState,
  staff: initialArrayDataState,
  events: null,
  eventsDashboard: null,
  attendance: null,
  broadcast: null,
  reports: null,
  reportsDashboard: null,
  classWall: {
    activeClassName: "",
    activeClassId: "",
    classTeacherId: "",
    classes: [],
  },
  terms: [],
  sessions: [],
  grades: null,
  bills: initialArrayDataState,
  wallet: null,
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

    case "SET_EVENTS_DASHBOARD":
      return {
        ...state,
        eventsDashboard: action.payload.eventsDashboard,
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

    case "SET_REPORTS_DASHBOARD":
      return {
        ...state,
        reportsDashboard: action.payload.reportsDashboard,
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

    case "SET_BILLS":
      return {
        ...state,
        bills: action.payload.bills,
      };

    case "SET_WALLET":
      return {
        ...state,
        wallet: action.payload.wallet,
      };
    default:
      return state;
  }
};

export default dataReducer;
