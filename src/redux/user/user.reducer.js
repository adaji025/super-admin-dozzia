const INITIAL_STATE = {
  userdata: null,
  notifications: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userdata: action.payload.userdata,
      };
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload.notifications,
      };

    default:
      return state;
  }
};

export default userReducer;
