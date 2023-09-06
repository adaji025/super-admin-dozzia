import { TermType } from "../../types/termsSessionsTypes";

export const showLoader = (showLoader: boolean) => ({
  type: "SHOW_LOADER",
  payload: showLoader,
});

export const setActiveTerm = (activeTerm: TermType) => ({
  type: "SET_ACTIVE_TERM",
  payload: activeTerm,
});
