import { ResponseMeta } from "./utilityTypes";

export type GradeType = {
  id: string;
  min_score: number;
  max_score: number;
  name: string;
  remark: string;
};

export type GradeState = {
  meta: ResponseMeta;
  data: GradeType[];
};

export type CreateGradeData = {
  name: string;
  remark: string;
  min_score: number;
  max_score: number;
};
