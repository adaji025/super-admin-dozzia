import { useState, Fragment } from "react";
import {
  Stepper,
  Button,
  Group,
  useMantineColorScheme,
  TextInput,
  Box,
  Select,
  NumberInput,
} from "@mantine/core";
import { Helmet } from "react-helmet";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone";
import "./administration.scss";

const OnboardStudent = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [active, setActive] = useState<number>(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
        <div
          className="page-info"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
            color: dark ? "white" : "#4e4e4e",
          }}
        >
          <div className="page-title">Onboard Student 🧑‍🎓</div>
          <div
            className="page-desc"
            style={{
              color: dark ? "#a6a7ab" : "#868e96",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>

        <div
          className="page-main"
          style={{
            background: dark ? "#1a1b1e" : "#ffffff",
          }}
        >
          <div className="pm-inner-wrapper">
            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
              <Stepper.Step label="Personal Info" description="First step">
                <PersonalInfo {...{ active, nextStep, prevStep }} />
              </Stepper.Step>

              <Stepper.Step label="Health History" description="Second step">
                Step 2 content: Verify email
              </Stepper.Step>

              <Stepper.Step label="Academic History" description="Final step">
                Step 3 content: Get full access
              </Stepper.Step>

              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
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

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const onSave = (values: any) => {
    console.log(values);

    nextStep();
  };

  return (
    <div className="onboard-group">
      <div className="form">
        <Box sx={{ maxWidth: 900 }}>
          <form onSubmit={form.onSubmit((values) => onSave(values))}>
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
                required
                label="Middle Name"
                placeholder="Middle name"
                type="text"
                {...form.getInputProps("middle_name")}
              />

              <DatePicker
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
              <NumberInput
                className="form-item"
                required
                label="Guardian’s Phone Number"
                placeholder="Guardian’s phone number"
                {...form.getInputProps("guardian_phone_number")}
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

            <div className="form-row">
              <div className="form-item">
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

            <Group position="left" mt={50}>
              <Button variant="default" onClick={prevStep} disabled={!active}>
                Previous
              </Button>
              <Button type="submit">
                {active === 2 ? "Submit" : "Save & Continue"}
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default OnboardStudent;
