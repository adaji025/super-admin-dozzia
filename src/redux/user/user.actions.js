export const setUserData = (userdata) => ({
  type: "SET_USER_DATA",
  payload: { userdata },
});

export const setNotifications = (notifications) => ({
  type: "SET_NOTIFICATIONS",
  payload: { notifications },
});
