import { ReportType } from "./reportsTypes";

export type Chart = {
  attendance_metrics: AttendanceMetrics;
  report_and_complains_metrics: ReportAndComplainsMetrics;
};

export type AttendanceMetrics = {
  boys_present: number;
  boys_absent: number;
  girl_present: number;
  girls_absent: number;
};

export type ReportAndComplainsMetrics = {
  unresolved_complains: number;
  resolved_complains: number;
  in_progress_complains: number;
};

export type GetMetricsResponse = {
  chart: Chart;
  report_and_complains: ReportType[];
};
