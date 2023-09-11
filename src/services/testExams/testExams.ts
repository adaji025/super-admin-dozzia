import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";

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
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.TEST_EXAMS.POST_TEST_EXAMS(id)}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const getTestExams = (classId: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.TEST_EXAMS.GET_TEST_EXAMS(classId)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
