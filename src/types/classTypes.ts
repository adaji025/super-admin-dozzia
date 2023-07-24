import { ResponseMeta } from "./utilityTypes";

export type ClassroomType = {
  classroom_id: string;
  name: string;
  level: number;
  description: string | null;
  class_teacher: ClassTeacherType;
};

export type ClassTeacherType = {
  staff_id: string;
  username: string;
  email: string;
  title: string;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  picture: null | string;
};

export type ClassesState = {
  data: ClassroomType[];
  meta: ResponseMeta;
  dataFetched: boolean;
};

export type CreateClassData = {
  name: string;
  staff_id: string;
  level: string;
  description?: string;
};
