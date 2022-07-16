import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const postTestExams = (
  id: string,
  data: {
    first_ca_score: string;
    second_ca_score: string;
    third_ca_score: string;
    exam_score: string;
    grade_id: string;
  }
) => {
  return AxoisApi.post(`${APIS.TEST_EXAMS.POST_TEST_EXAMS(id)}`, data).then(
    (res) => {
      return res.data;
    }
  );
};

export const getTestExams = (classId: string) => {
  return AxoisApi.get(`${APIS.TEST_EXAMS.GET_TEST_EXAMS(classId)}`).then(
    (res) => {
      return res.data;
    }
  );
};
