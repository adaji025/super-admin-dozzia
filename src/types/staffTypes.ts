import { RoleType } from "./authTypes";
import { ResponseMeta, StateType } from "./utilityTypes";

export type StaffState = {
  data: StaffType[];
  meta: ResponseMeta;
  dataFetched: boolean;
};

export type StaffType = {
  staff_id: string;
  username: string;
  email: string;
  title: string;
  first_name: string;
  last_name: string;
  picture: string | null;
  phone_number: string | null;
  role: RoleType;
  meta: StaffMetaType;
  guarantor: GuarantorType;
  relative: RelativeType;
  school: SchoolType;
};

export type StaffMetaType = {
  years_of_experience: number;
  dob: string;
  address: string;
  state_of_origin: StateType;
  religion: string;
  postal_code: string;
  height: number;
  weight: number;
  genotype: string;
  blood_group: string;
  state_disability: any;
  existing_medical_condition: string[];
  hereditary_health_condition: string[];
};

export type GuarantorType = {
  full_name: string;
  employment_role?: string;
  phone_number: string;
};

export type RelativeType = {
  full_name: string;
  phone_number: string;
  email?: string | null;
};

export type SchoolType = {
  school_id: string;
  name: string;
  logo: string | null;
  address: string;
  email: string;
  postal_code: string | null;
};

export type AddStaffData = {
  extra: {
    role_id: string;
  };
  profile: {
    title: string;
    first_name: string;
    last_name: string;
    middle_name: null;
    gender: string;
    phone_number: null | string;
    email: string;
  };
};
