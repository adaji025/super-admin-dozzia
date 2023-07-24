import { SubjectType } from "./subjectsTypes";
import { ResponseMeta } from "./utilityTypes";

export type StudyResourceType = {
  id: string
  title: string
  description: string
  subject: SubjectType
  classroom: Classroom
  external_link: string
}

export type Classroom = {
  classroom_id: string
  name: string
  level: number
  description: string
}

export type StudyResourcesState = {
  meta: ResponseMeta;
  data: StudyResourceType[]
}

