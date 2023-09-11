import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";

export const getConversation = (id: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.CONVERSATION.GET_CONVERSATION(id)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const postConversation = (data: {
  complain_id: string;
  body: string;
}) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.CONVERSATION.POST_CONVERSATION}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
