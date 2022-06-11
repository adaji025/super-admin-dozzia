import { useState } from "react";
import {
  getConversation,
  postConversation,
} from "../services/conversation/conversation";

import useNotification from "./useNotification";

const useConversation = (id: string) => {
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetConversation = () => {
    return new Promise((resolve) => {
      setLoading(true);
      getConversation(id)
        .then((res) => {
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

  const handlePostConversation = (text: string) => {
    return new Promise((resolve) => {
      setLoading(true);
      postConversation({ complain_id: id, body: text })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          handleError(error);
          setLoading(false);
        });
    });
  };

  return {
    loading,
    setLoading,
    handleGetConversation,
    handlePostConversation,
  };
};

export default useConversation;
