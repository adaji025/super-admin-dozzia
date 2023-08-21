export type CreatBillsType = {
  classroom_id: string;
  title: string;
  description: string;
  number_of_installments: string;
  deadline_date: string;
  tickets: {
    title: string;
    amount: string;
  }[];
};


export type BillsType = {
  id: string
  classroom: Classroom
  created_by_staff: CreatedByStaff
  title: string
  status: string
  description: string
  number_of_installments: number
  deadline_date: string
}


export interface Classroom {
  classroom_id: string
  name: string
  level: number
  description: string
}

export interface CreatedByStaff {
  staff_id: string
  username: string
  email: string
  title: string
  first_name: string
  last_name: string
  middle_name: string
  picture: string
}
