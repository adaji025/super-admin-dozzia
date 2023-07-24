import { SubjectType } from "./subjectsTypes";
import { ResponseMeta } from "./utilityTypes";

export type AcademicLogTaskType = {
  task_id: string;
  title: string;
  description: string;
  document: string;
  document_type: string;
  link: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  subject: SubjectType;
};

export type AcademicLogState = {
  data: AcademicLogTaskType[];
  meta: ResponseMeta;
};
