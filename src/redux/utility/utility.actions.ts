
export const showLoader = (showLoader: boolean) => ({
  type: "SHOW_LOADER",
  payload: showLoader,
});

export const setActiveTerm = (activeTerm: any) => ({
  type: "SET_ACTIVE_TERM",
  payload: activeTerm,
});
