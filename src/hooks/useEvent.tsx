import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { createEvent, getEvents } from "../services/event/event";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setEvents } from "../redux/data/data.actions";
import moment from "moment";

const useEvent = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const events = useSelector((state: any) => {
    return state.data.events;
  });

  const handleCreateEvent = (values: {
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    visibility: string;
    time: string;
  }) => {
    dispatch(showLoader(true));

    createEvent({
      title: values.title,
      description: values.description,
      start_at: `${moment(values.startDate).format("YYYY-MM-DD")} ${moment(
        values.startTime
      ).format("HH:mm:ss")}`,
      end_at: `${moment(values.endDate).format("YYYY-MM-DD")} ${moment(
        values.endTime
      ).format("HH:mm:ss")}`,
      visibility: values.visibility,
    })
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Event created successfully.",
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

  const handleGetEvents = () => {
    if (!events) {
      dispatch(showLoader(true));
    }

    getEvents()
      .then((res) => {
        setLoading(false);
        dispatch(setEvents(res));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        dispatch(showLoader(false));
      });
  };
  return {
    events,
    loading,
    setLoading,
    handleCreateEvent,
    handleGetEvents,
  };
};

export default useEvent;
