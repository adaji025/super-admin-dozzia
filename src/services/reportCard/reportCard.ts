import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getAllReportCards = (
  page: number,
  perPage: number,
  classId: string,
  termId: string,
  sessionId: string
) => {
  return AxoisApi.get(
    `${APIS.REPORT_CARD.GET_ALL_REPORT_CARDS(
      page,
      perPage,
      classId,
      termId,
      sessionId
    )}`
  ).then((res) => {
    return res.data;
  });
};

export const getStudentReportCard = (termId: string, studentId: string) => {
  return AxoisApi.get(
    `${APIS.REPORT_CARD.GET_STUDENT_REPORT_CARD(termId, studentId)}`
  ).then((res) => {
    return res.data;
  });
};

export const approveReportCard = (reportCardId: string) => {
  return AxoisApi.get(
    `${APIS.REPORT_CARD.APPROVE_REPORT_CARD(reportCardId)}`
  ).then((res) => {
    return res.data;
  });
};
