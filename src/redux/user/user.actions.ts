import { ProfileType } from "../../types/authTypes";

export const setUserData = (userdata: ProfileType) => ({
  type: "SET_USER_DATA",
  payload: { userdata },
});

export const setNotifications = (notifications: any) => ({
  type: "SET_NOTIFICATIONS",
  payload: { notifications },
});
