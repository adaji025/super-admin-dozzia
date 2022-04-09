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
  History,
  CircleCheck,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone";
import { onboardStaff } from "../../services/admin/admin";
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
                icon={<History size={18} />}
                label="Work History"
                description="Final step"
                allowStepSelect={false}
              >
                <WorkHistory {...{ active, nextStep, prevStep }} />
              </Stepper.Step>
            </Stepper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const PersonalInfo = ({ active, nextStep, prevStep }: any) => {
  const { getStates, getStaffRoles, states, staffRoles } = useAdmin();

  useEffect(() => {
    getStates();
    getStaffRoles();
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      role_id: "",
      title: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      phone_number: "",
      address: "",
      postal_code: "",
      dob: "",
      gender: "",
      age: "",
      marital_status: "",
      state_of_origin: "",
      religion: "",
      next_of_kin_name: "",
      next_of_kin_phone_number: "",
      next_of_kin_email: "",
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

  const onSave = (values: any) => {
    nextStep({
      ...values,
      dob: moment(values.dob).format("L"),
      phone_number: values.phone_number,
      next_of_kin_phone_number: values.next_of_kin_phone_number,
    });
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box sx={{ maxWidth: 900 }}>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
            <div className="form-row">
              <Select
                className="form-item"
                required
                label="Staff Role"
                placeholder="Select role"
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

            <Divider mb="lg" variant="dashed" />

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
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Last Name"
                placeholder="Last name"
                type="text"
                {...form.getInputProps("last_name")}
              />

              <TextInput
                className="form-item"
                required
                label="Middle Name"
                placeholder="Middle name"
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
                ]}
                {...form.getInputProps("gender")}
              />

              <NumberInput
                className="form-item"
                required
                label="Age"
                placeholder="Age"
                max={100}
                min={0}
                {...form.getInputProps("age")}
              />
            </div>

            <div className="form-row">
              <TextInput
                className="form-item"
                required
                label="Phone Number"
                placeholder="Phone number"
                type="tel"
                {...form.getInputProps("phone_number")}
              />

              <TextInput
                className="form-item"
                required
                label="Email"
                placeholder="Email"
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
                type="text"
                {...form.getInputProps("address")}
              />

              <TextInput
                className="form-item"
                required
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
                {...form.getInputProps("next_of_kin_phone_number")}
              />

              <TextInput
                className="form-item"
                required
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
      blood_type: "",
      existing_conditions: [],
      hereditary_conditions: [],
      state_disability: "",
    },

    validate: {
      blood_type: (value) =>
        value.length > 3 ? "Cannot be greater than 3 characters" : null,
      state_disability: (value) =>
        value === "" && disability === "Yes"
          ? "Please specify disability"
          : null,
    },
  });

  const { getMedicals } = useAdmin();

  useEffect(() => {
    getMedicals();
    //eslint-disable-next-line
  }, []);

  const onSave = (values: any) => {
    nextStep({ ...values, disability });
  };

  const data = [
    { value: "1", label: "Condition 1" },
    { value: "2", label: "Condition 2" },
    { value: "3", label: "Condition 3" },
  ];

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
                type="text"
                {...form.getInputProps("height")}
              />

              <NumberInput
                className="form-item"
                required
                label="Weight (kg)"
                placeholder="Weight"
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
                type="text"
                {...form.getInputProps("blood_group")}
              />

              <TextInput
                className="form-item"
                required
                label="Genotype"
                placeholder="Genotype"
                type="text"
                {...form.getInputProps("blood_type")}
              />
            </div>

            <div className="form-row">
              <MultiSelect
                className="form-item"
                data={data}
                label="Existing Medical Condition(s)"
                placeholder="Select all that applies"
                {...form.getInputProps("existing_conditions")}
              />

              <MultiSelect
                className="form-item"
                data={data}
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

const WorkHistory = ({ active, nextStep, prevStep }: any) => {
  const form = useForm({
    initialValues: {
      previous_workplace: "",
      year_of_experience: "",
      guarantor_name: "",
      guarantor_employment_role: "",
      guarantor_phone_number: "",
      reason_leaving_previous_workplace: "",
    },
  });

  const onSave = (values: any) => {
    nextStep({
      ...values,
      year_of_experience: values.year_of_experience.toString(),
      guarantor_phone_number: values.guarantor_phone_number,
    });
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box sx={{ maxWidth: 900 }}>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
            <div className="form-row">
              <TextInput
                required
                className="form-item"
                label="Previous Workplace"
                placeholder="Enter name"
                type="text"
                {...form.getInputProps("previous_workplace")}
              />
            </div>

            <div className="form-row">
              <NumberInput
                required
                className="form-item"
                label="Years of Experience"
                placeholder="Enter number"
                type="number"
                {...form.getInputProps("year_of_experience")}
              />
            </div>

            <div className="form-row">
              <Textarea
                className="form-item"
                label="Reason for leaving previous school"
                placeholder="Provide a summary"
                autosize
                minRows={3}
                maxRows={5}
                {...form.getInputProps("reason_leaving_previous_workplace")}
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
                type="text"
                {...form.getInputProps("guarantor_name")}
              />

              <TextInput
                required
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
                required
                label="Phone Number"
                placeholder="Guarantor number"
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
