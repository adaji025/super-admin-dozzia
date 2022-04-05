const INITIAL_STATE = {
  data: [],
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default dataReducer;
