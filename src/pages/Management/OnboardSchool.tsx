import { useState, useEffect, Fragment } from "react";
import { AxiosError } from "axios";
import {
  Button,
  Group,
  TextInput,
  Box,
  Select,
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

import { AddStudentData } from "../../types/studentTypes";
import { objectToFormData } from "../../lib/util";
import { ClassroomType } from "../../types/classTypes";
import "./onboarding.scss";

const OnboardSchool = () => {
  const { dark } = useTheme();
  const [formData, setFormData] = useLocalStorage<any>({
    key: "onboardStudent",
    defaultValue: {},
  });
  const [file, setFile] = useState<any>(
    formData?.image ? formData?.image : undefined
  );
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const { getClassList, allClasses } = useClass();

  useEffect(() => {
    getClassList(1, 200, "", "", true);

    //eslint-disable-next-line
  }, []);

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
        <title>Onboard School</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Onboard Student" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <LoadingOverlay visible={loading} />

      <div className="page-container">
        <PageHeader
          title="Onboard School"
          desc="Provide the details below to onboard a new school"
        />

        <div
          className="page-main"
          style={{
            background: dark ? "#1a1b1e" : "#ffffff",
            borderBottom: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
          }}
        >
          <div className="pm-inner-wrapper">
            <div className="onboard-group">
              <div className="form">
                <Box>
                  <form
                    onSubmit={form.onSubmit((values) => console.log(values))}
                  >
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
                        label="Scool Name"
                        placeholder="Enter school name"
                        type="text"
                        {...form.getInputProps("first_name")}
                      />

                      <TextInput
                        className="form-item"
                        required
                        label="School Address"
                        placeholder="Enter school address"
                        type="text"
                        {...form.getInputProps("last_name")}
                      />

                      <TextInput
                        className="form-item"
                        required
                        label="School Website"
                        placeholder="Enter school website"
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
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
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
                              "guardian_phone_number",
                              e.target.value
                            );
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OnboardSchool;
