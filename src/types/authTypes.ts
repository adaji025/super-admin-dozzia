export type SigninResponse = {
  required_new_password?: boolean;
  reset_code?: string;
  access_token: string;
};

export type ProfileType = {
  staff_id: string;
  username: string;
  email: string;
  title: string;
  first_name: string;
  middle_name: string;
  address: string;
  phone_number: null | string;
  last_name: string;
  picture: null | string;
  role: RoleType;
  meta: ProfileMeta | null;
  guarantor: GuarantorType | null;
  relative: RelativeType | null;
  school: SchoolType;
};

export type ProfileMeta = {
  years_of_experience: number;
  dob: string;
  address: string;
  religion: string;
  postal_code: string;
  height: null | string;
  weight: null | string;
  genotype: null | string;
  blood_group: null | string;
  state_disability: null | string;
  existing_medical_condition: string[];
  hereditary_health_condition: string[];
};

export type SchoolType = {
  school_id: string;
  name: string;
  logo: string | null;
  address: any;
  email: string;
  postal_code: null | string;
};

export type GuarantorType = {
  full_name: string;
  phone_number: string;
};

export type RelativeType = {
  full_name: string;
  phone_number: string;
};

export type RoleType = {
  role_id: string;
  name: Roles | "";
};

export enum Roles {
  Principal = "Principal",
  Teacher = "Teacher",
  SchoolAdmin = "School Admin",
}
