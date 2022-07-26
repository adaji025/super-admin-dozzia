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
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
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
import { onboardStaff } from "../../services/staff/staff";
import useAdmin from "../../hooks/useAdmin";
import { showLoader } from "../../redux/utility/utility.actions";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";

import "./administration.scss";

const OnboardStaff = () => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { handleError } = useNotification();

  const [active, setActive] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});
  const {
    getStates,
    getStaffRoles,
    states,
    staffRoles,
    getMedicals,
    medicals,
  } = useAdmin();

  useEffect(() => {
    getStates();
    getStaffRoles();
    getMedicals();

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

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = (values: any) => {
    dispatch(showLoader(true));

    const data = new FormData();
    data.append("address", values?.address);
    data.append("age", values?.age);
    data.append("blood_group", values?.blood_group);
    data.append("blood_type", values?.blood_type);
    data.append("disability", values?.disability);
    data.append("dob", moment(values.dob).format("L"));
    data.append("email", values?.email);
    data.append("first_name", values?.first_name);
    data.append("middle_name", values?.middle_name);
    data.append("gender", values?.gender);
    data.append("guarantor_employment_role", values?.guarantor_employment_role);
    data.append("guarantor_name", values?.guarantor_name);
    data.append("guarantor_phone_number", values?.guarantor_phone_number);
    data.append("marital_status", values?.marital_status);
    data.append("next_of_kin_email", values?.next_of_kin_email);
    data.append("next_of_kin_name", values?.next_of_kin_name);
    data.append("next_of_kin_phone_number", values?.next_of_kin_phone_number);
    data.append("phone_number", values?.phone_number);
    data.append("postal_code", values?.postal_code);
    data.append("religion", values?.religion);
    data.append("role_id", values?.role_id);
    data.append("last_name", values?.last_name);
    data.append("state_disability", values?.state_disability);
    data.append("weight", values?.weight);
    data.append("height", values?.height);
    data.append("year_of_experience", values.year_of_experience.toString());
    data.append("title", values?.title);
    data.append("image", values?.image);
    for (let i = 0; i < values?.existing_conditions.length; i++) {
      data.append("existing_conditions[]", values?.existing_conditions[i]);
    }
    for (let i = 0; i < values?.hereditary_conditions.length; i++) {
      data.append("hereditary_conditions[]", values?.hereditary_conditions[i]);
    }

    onboardStaff(data)
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Staff added successfully 🤗",
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
        <title>Onboard Staff</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Onboard Staff" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <div className="page-container">
        <PageHeader
          title=" Onboard Staff 👩‍🏫"
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
                <PersonalInfo
                  {...{
                    active,
                    nextStep,
                    prevStep,
                    formData,
                    states,
                    staffRoles,
                  }}
                />
              </Stepper.Step>

              <Stepper.Step
                icon={<BuildingHospital size={18} />}
                label="Health History"
                description="Second step"
                allowStepSelect={false}
              >
                <HealthHistory
                  {...{ active, nextStep, prevStep, formData, medicals }}
                />
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

const PersonalInfo = ({
  active,
  nextStep,
  prevStep,
  formData,
  states,
  staffRoles,
}: any) => {
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
      religion: (value) => (value === "" ? "Select religion" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      next_of_kin_email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
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
    // if (!file) {
    //   return showNotification({
    //     message: "Please select staff image",
    //     color: "yellow",
    //   });
    // }

    nextStep({
      ...values,
      age,
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
              label="Staff Role"
              labelPosition="center"
            />

            <div className="form-row">
              <Select
                className="form-item"
                required
                label="Staff Role"
                placeholder="Select role"
                variant="filled"
                data={staffRoles.map(
                  (role: { role_id: string; role_name: string }) => ({
                    key: role?.role_id,
                    value: role?.role_id,
                    label: role.role_name,
                  })
                )}
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
                variant="filled"
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
                variant="filled"
                type="text"
                {...form.getInputProps("first_name")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Last Name"
                placeholder="Last name"
                variant="filled"
                type="text"
                {...form.getInputProps("last_name")}
              />

              <TextInput
                className="form-item"
                required
                label="Middle Name"
                placeholder="Middle name"
                variant="filled"
                type="text"
                {...form.getInputProps("middle_name")}
              />
            </div>

            <div className="form-row">
              <Select
                className="form-item"
                required
                label="Marital Status"
                placeholder="Marital status"
                variant="filled"
                data={[
                  { value: "Single", label: "Single" },
                  { value: "Married", label: "Married" },
                  { value: "Widowed", label: "Widowed" },
                  { value: "Divorced", label: "Divorced" },
                  { value: "Separated", label: "Separated" },
                ]}
                {...form.getInputProps("marital_status")}
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
                disabled
                value={age}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Phone Number"
                placeholder="Phone number"
                variant="filled"
                type="tel"
                {...form.getInputProps("phone_number")}
              />

              <TextInput
                className="form-item"
                required
                label="Email"
                placeholder="Email"
                variant="filled"
                type="email"
                {...form.getInputProps("email")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="House Address"
                placeholder="Address"
                variant="filled"
                type="text"
                {...form.getInputProps("address")}
              />

              <TextInput
                className="form-item"
                required
                label="Postal Code"
                placeholder="Postal code"
                variant="filled"
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
                variant="filled"
                searchable
                nothingFound="No option"
                data={states.map(
                  (state: { state_id: string; name: string }) => ({
                    key: state?.state_id,
                    value: state?.state_id,
                    label: state.name,
                  })
                )}
                {...form.getInputProps("state_of_origin")}
              />

              <Select
                className="form-item"
                required
                label="Religion"
                placeholder="Select religion"
                variant="filled"
                data={[
                  { value: "Christianity", label: "Christianity" },
                  { value: "Islam", label: "Islam" },
                  { value: "Other", label: "Other" },
                ]}
                {...form.getInputProps("religion")}
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
                required
                label="Full Name"
                placeholder="Next of kin"
                variant="filled"
                type="text"
                {...form.getInputProps("next_of_kin_name")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                type="tel"
                label="Phone Number"
                placeholder="Phone number"
                variant="filled"
                {...form.getInputProps("next_of_kin_phone_number")}
              />

              <TextInput
                className="form-item"
                required
                label="Email"
                placeholder="Email"
                variant="filled"
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
                  Upload Image <span>*</span>
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

const HealthHistory = ({
  active,
  nextStep,
  prevStep,
  formData,
  medicals,
}: any) => {
  const [disability, setDisability] = useState<string>(
    formData?.disability ? formData?.disability : "No"
  );
  const form = useForm({
    initialValues: {
      height: formData?.height ? formData?.height : "",
      weight: formData?.weight ? formData?.weight : "",
      blood_group: formData?.blood_group ? formData?.blood_group : "",
      blood_type: formData?.blood_type ? formData?.blood_type : "",
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
      blood_type: (value) => (value === "" ? "Please select genotype" : null),
      blood_group: (value) =>
        value === "" ? "Please select blood group" : null,
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
              <Select
                className="form-item"
                required
                label="Blood Group"
                placeholder="Blood group"
                variant="filled"
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
                required
                label="Genotype"
                placeholder="Genotype"
                variant="filled"
                data={[
                  { value: "AA", label: "AA" },
                  { value: "AS", label: "AS" },
                  { value: "AC", label: "AC" },
                  { value: "SS", label: "SS" },
                  { value: "SC", label: "SC" },
                ]}
                {...form.getInputProps("blood_type")}
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
                {...form.getInputProps("existing_conditions")}
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

const WorkHistory = ({ active, nextStep, prevStep, formData }: any) => {
  const form = useForm({
    initialValues: {
      year_of_experience: formData?.year_of_experience
        ? formData?.year_of_experience
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

  const onSave = (values: any) => {
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
                variant="filled"
                type="number"
                {...form.getInputProps("year_of_experience")}
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
                required
                className="form-item"
                label="Guarantor Name"
                placeholder="Enter name"
                variant="filled"
                type="text"
                {...form.getInputProps("guarantor_name")}
              />

              <TextInput
                required
                className="form-item"
                label="Employment Role"
                placeholder="e.g. Architect"
                variant="filled"
                type="text"
                {...form.getInputProps("guarantor_employment_role")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Phone Number"
                placeholder="Guarantor number"
                variant="filled"
                type="tel"
                {...form.getInputProps("guarantor_phone_number")}
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

export default OnboardStaff;
