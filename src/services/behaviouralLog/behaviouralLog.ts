import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";
import { ApiResponseType } from "../../types/utilityTypes";
import { BehavioralLogRemarkType } from "../../types/behaviouralLogTypes";

export const createRemark = (data: {
  is_draft: boolean;
  student_id: string;
  category: string;
  description: string;
  published_at: string;
}) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.BEHAVIOURAL_LOG.CREATE_REMARK}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
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
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.BEHAVIOURAL_LOG.REMARK(remarkId)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const deleteRemark = (remarkId: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.delete(`${APIS.BEHAVIOURAL_LOG.REMARK(remarkId)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getRemarks = (
  page: number,
  perPage: number,
  studentId: string
) => {
  return new Promise<ApiResponseType<BehavioralLogRemarkType[]>>(
    (resolve, reject) => {
      AxoisApi.get(
        `${APIS.BEHAVIOURAL_LOG.GET_REMARKS(page, perPage, studentId)}`
      )
        .then((res) => {
          resolve(res.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    }
  );
};

export const postComment = (
  remarkId: string,
  data: {
    content: string;
  }
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.BEHAVIOURAL_LOG.POST_COMMENT(remarkId)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getComments = (
  page: number,
  perPage: number,
  studentId: string,
  remarkId: string
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.BEHAVIOURAL_LOG.GET_COMMENTS(page, perPage, studentId, remarkId)}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
