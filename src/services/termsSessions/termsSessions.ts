import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const addTerm = (data: {
  session_id: string;
  term: string;
  start_date: string;
  end_date: string;
}) => {
  return AxoisApi.post(`${APIS.TERMS.ADD_TERM}`, data).then((res) => {
    return res.data;
  });
};

export const getTerms = (sessionId: string) => {
  return AxoisApi.get(`${APIS.TERMS.GET_TERMS(sessionId)}`).then((res) => {
    return res.data;
  });
};

export const deleteTerm = (id: string) => {
  return AxoisApi.delete(`${APIS.TERMS.DELETE_TERM(id)}`).then((res) => {
    return res.data;
  });
};

export const addSession = (data: { start_year: string; end_year: string }) => {
  return AxoisApi.post(`${APIS.SESSIONS.SESSIONS}`, data).then((res) => {
    return res.data;
  });
};

export const getSessions = () => {
  return AxoisApi.get(`${APIS.SESSIONS.SESSIONS}`).then((res) => {
    return res.data;
  });
};

export const setActiveSession = (sessionId: string) => {
  return AxoisApi.get(`${APIS.SESSIONS.SET_ACTIVE_SESSION(sessionId)}`).then(
    (res) => {
      return res.data;
    }
  );
};

export const deleteSession = (id: string) => {
  return AxoisApi.delete(`${APIS.SESSIONS.DELETE_SESSION(id)}`).then((res) => {
    return res.data;
  });
};
