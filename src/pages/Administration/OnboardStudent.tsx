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
  Textarea,
  Divider,
} from "@mantine/core";
import { useDispatch } from "react-redux";
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
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone";
import { onboardStudent } from "../../services/admin/admin";
import useAdmin from "../../hooks/useAdmin";
import { showLoader } from "../../redux/utility/utility.actions";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";

import "./administration.scss";

const OnboardStudent = () => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { handleError } = useNotification();

  const [active, setActive] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});

  const nextStep = (data: any) => {
    if (active === 2) {
      return handleSubmit({ ...formData, ...data });
    }

    if (data) {
      setFormData({ ...formData, ...data });
    }
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = (data: any) => {
    dispatch(showLoader(true));

    onboardStudent(data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Student added successfully 🤗",
          color: "green",
        });
        setActive(0);
        setFormData({});
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
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

      <div className="page-container">
        <PageHeader
          title="Onboard Student 🧑‍🎓"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
                <PersonalInfo {...{ active, nextStep, prevStep }} />
              </Stepper.Step>

              <Stepper.Step
                icon={<BuildingHospital size={18} />}
                label="Health History"
                description="Second step"
                allowStepSelect={false}
              >
                <HealthHistory {...{ active, nextStep, prevStep }} />
              </Stepper.Step>

              <Stepper.Step
                icon={<School size={18} />}
                label="Academic History"
                description="Final step"
                allowStepSelect={false}
              >
                <AcademicHistory {...{ active, nextStep, prevStep }} />
              </Stepper.Step>
            </Stepper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const PersonalInfo = ({ active, nextStep, prevStep }: any) => {
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      dob: "",
      gender: "",
      age: "",
      guardian_first_name: "",
      guardian_last_name: "",
      guardian_phone_number: "",
      guardian_email: "",
    },

    validate: {
      first_name: (value) => (value === "" ? "Input first name" : null),
      last_name: (value) => (value === "" ? "Input last name" : null),
      middle_name: (value) => (value === "" ? "Input middle name" : null),
      dob: (value) => (value === "" ? "Enter date of birth" : null),
      gender: (value) => (value === "" ? "Select student gender" : null),
      age: (value) => (value === "" ? "Enter student age" : null),
      guardian_first_name: (value) =>
        value === "" ? "Input guardian first name" : null,
      guardian_last_name: (value) =>
        value === "" ? "Input guardian last name" : null,
      guardian_phone_number: (value) =>
        value.length < 7 ? "Enter valid phone number" : null,
      guardian_email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const { dark } = useTheme();

  const onSave = (values: any) => {
    nextStep({
      ...values,
      dob: moment(values.dob).format("YYYY-MM-DD"),
      guardian_phone_number: values.guardian_phone_number,
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
                variant="filled"
                type="text"
                {...form.getInputProps("first_name")}
              />

              <TextInput
                className="form-item"
                required
                label="Last Name"
                placeholder="Last name"
                variant="filled"
                type="text"
                {...form.getInputProps("last_name")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Middle Name"
                placeholder="Middle name"
                variant="filled"
                type="text"
                {...form.getInputProps("middle_name")}
              />

              <DatePicker
                initialLevel="year"
                className="form-item"
                label="Date of Birth"
                placeholder="Date of birth"
                variant="filled"
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
                variant="filled"
                data={[
                  { value: "Male", label: "Male 🧑" },
                  { value: "Female", label: "Female 👧" },
                ]}
                {...form.getInputProps("gender")}
              />

              <NumberInput
                className="form-item"
                required
                label="Age"
                placeholder="Age"
                variant="filled"
                max={100}
                min={0}
                {...form.getInputProps("age")}
              />
            </div>

            <Divider
              mb="lg"
              variant="dashed"
              label="Guardian Info"
              labelPosition="center"
            />

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Guardian’s First Name"
                placeholder="Guardian’s first name"
                variant="filled"
                type="text"
                {...form.getInputProps("guardian_first_name")}
              />

              <TextInput
                className="form-item"
                required
                label="Guardian’s Last Name"
                placeholder="Guardian’s last name"
                variant="filled"
                type="text"
                {...form.getInputProps("guardian_last_name")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Guardian’s Phone Number"
                placeholder="Guardian’s phone number"
                variant="filled"
                {...form.getInputProps("guardian_phone_number")}
              />

              <TextInput
                className="form-item"
                required
                label="Guardian’s Email"
                placeholder="Guardian’s email"
                variant="filled"
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
                  Upload Image <span>* (Skip for now)</span>
                </div>

                <ImageDropzone filetype="image" fileLimit="1mb" />
              </div>
            </div>

            <Divider mb="lg" variant="dashed" />

            <Group position="left" mt="xl">
              <Button variant="default" onClick={prevStep} disabled={!active}>
                Previous
              </Button>
              <Button type="submit">Save & Continue</Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

const HealthHistory = ({ active, nextStep, prevStep }: any) => {
  const [disability, setDisability] = useState<string>("No");

  const form = useForm({
    initialValues: {
      height: "",
      weight: "",
      blood_group: "",
      genotype: "",
      existing_medical_condition: [],
      hereditary_health_condition: [],
      state_disability: "",
    },

    validate: {
      genotype: (value) =>
        value.length > 3 ? "Cannot be greater than 3 characters" : null,
      state_disability: (value) =>
        value === "" && disability === "Yes"
          ? "Please specify disability"
          : null,
    },
  });

  const { getMedicals, medicals } = useAdmin();

  useEffect(() => {
    getMedicals();
    //eslint-disable-next-line
  }, []);

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
                required
                label="Height (cm)"
                placeholder="Height"
                variant="filled"
                type="text"
                {...form.getInputProps("height")}
              />

              <NumberInput
                className="form-item"
                required
                label="Weight (kg)"
                placeholder="Weight"
                variant="filled"
                type="text"
                {...form.getInputProps("weight")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Blood Group"
                placeholder="Blood group"
                variant="filled"
                type="text"
                {...form.getInputProps("blood_group")}
              />

              <TextInput
                className="form-item"
                required
                label="Genotype"
                placeholder="Genotype"
                variant="filled"
                type="text"
                {...form.getInputProps("genotype")}
              />
            </div>

            <div className="form-row">
              <MultiSelect
                className="form-item"
                data={medicals.map(
                  (condition: { medical_id: string; name: string }) => ({
                    key: condition?.medical_id,
                    value: condition?.medical_id,
                    label: condition.name,
                  })
                )}
                label="Existing Medical Condition(s)"
                placeholder="Select all that applies"
                variant="filled"
                {...form.getInputProps("existing_medical_condition")}
              />

              <MultiSelect
                className="form-item"
                data={medicals.map(
                  (condition: { medical_id: string; name: string }) => ({
                    key: condition?.medical_id,
                    value: condition?.medical_id,
                    label: condition.name,
                  })
                )}
                label="Hereditary Health Condition(s)"
                placeholder="Select all that applies"
                variant="filled"
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
                  variant="filled"
                  type="text"
                  {...form.getInputProps("state_disability")}
                />
              </div>
            )}

            <Divider mb="lg" variant="dashed" />

            <Group position="left" mt="xl">
              <Button variant="default" onClick={prevStep} disabled={!active}>
                Previous
              </Button>
              <Button type="submit">Save & Continue</Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

const AcademicHistory = ({ active, nextStep, prevStep }: any) => {
  const form = useForm({
    initialValues: {
      previous_school_name: "",
      previous_academic_year: "",
      last_grade: "",
      entry_test_result: "",
      reason_leaving_previous_school: "",
    },
  });

  const onSave = (values: any) => {
    nextStep({
      ...values,
      previous_academic_year: values.previous_academic_year.toString(),
    });
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box sx={{ maxWidth: 900 }}>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
            <div className="form-row">
              <TextInput
                className="form-item"
                label="Previous School Name"
                placeholder="Enter name"
                variant="filled"
                type="text"
                {...form.getInputProps("previous_school_name")}
              />
            </div>

            <div className="form-row">
              <NumberInput
                required
                className="form-item"
                label="Previous Academic Year"
                placeholder="Enter year"
                variant="filled"
                type="number"
                {...form.getInputProps("previous_academic_year")}
              />
            </div>

            <div className="form-row">
              <NumberInput
                required
                className="form-item"
                label="Last Grade (%)"
                placeholder="Grade"
                variant="filled"
                type="number"
                max={100}
                min={0}
                {...form.getInputProps("last_grade")}
              />
            </div>

            <div className="form-row">
              <Textarea
                className="form-item"
                label="Reason for leaving previous school"
                placeholder="Provide a summary"
                variant="filled"
                autosize
                minRows={3}
                maxRows={5}
                {...form.getInputProps("reason_leaving_previous_school")}
              />
            </div>

            <div className="form-row">
              <NumberInput
                className="form-item"
                required
                label="Entry Test Score (%)"
                placeholder="Score"
                variant="filled"
                type="number"
                max={100}
                min={0}
                {...form.getInputProps("entry_test_result")}
              />
            </div>

            <Divider mb="lg" variant="dashed" />

            <Group position="left" mt="xl">
              <Button variant="default" onClick={prevStep} disabled={!active}>
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
