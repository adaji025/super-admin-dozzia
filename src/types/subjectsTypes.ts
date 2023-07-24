import { ResponseMeta } from "./utilityTypes";

export type SubjectsState = {
  data: SubjectType[];
  meta: ResponseMeta;
  dataFetched: boolean;
};

export type SubjectType = {
  subject_id: string;
  name: string;
  category: string;
  description?: string;
};

export type CreateSubjectData = {
  name: string;
  category: string;
  description: string;
};

export enum SubjectCategories {
  Core = "Core",
  Elective = "Elective",
  Selective = "Selective",
}
