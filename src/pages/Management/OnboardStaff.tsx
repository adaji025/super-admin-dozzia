import { useState, useEffect, Fragment } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Box,
  Select,
  NumberInput,
  MultiSelect,
  RadioGroup,
  Radio,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { Helmet } from "react-helmet";
import moment from "moment";
import {
  UserCircle,
  BuildingHospital,
  History,
  CircleCheck,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import Upload from "../../components/Upload/Upload";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";
import { StaffRoleType, StateType } from "../../types/utilityTypes";
import { useLocalStorage } from "@mantine/hooks";
import { objectToFormData } from "../../lib/util";

const OnboardStaff = () => {
  const { dark } = useTheme();
  const [staffRoles] = useState<StaffRoleType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [states] = useState<StateType[]>([]);
  const [active, setActive] = useState<number>(0);
  const [formData, setFormData] = useLocalStorage<any>({
    key: "onboardStaff",
    defaultValue: {},
  });

  const nextStep = (data: any) => {
    if (active === 2) {
      return handleSubmit({ ...formData, ...data });
    }

    if (data) {
      setFormData({ ...formData, ...data });
    }
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = (data?: any) => {
    if (data) {
      setFormData({ ...formData, ...data });
    }
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const clearData = () => {
    setFormData({});
    setActive(0);
  };

  const handleSubmit = (values: Record<string, any>) => {
    setLoading(true);

    const data = {
      extra: {
        role_id: values.role_id,
      },
      profile: {
        title: values.title,
        first_name: values.first_name,
        last_name: values.last_name,
        middle_name: values.middle_name,
        gender: values.gender,
        phone_number: values.phone_number,
        email: values.email,
        ...(values.image && { picture: values.image }),
      },
      meta: {
        dob: moment(values.dob).format("YYYY-MM-DD"),
        address: values.address,
        state_of_origin: values.state_of_origin,
        religion: values.religion,
        postal_code: values.postal_code,
        height: values.height,
        weight: values.weight,
        genotype: values.genotype,
        blood_group: values.blood_group,
        state_disability: values.state_disability,
        years_of_experience: values.years_of_experience,
        existing_medical_condition: values.existing_conditions,
        hereditary_health_condition: values.hereditary_conditions,
      },
      next_of_kin: {
        full_name: values.next_of_kin_name,
        phone_number: values.next_of_kin_phone_number,
        email: values.next_of_kin_email,
      },
      guarantor: {
        full_name: values.guarantor_name,
        employment_role: values.guarantor_employment_role,
        phone_number: values.guarantor_phone_number,
      },
    };

    const formData = objectToFormData(data);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Onboard Staff</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Onboard Staff" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <LoadingOverlay visible={loading} />

      <div className="page-container">
        <PageHeader
          title=" Onboard Staff 👩‍🏫"
          desc="Provide the details below to onboard a new staff"
        />

        <div
          className="page-main"
          style={{
            background: dark ? "#1a1b1e" : "#ffffff",
            borderBottom: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
          }}
        >
          <div className="pm-inner-wrapper">
            <Stepper
              active={active}
              onStepClick={setActive}
              completedIcon={<CircleCheck />}
              breakpoint="sm"
            >
              <Stepper.Step
                icon={<UserCircle size={18} />}
                label="Personal Info"
                description="First step"
                allowStepSelect={false}
              >
                <PersonalInfo
                  {...{
                    nextStep,
                    formData,
                    states,
                    staffRoles,
                    clearData,
                  }}
                />
              </Stepper.Step>

              <Stepper.Step
                icon={<BuildingHospital size={18} />}
                label="Health History"
                description="Second step"
                allowStepSelect={false}
              >
                <HealthHistory {...{ active, nextStep, prevStep, formData }} />
              </Stepper.Step>

              <Stepper.Step
                icon={<History size={18} />}
                label="Work History"
                description="Final step"
                allowStepSelect={false}
              >
                <WorkHistory {...{ active, nextStep, prevStep, formData }} />
              </Stepper.Step>
            </Stepper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

interface PersonalInfoProps {
  nextStep: (data: any) => void;
  formData: any;
  states: StateType[];
  staffRoles: StaffRoleType[];
  clearData: () => void;
}

const PersonalInfo = ({
  nextStep,
  formData,
  states,
  staffRoles,
  clearData,
}: PersonalInfoProps) => {
  const [age, setAge] = useState<number>(0);
  const [file, setFile] = useState<any>(
    formData?.image ? formData?.image : null
  );

  const form = useForm({
    initialValues: {
      role_id: formData?.role_id ? formData?.role_id : "",
      title: formData?.title ? formData?.title : "",
      first_name: formData?.first_name ? formData?.first_name : "",
      last_name: formData?.last_name ? formData?.last_name : "",
      middle_name: formData?.middle_name ? formData?.middle_name : "",
      email: formData?.email ? formData?.email : "",
      phone_number: formData?.phone_number ? formData?.phone_number : "",
      address: formData?.address ? formData?.address : "",
      postal_code: formData?.postal_code ? formData?.postal_code : "",
      dob: formData?.dob ? formData?.dob : "",
      gender: formData?.gender ? formData?.gender : "",
      marital_status: formData?.marital_status ? formData?.marital_status : "",
      state_of_origin: formData?.state_of_origin
        ? formData?.state_of_origin
        : "",
      religion: formData?.religion ? formData?.religion : "",
      next_of_kin_name: formData?.next_of_kin_name
        ? formData?.next_of_kin_name
        : "",
      next_of_kin_phone_number: formData?.next_of_kin_phone_number
        ? formData?.next_of_kin_phone_number
        : "",
      next_of_kin_email: formData?.next_of_kin_email
        ? formData?.next_of_kin_email
        : "",
    },

    validate: {
      role_id: (value) => (value === "" ? "Select staff role" : null),
      title: (value) => (value === "" ? "Select title" : null),
      gender: (value) => (value === "" ? "Select gender" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      next_of_kin_email: (value) =>
        value === "" || /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const { dark } = useTheme();

  useEffect(() => {
    onDobChange();

    //eslint-disable-next-line
  }, [form.values.dob]);

  const onDobChange = () => {
    var age = moment().diff(form.values.dob, "years");

    setAge(age ? age : 0);
  };

  const onSave = (values: any) => {
    nextStep({
      ...values,
      age,
      image: file,
    });
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
            <Divider
              mb="lg"
              variant="dashed"
              label="Staff Role"
              labelPosition="center"
            />

            <div className="form-row">
              <Select
                className="form-item"
                required
                label="Staff Role"
                placeholder="Select role"
                data={staffRoles.map((role: StaffRoleType) => ({
                  key: role?.role_id,
                  value: role?.role_id,
                  label: role.name,
                }))}
                {...form.getInputProps("role_id")}
              />
            </div>

            <Divider
              mb="lg"
              variant="dashed"
              label="Personal Info"
              labelPosition="center"
            />

            <div className="form-row">
              <Select
                className="form-item"
                required
                label="Title"
                placeholder="Title"
                data={[
                  { value: "Mr", label: "Mr 🧑" },
                  { value: "Mrs", label: "Mrs 👱‍♀️" },
                  { value: "Miss", label: "Miss 👩‍🦰" },
                ]}
                {...form.getInputProps("title")}
              />

              <TextInput
                className="form-item"
                required
                label="First Name"
                placeholder="First name"
                type="text"
                {...form.getInputProps("first_name")}
              />

              <TextInput
                className="form-item"
                required
                label="Last Name"
                placeholder="Last name"
                type="text"
                {...form.getInputProps("last_name")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                label="Middle Name"
                placeholder="Middle name"
                type="text"
                {...form.getInputProps("middle_name")}
              />

              <Select
                className="form-item"
                required
                label="Gender"
                placeholder="Gender"
                data={[
                  { value: "Male", label: "Male 🧑" },
                  { value: "Female", label: "Female 👧" },
                  { value: "Other", label: "Other" },
                ]}
                {...form.getInputProps("gender")}
              />

              <DatePicker
                initialLevel="year"
                className="form-item"
                label="Date of Birth"
                placeholder="Date of birth"
                required
                {...form.getInputProps("dob")}
              />
            </div>

            <div className="form-row">
              <Select
                className="form-item"
                required
                label="Marital Status"
                placeholder="Marital status"
                data={[
                  { value: "Single", label: "Single" },
                  { value: "Married", label: "Married" },
                  { value: "Widowed", label: "Widowed" },
                  { value: "Divorced", label: "Divorced" },
                  { value: "Separated", label: "Separated" },
                ]}
                {...form.getInputProps("marital_status")}
              />

              <TextInput
                required
                className="form-item"
                label="Phone Number"
                placeholder="Phone number"
                type="tel"
                value={form.values.phone_number}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length > 11) {
                    return;
                  }
                  if (
                    e.target.value === "" ||
                    /^[0-9\b]+$/.test(e.target.value)
                  ) {
                    form.setFieldValue("phone_number", e.target.value);
                  }
                }}
              />

              <Select
                className="form-item"
                label="Religion"
                placeholder="Select religion"
                data={[
                  { value: "Christianity", label: "Christianity" },
                  { value: "Islam", label: "Islam" },
                  { value: "Other", label: "Other" },
                ]}
                {...form.getInputProps("religion")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Email"
                placeholder="Email"
                type="email"
                {...form.getInputProps("email")}
              />

              <TextInput
                className="form-item"
                label="House Address"
                placeholder="Address"
                type="text"
                {...form.getInputProps("address")}
              />

              <TextInput
                className="form-item"
                label="Postal Code"
                placeholder="Postal code"
                type="text"
                {...form.getInputProps("postal_code")}
              />
            </div>

            <div className="form-row">
              <Select
                className="form-item"
                required
                label="State of Origin"
                placeholder="Select State"
                searchable
                nothingFound="No option"
                data={states?.map(
                  (state: { state_id: string; name: string }) => ({
                    key: state?.state_id,
                    value: state?.state_id,
                    label: state.name,
                  })
                )}
                {...form.getInputProps("state_of_origin")}
              />
            </div>

            <Divider
              mb="lg"
              variant="dashed"
              label="Next of kin"
              labelPosition="center"
            />

            <div className="form-row">
              <TextInput
                className="form-item"
                label="Full Name"
                placeholder="Next of kin"
                type="text"
                {...form.getInputProps("next_of_kin_name")}
              />

              <TextInput
                className="form-item"
                label="Phone Number"
                placeholder="Phone number"
                type="tel"
                value={form.values.next_of_kin_phone_number}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length > 11) {
                    return;
                  }
                  if (
                    e.target.value === "" ||
                    /^[0-9\b]+$/.test(e.target.value)
                  ) {
                    form.setFieldValue(
                      "next_of_kin_phone_number",
                      e.target.value
                    );
                  }
                }}
              />

              <TextInput
                className="form-item"
                label="Email"
                placeholder="Email"
                type="email"
                {...form.getInputProps("next_of_kin_email")}
              />
            </div>

            <Divider mb="lg" variant="dashed" />

            <div className="form-row">
              <div className="form-item upload">
                <div
                  className="custom-title"
                  style={{
                    color: dark ? "#d5d7e0" : "#212529",
                  }}
                >
                  Upload Image
                </div>

                <Upload
                  text={file ? file?.name ?? "Image selected" : "Upload Image"}
                  accept={["image/jpeg", "image/png", "image/jpg"]}
                  extraClasses={`${file ? "file-selected" : ""}`}
                  setFile={setFile}
                />
              </div>
            </div>

            <Divider mb="lg" variant="dashed" />

            <Group position="apart" mt="xl">
              <Button type="submit">Next</Button>

              <Button
                onClick={() => {
                  clearData();
                  form.reset();
                }}
                color="red"
              >
                Clear saved data
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

interface HealthHistoryProps {
  active: number;
  nextStep: (data: any) => void;
  prevStep: (data?: any) => void;
  formData: any;
}

const HealthHistory = ({
  active,
  nextStep,
  prevStep,
  formData,
}: HealthHistoryProps) => {
  const [disability, setDisability] = useState<string>(
    formData?.disability ? formData?.disability : "No"
  );
  const form = useForm({
    initialValues: {
      height: formData?.height ? formData?.height : "",
      weight: formData?.weight ? formData?.weight : "",
      blood_group: formData?.blood_group ? formData?.blood_group : "",
      genotype: formData?.genotype ? formData?.genotype : "",
      existing_conditions: formData?.existing_conditions
        ? formData?.existing_conditions
        : [],
      hereditary_conditions: formData?.hereditary_conditions
        ? formData?.hereditary_conditions
        : [],
      state_disability: formData?.state_disability
        ? formData?.state_disability
        : "",
    },

    validate: {
      state_disability: (value) =>
        value === "" && disability === "Yes"
          ? "Please specify disability"
          : null,
    },
  });

  const onSave = (values: any) => {
    nextStep({ ...values, disability });
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box sx={{ maxWidth: 900 }}>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
            <div className="form-row">
              <NumberInput
                className="form-item"
                label="Height (cm)"
                placeholder="Height"
                type="text"
                {...form.getInputProps("height")}
              />

              <NumberInput
                className="form-item"
                label="Weight (kg)"
                placeholder="Weight"
                type="text"
                {...form.getInputProps("weight")}
              />
            </div>

            <div className="form-row">
              <Select
                className="form-item"
                label="Blood Group"
                placeholder="Blood group"
                data={[
                  { value: "O+", label: "O+" },
                  { value: "O-", label: "O-" },
                  { value: "AB+", label: "AB+" },
                  { value: "AB-", label: "AB-" },
                  { value: "A+", label: "A+" },
                  { value: "A-", label: "A-" },
                  { value: "B+", label: "B+" },
                  { value: "B-", label: "B-" },
                ]}
                {...form.getInputProps("blood_group")}
              />

              <Select
                className="form-item"
                label="Genotype"
                placeholder="Genotype"
                data={[
                  { value: "AA", label: "AA" },
                  { value: "AS", label: "AS" },
                  { value: "AC", label: "AC" },
                  { value: "SS", label: "SS" },
                  { value: "SC", label: "SC" },
                ]}
                {...form.getInputProps("genotype")}
              />
            </div>

            <div className="form-row">
              <MultiSelect
                className="form-item"
                radius={8}
                data={[
                  "Arthritis",
                  "Cardiovascular Disease",
                  "Chronic Obstructive Pulmonary Disease (COPD)",
                  "Depression",
                  "Diabetes",
                  "Gastroesophageal Reflux Disease (GERD)",
                  "Hypertension",
                  "Migraine",
                  "Obesity",
                  "Osteoporosis",
                  "Rheumatoid Arthritis",
                  "Sleep Apnea",
                  "Stroke",
                  "Type 2 Diabetes",
                ]}
                label="Existing Medical Condition(s)"
                placeholder="Select all that applies"
                {...form.getInputProps("existing_conditions")}
              />

              <MultiSelect
                className="form-item"
                radius={8}
                data={[
                  "Breast Cancer",
                  "Colon Cancer",
                  "Huntington's Disease",
                  "Lung Cancer",
                  "Ovarian Cancer",
                  "Polycystic Kidney Disease",
                  "Prostate Cancer",
                  "Cystic Fibrosis",
                  "Down Syndrome",
                  "Hemophilia",
                  "Huntington's Disease",
                  "Muscular Dystrophy",
                  "Phenylketonuria (PKU)",
                  "Sickle Cell Anemia",
                  "Tay-Sachs Disease",
                  "Thalassemia",
                  "Turner Syndrome",
                ]}
                label="Hereditary Health Condition(s)"
                placeholder="Select all that applies"
                {...form.getInputProps("hereditary_conditions")}
              />
            </div>

            <div className="form-row">
              <RadioGroup
                className="form-item"
                value={disability}
                onChange={setDisability}
                label="Any Disability?"
                required
              >
                <Radio value="Yes" label="Yes" />
                <Radio value="No" label="No" />
              </RadioGroup>
            </div>

            {disability === "Yes" && (
              <div className="form-row">
                <TextInput
                  required
                  className="form-item"
                  label="State Disability"
                  placeholder="Disability"
                  type="text"
                  {...form.getInputProps("state_disability")}
                />
              </div>
            )}

            <Divider mb="lg" variant="dashed" />

            <Group position="left" mt="xl">
              <Button
                variant="default"
                onClick={() => prevStep(form.values)}
                disabled={!active}
              >
                Previous
              </Button>
              <Button type="submit">Next</Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

interface WorkHistoryProps {
  active: number;
  nextStep: (values: any) => void;
  prevStep: (values: any) => void;
  formData: any;
}

const WorkHistory = ({
  active,
  nextStep,
  prevStep,
  formData,
}: WorkHistoryProps) => {
  const form = useForm({
    initialValues: {
      years_of_experience: formData?.years_of_experience
        ? formData?.years_of_experience
        : "",
      guarantor_name: formData?.guarantor_name ? formData?.guarantor_name : "",
      guarantor_employment_role: formData?.guarantor_employment_role
        ? formData?.guarantor_employment_role
        : "",
      guarantor_phone_number: formData?.guarantor_phone_number
        ? formData?.guarantor_phone_number
        : "",
    },
  });

  const onSave = (values: typeof form.values) => {
    nextStep(values);
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box sx={{ maxWidth: 900 }}>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
            <div className="form-row">
              <NumberInput
                required
                className="form-item"
                label="Years of Experience"
                placeholder="Enter number"
                type="number"
                {...form.getInputProps("years_of_experience")}
              />
            </div>

            <Divider
              mb="lg"
              variant="dashed"
              label="Guarantor"
              labelPosition="center"
            />

            <div className="form-row">
              <TextInput
                className="form-item"
                label="Guarantor Name"
                placeholder="Enter name"
                type="text"
                {...form.getInputProps("guarantor_name")}
              />

              <TextInput
                className="form-item"
                label="Employment Role"
                placeholder="e.g. Architect"
                type="text"
                {...form.getInputProps("guarantor_employment_role")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                label="Phone Number"
                placeholder="Guarantor number"
                type="tel"
                value={form.values.guarantor_phone_number}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length > 11) {
                    return;
                  }
                  if (
                    e.target.value === "" ||
                    /^[0-9\b]+$/.test(e.target.value)
                  ) {
                    form.setFieldValue(
                      "guarantor_phone_number",
                      e.target.value
                    );
                  }
                }}
              />
            </div>

            <Divider mb="lg" variant="dashed" />

            <Group position="left" mt="xl">
              <Button
                variant="default"
                onClick={() => prevStep(form.values)}
                disabled={!active}
              >
                Previous
              </Button>
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default OnboardStaff;
