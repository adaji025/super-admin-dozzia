import { ResponseMeta } from "./utilityTypes";

export type Chart = {
  attendance_metrics: AttendanceMetricsTypes;
  report_and_complains_metrics: ReportAndComplainsMetricsTypes;
};

export type AttendanceMetricsTypes = {
  boys_present: number;
  boys_absent: number;
  girl_present: number;
  girls_absent: number;
};

export type ReportAndComplainsMetricsTypes =  {
  unresolved_complains: number;
  resolved_complains: number;
  in_progress_complains: number;
}

export type MetricsTypes = {
  chart: Chart;
  report_and_complains: any[];
};

export type GetMetricsResponse = {
  data: MetricsTypes;
  meta: ResponseMeta;
};
