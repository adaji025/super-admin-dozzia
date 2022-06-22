import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createTask = (data: {
  title: string;
  description: string;
  subject_id: string;
  classroom_id: string;
  end_at: string;
  document: any;
  link: string;
}) => {
  return AxoisApi.post(`${APIS.ACADEMIC_LOG.CREATE_TASK}`, data).then((res) => {
    return res.data;
  });
};

export const getTasks = (
  page: number,
  perPage: number,
  classroomId: string,
  subjectId: string
) => {
  return AxoisApi.get(
    `${APIS.ACADEMIC_LOG.LIST_TASKS(page, perPage, classroomId, subjectId)}`
  ).then((res) => {
    return res.data;
  });
};

export const getTaskResponses = (
  page: number,
  perPage: number,
  taskId: string
) => {
  return AxoisApi.get(
    `${APIS.ACADEMIC_LOG.GET_TASK_RESPONSES(page, perPage, taskId)}`
  ).then((res) => {
    return res.data;
  });
};

export const gradeTaskResponse = (data: {
  response_id: string;
  score: string;
  task_score: string;
}) => {
  return AxoisApi.post(`${APIS.ACADEMIC_LOG.GRADE_TASK_RESPONSE}`, {
    grading: [
      {
        response_id: data?.response_id,
        score: data?.score,
        task_score: data?.task_score,
      },
    ],
  }).then((res) => {
    return res.data;
  });
};
