import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getConversation = (id: string) => {
  return AxoisApi.get(`${APIS.CONVERSATION.GET_CONVERSATION(id)}`).then(
    (res) => {
      return res.data;
    }
  );
};

export const postConversation = (data: {
  complain_id: string;
  body: string;
}) => {
  return AxoisApi.post(`${APIS.CONVERSATION.POST_CONVERSATION}`, data).then(
    (res) => {
      return res.data;
    }
  );
};
