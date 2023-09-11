import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTerm,
  addSession,
  getTerms,
  getSessions,
  setActiveSession,
  deleteTerm,
  deleteSession,
  changeTermStatus,
} from "../services/termsSessions/termsSessions";
import { showNotification } from "@mantine/notifications";
import useNotification from "./useNotification";
import { setActiveTerm, showLoader } from "../redux/utility/utility.actions";
import { setTerms, setSessions } from "../redux/data/data.actions";
import moment from "moment";
import { TermType, SessionType } from "../types/termsSessionsTypes";

const useTermsSessions = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const terms = useSelector((state: { data: { terms: TermType[] } }) => {
    return state.data.terms;
  });

  const sessions = useSelector(
    (state: { data: { sessions: SessionType[] } }) => {
      return state.data.sessions;
    }
  );

  const handleAddTerm = (data: {
    term: string;
    start_date: Date;
    end_date: Date;
  }) => {
    return new Promise((resolve) => {
      setLoading(true);
      const sessionId = getActiveSessionId(sessions);

      addTerm({
        ...data,
        session_id: sessionId,
        start_date: moment(data?.start_date).format("YYYY-MM-DD"),
        end_date: moment(data?.end_date).format("YYYY-MM-DD"),
      })
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Term added successfully.",
            color: "green",
          });
          handleGetTerms(sessionId);
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const getActiveSessionId = (sessions: SessionType[]) => {
    let sessionId = "";

    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i]?.is_current) {
        sessionId = sessions[i]?.session_id;
      }
    }

    return sessionId;
  };

  const handleGetTerms = (sessionId: string) => {
    if (!terms) {
      setLoading(true);
    }

    getTerms(sessionId)
      .then((res: { data: TermType[] }) => {
        dispatch(setTerms(res?.data));

        const term = getActiveTerm(res?.data);

        if (term) {
          dispatch(setActiveTerm(term));
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteTerm = (id: string) => {
    dispatch(showLoader(true));

    deleteTerm(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Term deleted successfully."}`,
          color: "green",
        });
        handleGetSessions();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleChangeTermStatus = (termId: string) => {
    dispatch(showLoader(true));

    changeTermStatus(termId)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Term status changed."}`,
          color: "green",
        });
        handleGetSessions();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleAddSession = (data: { start_year: Date; end_year: Date }) => {
    return new Promise((resolve) => {
      setLoading(true);

      addSession({
        ...data,
        start_year: moment(data?.start_year).format("YYYY"),
        end_year: moment(data?.end_year).format("YYYY"),
      })
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Session added successfully.",
            color: "green",
          });
          resolve(res);
          handleGetSessions();
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleGetSessions = () => {
    if (!sessions) {
      setLoading(true);
    }

    getSessions()
      .then((res: { data: SessionType[] }) => {
        dispatch(setSessions(res.data));
        const sessionId = getActiveSessionId(res?.data);
        handleGetTerms(sessionId);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteSession = (id: string) => {
    dispatch(showLoader(true));

    deleteSession(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Session deleted successfully."}`,
          color: "green",
        });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleSetActiveSession = (id: string) => {
    dispatch(showLoader(true));

    setActiveSession(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Session set as active."}`,
          color: "green",
        });

        handleGetSessions();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const getActiveTerm: (termsData?: TermType[]) => TermType | undefined = (
    termsData?: TermType[]
  ) => {
    const activeTerm = (termsData ? termsData : terms).find(
      (term: TermType) => term.is_current
    );
    return activeTerm;
  };

  return {
    handleAddTerm,
    handleGetTerms,
    handleDeleteTerm,
    loading,
    setLoading,
    handleAddSession,
    handleGetSessions,
    handleDeleteSession,
    handleSetActiveSession,
    sessions,
    terms,
    getActiveTerm,
    handleChangeTermStatus,
  };
};

export default useTermsSessions;
