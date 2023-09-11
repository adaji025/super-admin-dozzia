import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";
import { ApiResponseType } from "../../types/utilityTypes";
import { SessionType, TermType } from "../../types/termsSessionsTypes";

export const addTerm = (data: {
  session_id: string;
  term: string;
  start_date: string;
  end_date: string;
}) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.TERMS.ADD_TERM}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getTerms = (sessionId: string) => {
  return new Promise<ApiResponseType<TermType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.TERMS.GET_TERMS(sessionId)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const deleteTerm = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.TERMS.DELETE_TERM(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const changeTermStatus = (termId: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.TERMS.CHANGE_TERM_STATUS(termId)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const addSession = (data: { start_year: string; end_year: string }) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.SESSIONS.SESSIONS}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getSessions = () => {
  return new Promise<ApiResponseType<SessionType[]>>((resolve, reject) => {
    AxoisApi.get(`${APIS.SESSIONS.SESSIONS}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const setActiveSession = (sessionId: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.SESSIONS.SET_ACTIVE_SESSION(sessionId)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const deleteSession = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.SESSIONS.DELETE_SESSION(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
