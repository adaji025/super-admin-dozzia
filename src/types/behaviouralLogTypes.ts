import { ClassTeacherType } from "./classTypes";
import { ResponseMeta } from "./utilityTypes";

export type BehavioralLogRemarkType = {
  remark_id: string;
  description: string;
  category: string;
  published_at: string;
  teacher: ClassTeacherType;
};

export type BehaviouralLogState = {
  data: BehavioralLogRemarkType[];
  meta: ResponseMeta;
};
