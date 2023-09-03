import { ClassroomType } from "./classTypes";
import { StaffType } from "./staffTypes";
import { ResponseMeta } from "./utilityTypes";

export type CreateBillData = {
  classroom_id: string[];
  title: string;
  description: string;
  number_of_installments: string;
  deadline_date: string;
  tickets: {
    title: string;
    amount: string;
  }[];
};

export type BillType = {
  school_bill_id: string;
  classrooms: ClassroomType[];
  created_by_staff: StaffType;
  title: string;
  status: string;
  description: string;
  number_of_installments: number;
  deadline_date: string;
  school_tickets: SchoolTicket[];
};

export type SchoolTicket = {
  school_ticket_id: string;
  title: string;
  amount: string;
};

export type BillsState = {
  data: BillType[];
  meta: ResponseMeta;
  dataFetched: boolean;
};