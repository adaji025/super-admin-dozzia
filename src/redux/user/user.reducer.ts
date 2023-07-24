import { AnyAction } from "redux";
import { ProfileType } from "../../types/authTypes";

export type UserState = {
  userdata: ProfileType;
  notifications: any[];
  loggedIn: boolean;
};

const INITIAL_STATE: UserState = {
  userdata: {
    staff_id: "",
    username: "",
    email: "",
    title: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    address: "",
    phone_number: null,
    meta: null,
    guarantor: null,
    relative: null,
    picture: "",
    role: {
      role_id: "",
      name: "",
    },
    school: {
      school_id: "",
      name: "",
      logo: "",
      address: null,
      email: "",
      postal_code: "",
    },
  },
  notifications: [],
  loggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userdata: action.payload.userdata,
        loggedIn: true,
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
