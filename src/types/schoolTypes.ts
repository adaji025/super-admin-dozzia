export type AddSchoolData = {
  school_details: {
    name: string;
    address: string;
    email: string;
    reg_no: string;
    code: string;
  };
  staff_details: {
    title: string;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    gender: string;
    phone_number: string;
    email: string;
  };
  school_logo?: null;
};

export type SchoolTypes = {
  school_id: string;
  name: string;
  logo: any;
  address: string;
  email: string;
  postal_code: any;
  code: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
};

export type UpdateSchoolTypes = {
  school_id: string;
  name: string;
  logo: any;
};
