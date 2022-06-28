import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createRemark = (data: {
  is_draft: boolean;
  student_id: string;
  category: string;
  description: string;
  published_at: string;
}) => {
  return AxoisApi.post(`${APIS.BEHAVIOURAL_LOG.CREATE_REMARK}`, data).then(
    (res) => {
      return res.data;
    }
  );
};

export const updateRemark = (
  remarkId: string,
  data: {
    is_draft: boolean;
    category: string;
    description: string;
    published_at: string;
  }
) => {
  return AxoisApi.put(`${APIS.BEHAVIOURAL_LOG.REMARK(remarkId)}`, data).then(
    (res) => {
      return res.data;
    }
  );
};

export const deleteRemark = (remarkId: string) => {
  return AxoisApi.delete(`${APIS.BEHAVIOURAL_LOG.REMARK(remarkId)}`).then(
    (res) => {
      return res.data;
    }
  );
};

export const getRemarks = (
  page: number,
  perPage: number,
  studentId: string
) => {
  return AxoisApi.get(
    `${APIS.BEHAVIOURAL_LOG.GET_REMARKS(page, perPage, studentId)}`
  ).then((res) => {
    return res.data;
  });
};

export const postComment = (
  remarkId: string,
  data: {
    content: string;
  }
) => {
  return AxoisApi.post(
    `${APIS.BEHAVIOURAL_LOG.POST_COMMENT(remarkId)}`,
    data
  ).then((res) => {
    return res.data;
  });
};

export const getComments = (
  page: number,
  perPage: number,
  remarkId: string
) => {
  return AxoisApi.get(
    `${APIS.BEHAVIOURAL_LOG.GET_COMMENTS(remarkId, page, perPage)}`
  ).then((res) => {
    return res.data;
  });
};
