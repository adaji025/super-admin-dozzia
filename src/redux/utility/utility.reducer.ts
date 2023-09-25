const INITIAL_STATE = {
  showLoader: false,
  activeTerm: null,
};

const utilityReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return {
        ...state,
        showLoader: action.payload,
      };

    case "SET_ACTIVE_TERM":
      return {
        ...state,
        activeTerm: action.payload,
      };

    default:
      return state;
  }
};

export default utilityReducer;
