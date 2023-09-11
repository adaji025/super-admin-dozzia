import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";

export const getAllReportCards = (
  page: number,
  perPage: number,
  classId: string,
  termId: string,
  sessionId: string
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.REPORT_CARD.GET_ALL_REPORT_CARDS(
        page,
        perPage,
        classId,
        termId,
        sessionId
      )}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getStudentReportCard = (termId: string, studentId: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(
      `${APIS.REPORT_CARD.GET_STUDENT_REPORT_CARD(termId, studentId)}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const approveReportCard = (reportCardId: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.REPORT_CARD.APPROVE_REPORT_CARD(reportCardId)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
