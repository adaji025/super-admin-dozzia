import { ResponseMeta } from "./utilityTypes";

export type GetGeneralAttendanceResponse = {
  data: GeneralAttendanceType[];
  meta: ResponseMeta;
};

export type GeneralAttendanceType = {
  classroom_id: string;
  classroom_name: string;
  total_present: number;
  total_student: number;
};

export type GetClassAttendanceResponse = {
  data: ClassAttendanceType[];
  meta: ResponseMeta;
};

export interface ClassAttendanceType {
  student_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  guardians: Guardian[];
  attendance: Attendance;
}

export interface Guardian {
  first_name: string;
  last_name: string;
}

export interface Attendance {
  is_marked: boolean;
  is_present: boolean;
  created_at: Date;
}
