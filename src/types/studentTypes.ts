import { ProfileMeta, SchoolType } from "./authTypes";
import { ClassroomType } from "./classTypes";
import { ResponseMeta } from "./utilityTypes";

export type StudentType = {
  student_id: string;
  reg_no: string;
  picture?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  gender: string;
  is_default_account: boolean;
  school: SchoolType;
  meta: ProfileMeta;
  guardian: GuardianType;
  current_class: CurrentClassType;
};
export type GuardianType = {
  guardian_id: string;
  username: string;
  email: string;
  phone_number: null | string;
  title: string;
  first_name: string;
  last_name: string;
};

export type CurrentClassType = {
  classroom_student_id: string;
  classroom: ClassroomType;
  is_current: boolean;
};

export type StudentsState = {
  data: StudentType[];
  meta: ResponseMeta;
  dataFetched: boolean;
};


export type AddStudentData = {
  profile: {
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    picture: File | null;
  };

  guardian: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    title: string;
  };
  meta: {
    dob: string;
    state_disability: string | null;
    blood_group: string;
    genotype: string;
    previous_school_name: string;
    entry_year: string;
    entry_test_result: number;
    weight: number;
    height: number;
    entry_class: string;
    existing_medical_condition: string[];
    hereditary_health_condition: string[];
  };
};

