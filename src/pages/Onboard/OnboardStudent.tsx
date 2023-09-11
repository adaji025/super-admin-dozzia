import { useState, useEffect, Fragment } from "react";
import { AxiosError } from "axios";
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
import { showNotification } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import moment from "moment";
import {
  UserCircle,
  BuildingHospital,
  School,
  CircleCheck,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import Upload from "../../components/Upload/Upload";
import { onboardStudent } from "../../services/student/student";
import useClass from "../../hooks/useClass";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useLocalStorage } from "@mantine/hooks";
import "./administration.scss";
import { AddStudentData } from "../../types/studentTypes";
import { objectToFormData } from "../../lib/util";
import { ClassroomType } from "../../types/classTypes";

const OnboardStudent = () => {
  const { dark } = useTheme();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const [formData, setFormData] = useLocalStorage<any>({
    key: "onboardStudent",
    defaultValue: {},
  });
  const { getClassList, allClasses } = useClass();

  useEffect(() => {
    getClassList(1, 200, "", "", true);

    //eslint-disable-next-line
  }, []);

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

    const data: AddStudentData = {
      profile: {
        first_name: values.first_name,
        last_name: values.last_name,
        middle_name: values.middle_name,
        gender: values.gender,
        ...(values.image && { picture: values.image }),
      },
      guardian: {
        email: values.guardian_email,
        first_name: values.guardian_first_name,
        last_name: values.guardian_last_name,
        phone_number: values.guardian_phone_number,
        title: values.guardian_title,
      },
      meta: {
        dob: moment(values.dob).format("YYYY-MM-DD"),
        state_disability: values.state_disability,
        blood_group: values.blood_group,
        genotype: values.genotype,
        previous_school_name: values.previous_school_name,
        entry_year: values.entry_year,
        entry_test_result: values.entry_test_result,
        weight: values.weight,
        height: values.height,
        entry_class: values.entry_class,
        existing_medical_condition: values.existing_medical_condition,
        hereditary_health_condition: values.hereditary_health_condition,
      },
    };

    const formData = objectToFormData(data);

    onboardStudent(formData)
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Student added successfully 🤗",
          color: "green",
        });
        clearData();
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Onboard Student</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Onboard Student" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <LoadingOverlay visible={loading} />

      <div className="page-container">
        <PageHeader
          title="Onboard Student 🧑‍🎓"
          desc="Provide the details below to onboard a new student"
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
                <PersonalInfo {...{ formData, nextStep, clearData }} />
              </Stepper.Step>

              <Stepper.Step
                icon={<BuildingHospital size={18} />}
                label="Health History"
                description="Second step"
                allowStepSelect={false}
              >
                <HealthHistory {...{ formData, active, nextStep, prevStep }} />
              </Stepper.Step>

              <Stepper.Step
                icon={<School size={18} />}
                label="Academic History"
                description="Final step"
                allowStepSelect={false}
              >
                <AcademicHistory
                  {...{ formData, active, nextStep, prevStep, allClasses }}
                />
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
  clearData: () => void;
}

