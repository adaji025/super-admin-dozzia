export enum ReportStatusTypes {
  UNRESOLVED = "unresolved",
  RESOLVED = "resolved",
  PENDING = "in-progress",
}

export type ReportType = {
  id: string;
  tracking_code: string;
  title: string;
  date: string;
  status: ReportStatusTypes;
  staff_name: string;
  addressed_to: string;
  student: {
    id: string;
    first_name: string;
    last_name: string;
  };
  parent: {
    id: string;
    title: string;
    first_name: string;
    last_name: string;
  };
  comment: string;
};
