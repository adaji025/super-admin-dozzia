import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const createCurriculumItem = (data: {
  title: string;
  description: string;
  subject_id: string;
  classroom_id: string;
  term_id: string;
  start_date: string;
  end_date: string;
  color: string;
  components: Array<string>;
}) => {
  return AxoisApi.post(`${APIS.CURRICULUM.CREATE_CURRICULUM_ITEM}`, data).then(
    (res) => {
      return res.data;
    }
  );
};

export const updateCurriculumItem = (
  curriculumId: string,
  data: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    color: string;
    components: Array<string>;
  }
) => {
  return AxoisApi.put(
    `${APIS.CURRICULUM.UPDATE_CURRICULUM(curriculumId)}`,
    data
  ).then((res) => {
    return res.data;
  });
};

export const getSubjectCurriculum = (
  page: number,
  perPage: number,
  subjectId: string,
  classroomId: string
) => {
  return AxoisApi.get(
    `${APIS.CURRICULUM.GET_CURRICULUM_LIST(
      page,
      perPage,
      subjectId,
      classroomId
    )}`
  ).then((res) => {
    return res.data;
  });
};
