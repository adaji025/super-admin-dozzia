import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
} from "../services/event/event";
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
    classId?: string;
  }) => {
    return new Promise((resolve) => {
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
        classroom_id: values.classId,
      })
        .then((res) => {
          showNotification({
            title: "Success",
            message: "Event created successfully.",
            color: "green",
          });
          handleGetEvents(1, 10, "");
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          dispatch(showLoader(false));
        });
    });
  };

  const handleGetEvents = (
    page: number,
    perPage: number,
    search: string,
    classId?: string,
    isClass?: boolean
  ) => {
    return new Promise((resolve) => {
      if (!events) {
        setLoading(true);
      }

      getEvents(page, perPage, search, classId ? classId : "")
        .then((res) => {
          if (isClass) {
            resolve(res);
          } else {
            dispatch(setEvents(res));
          }
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
          dispatch(showLoader(false));
        });
    });
  };

  const handleDeleteEvent = (id: string) => {
    dispatch(showLoader(true));

    deleteEvent(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Event deleted successfully."} 🗓️`,
          color: "green",
        });
        handleGetEvents(1, 10, "");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleUpdateEvent = (
    id: string,
    values: {
      title: string;
      description: string;
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
      visibility: string;
      time: string;
    }
  ) => {
    dispatch(showLoader(true));

    updateEvent(id, {
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
          message: `${"Event updated successfully."} 🗓️`,
          color: "green",
        });
        handleGetEvents(1, 10, "");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  return {
    events,
    loading,
    setLoading,
    handleCreateEvent,
    handleGetEvents,
    handleDeleteEvent,
    handleUpdateEvent,
  };
};

export default useEvent;