const PersonalInfo = ({ nextStep, formData, clearData }: PersonalInfoProps) => {
  const [file, setFile] = useState<any>(
    formData?.image ? formData?.image : undefined
  );

  const form = useForm({
    initialValues: {
      first_name: formData?.first_name ? formData?.first_name : "",
      last_name: formData?.last_name ? formData?.last_name : "",
      middle_name: formData?.middle_name ? formData?.middle_name : "",
      dob: formData?.dob ? new Date(formData?.dob) : "",
      gender: formData?.gender ? formData?.gender : "",
      guardian_title: formData?.guardian_title ? formData?.guardian_title : "",
      guardian_first_name: formData?.guardian_first_name
        ? formData?.guardian_first_name
        : "",
      guardian_last_name: formData?.guardian_last_name
        ? formData?.guardian_last_name
        : "",
      guardian_phone_number: formData?.guardian_phone_number
        ? formData?.guardian_phone_number
        : "",
      guardian_email: formData?.guardian_email ? formData?.guardian_email : "",
    },

    validate: {
      first_name: (value) => (value === "" ? "Input first name" : null),
      last_name: (value) => (value === "" ? "Input last name" : null),
      dob: (value) => (value === "" ? "Enter date of birth" : null),
      gender: (value) => (value === "" ? "Select student gender" : null),
      guardian_title: (value) =>
        value === "" ? "Select guardian title" : null,
      guardian_first_name: (value) =>
        value === "" ? "Input guardian first name" : null,
      guardian_last_name: (value) =>
        value === "" ? "Input guardian last name" : null,
      guardian_phone_number: (value) =>
        value.length !== 11 ? "Phone number must be 11 digits" : null,
      guardian_email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const { dark } = useTheme();

  const onSave = (values: any) => {
    // if (!file) {
    //   return showNotification({
    //     message: "Please select student image",
    //     color: "yellow",
    //   });
    // }

    nextStep({
      ...values,
      image: file,
    });
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box sx={{ maxWidth: 900 }}>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
            <Divider
              mb="lg"
              variant="dashed"
              label="Personal Info"
              labelPosition="center"
            />

            <div className="form-row">
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
                label="Gender"
                placeholder="Gender"
                data={[
                  { value: "Male", label: "Male 🧑" },
                  { value: "Female", label: "Female 👧" },
                  { value: "Other", label: "Other" },
                ]}
                {...form.getInputProps("gender")}
              />
            </div>

            <Divider
              mb="lg"
              variant="dashed"
              label="Guardian Info"
              labelPosition="center"
            />

            <div className="form-row">
              <Select
                className="form-item"
                required
                label="Guardian Title"
                placeholder="Guardian Title"
                data={[
                  { value: "Mr", label: "Mr 🧑" },
                  { value: "Mrs", label: "Mrs 👱‍♀️" },
                  { value: "Miss", label: "Miss 👩‍🦰" },
                ]}
                {...form.getInputProps("guardian_title")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Guardian’s First Name"
                placeholder="Guardian’s first name"
                type="text"
                {...form.getInputProps("guardian_first_name")}
              />

              <TextInput
                className="form-item"
                required
                label="Guardian’s Last Name"
                placeholder="Guardian’s last name"
                type="text"
                {...form.getInputProps("guardian_last_name")}
              />
            </div>

            <div className="form-row">
              <TextInput
                required
                className="form-item"
                label="Guardian’s Phone Number"
                placeholder="Guardian’s phone number"
                type="tel"
                value={form.values.guardian_phone_number}
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
                    form.setFieldValue("guardian_phone_number", e.target.value);
                  }
                }}
              />

              <TextInput
                className="form-item"
                required
                label="Guardian’s Email"
                placeholder="Guardian’s email"
                type="email"
                {...form.getInputProps("guardian_email")}
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
                  text={file ? file?.name : "Upload Image"}
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
      existing_medical_condition: formData?.existing_medical_condition
        ? formData?.existing_medical_condition
        : [],
      hereditary_health_condition: formData?.hereditary_health_condition
        ? formData?.hereditary_health_condition
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
                  "Asthma",
                  "Attention Deficit Hyperactivity Disorder (ADHD)",
                  "Autism Spectrum Disorder (ASD)",
                  "Celiac Disease",
                  "Chickenpox",
                  "Common Cold",
                  "Croup",
                  "Ear Infections",
                  "Eczema",
                  "Fever",
                  "Hand, Foot, and Mouth Disease",
                  "Measles",
                  "Pediatric Migraine",
                  "Pneumonia",
                  "Respiratory Syncytial Virus (RSV) Infection",
                  "Strep Throat",
                  "Urinary Tract Infection (UTI)",
                  "Whooping Cough",
                ]}
                label="Existing Medical Condition(s)"
                placeholder="Select all that applies"
                {...form.getInputProps("existing_medical_condition")}
              />

              <MultiSelect
                className="form-item"
                radius={8}
                data={[
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
                {...form.getInputProps("hereditary_health_condition")}
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

interface AcademicHistoryProps {
  active: number;
  nextStep: (values: any) => void;
  prevStep: (values: any) => void;
  formData: any;
  allClasses: ClassroomType[];
}

const AcademicHistory = ({
  active,
  nextStep,
  prevStep,
  formData,
  allClasses,
}: AcademicHistoryProps) => {
  const form = useForm({
    initialValues: {
      entry_class: formData?.entry_class ? formData?.entry_class : "",
      entry_year: formData?.entry_year ? formData?.entry_year : "",
      entry_test_result: formData?.entry_test_result
        ? formData?.entry_test_result
        : "",
      previous_school_name: formData?.previous_school_name
        ? formData?.previous_school_name
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
              <Select
                required
                label="Class of Entry"
                placeholder="Select class"
                searchable
                className="form-item"
                nothingFound="No class found"
                data={allClasses.map((item: ClassroomType) => ({
                  key: item?.classroom_id,
                  value: item.classroom_id,
                  label: item.name,
                }))}
                {...form.getInputProps("entry_class")}
              />
            </div>

            <div className="form-row">
              <NumberInput
                required
                className="form-item"
                label="Year of Entry"
                placeholder="Enter year"
                type="number"
                {...form.getInputProps("entry_year")}
              />
            </div>

            <div className="form-row">
              <NumberInput
                className="form-item"
                label="Entry Test Score (%)"
                placeholder="Score"
                type="number"
                max={100}
                min={0}
                {...form.getInputProps("entry_test_result")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                label="Previous School Name"
                placeholder="Previous School"
                type="text"
                {...form.getInputProps("previous_school_name")}
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

export default OnboardStudent;
