const INITIAL_STATE = {
  classes: null,
  students: null,
  subjects: null,
  staff: null,
  events: null,
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

    default:
      return state;
  }
};

export default dataReducer;
