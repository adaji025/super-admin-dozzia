import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createTask = (data: any) => {
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

export const gradeTaskResponse = (
  data: Array<{ grade: number; total_grade: number; response_id: string }>
) => {
  return AxoisApi.put(`${APIS.ACADEMIC_LOG.GRADE_TASK_RESPONSE}`, {
    grading: data,
  }).then((res) => {
    return res.data;
  });
};
