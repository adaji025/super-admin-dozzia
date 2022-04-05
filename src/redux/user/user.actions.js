export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: { userData },
});

export const setNotifications = (notifications) => ({
  type: "SET_NOTIFICATIONS",
  payload: { notifications },
});
