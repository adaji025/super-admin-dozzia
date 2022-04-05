const INITIAL_STATE = {
  userData: null,
  notifications: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload.userData,
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
