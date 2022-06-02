import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBroadcastList,
  createBroadcast,
  updateBroadcast,
  deleteBroadcast,
} from "../services/broadcast/broadcast";
import { showNotification } from "@mantine/notifications";
import useNotification from "./useNotification";
import { showLoader } from "../redux/utility/utility.actions";
import { setBroadcast } from "../redux/data/data.actions";
import moment from "moment";

const useBroadcast = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const broadcasts = useSelector((state: any) => {
    return state.data.broadcast;
  });

  const handleCreateBroadcast = (values: {
    title: string;
    summary: string;
    date: string;
    time: string;
    visibility: string;
    image: any;
  }) => {
    dispatch(showLoader(true));

    const data = new FormData();
    data.append("title", values.title);
    data.append("summary", values.summary);
    data.append(
      "published_at",
      `${moment(values.date).format("YYYY-MM-DD")} ${moment(values.time).format(
        "HH:mm"
      )}`
    );
    data.append("visibility", values.visibility);
    if (values.image) {
      data.append("image", values?.image);
    }

    createBroadcast(data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Broadcast created successfully.",
          color: "green",
        });
        handleGetBroadcastList(1, 10);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleGetBroadcastList = (page: number, perPage: number) => {
    if (!broadcasts) {
      setLoading(true);
    }

    getBroadcastList({ page, perPage })
      .then((res) => {
        dispatch(setBroadcast(res));
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteBroadcast = (id: string) => {
    dispatch(showLoader(true));

    deleteBroadcast(id)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Broadcast deleted successfully."}`,
          color: "green",
        });
        handleGetBroadcastList(1, 10);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  const handleUpdateBroadcast = (
    id: string,
    values: {
      title: string;
      summary: string;
      date: string;
      time: string;
      visibility: string;
    }
  ) => {
    dispatch(showLoader(true));

    updateBroadcast(id, {
      title: values.title,
      summary: values.summary,
      published_at: `${moment(values.date).format("YYYY-MM-DD")} ${moment(
        values.time
      ).format("HH:mm")}`,
      visibility: values.visibility,
    })
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Broadcast updated successfully."}`,
          color: "green",
        });
        handleGetBroadcastList(1, 10);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  return {
    handleGetBroadcastList,
    handleCreateBroadcast,
    broadcasts,
    loading,
    setLoading,
    handleDeleteBroadcast,
    handleUpdateBroadcast,
  };
};

export default useBroadcast;
