import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { AxiosError } from "axios";
import { AcademicLogTaskType } from "../../types/academicLogTypes";
import { ApiResponseType } from "../../types/utilityTypes";

export const createTask = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(APIS.ACADEMIC_LOG.CREATE_TASK, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const getTasks = (
  page: number,
  perPage: number,
  classroomId: string,
  subjectId: string
) => {
  return new Promise<ApiResponseType<AcademicLogTaskType[]>>(
    (resolve, reject) => {
      AxoisApi.get(
        APIS.ACADEMIC_LOG.LIST_TASKS(page, perPage, classroomId, subjectId)
      )
        .then((res: { data: ApiResponseType<AcademicLogTaskType[]> }) => {
          resolve(res.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    }
  );
};

export const getTaskResponses = (
  page: number,
  perPage: number,
  taskId: string
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(APIS.ACADEMIC_LOG.GET_TASK_RESPONSES(page, perPage, taskId))
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const gradeTaskResponse = (
  data: Array<{ grade: number; total_grade: number; response_id: string }>
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(APIS.ACADEMIC_LOG.GRADE_TASK_RESPONSE, {
      grading: data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
