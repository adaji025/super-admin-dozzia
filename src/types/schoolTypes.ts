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
