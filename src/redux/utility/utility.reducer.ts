const INITIAL_STATE = {
  showLoader: false,
};

const utilityReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return {
        ...state,
        showLoader: action.payload,
      };
    default:
      return state;
  }
};

export default utilityReducer;
