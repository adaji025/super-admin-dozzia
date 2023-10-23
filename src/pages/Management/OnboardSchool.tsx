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
import { useForm } from "@mantine/form";
import { onboardStudent } from "../../services/student/student";
import useClass from "../../hooks/useClass";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";

import { objectToFormData } from "../../lib/util";
import "./onboarding.scss";
import { AddSchoolData } from "../../types/schoolTypes";
import { onboardSchool } from "../../services/shcool/school";

const OnboardSchool = () => {
  const { dark } = useTheme();

  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const { getClassList, allClasses } = useClass();

  const form = useForm({
    initialValues: {
      name: "",
      address: "",
      email: "",
      reg_no: "",
      code: "",

      title: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      gender: "",
      phone_number: "",
      staff_email: "",

      school_logo: null,
    },

    // validate: {
    //   name: (value) => (value === "" ? "Input name" : null),
    //   address: (value) => (value === "" ? "Input address" : null),
    //   gender: (value) => (value === "" ? "Select student gender" : null),
    //   title: (value) => (value === "" ? "Select principal title" : null),
    //   first_name: (value) =>
    //     value === "" ? "Input principal first name" : null,
    //   last_name: (value) => (value === "" ? "Input principa last name" : null),
    //   phone_number: (value) =>
    //     value.length !== 11 ? "Phone number must be 11 digits" : null,
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  let formData = new FormData();
  formData.append("name", form.values.email);
  formData.append("email", form.values.email);
  formData.append("address", form.values.address);
  formData.append("reg_no", form.values.reg_no);
  formData.append("code", form.values.code);
  formData.append("title", form.values.title);
  formData.append("first_name", form.values.first_name);
  formData.append("last_name", form.values.last_name);
  formData.append("middle_name", form.values.middle_name);
  formData.append("gender", form.values.gender);
  formData.append("phone_number", form.values.phone_number);
  formData.append("staff_email", form.values.staff_email);

  const data: AddSchoolData = {
    school_details: {
      name: form.values.name,
      address: form.values.address,
      email: form.values.email,
      reg_no: form.values.reg_no,
      code: form.values.code,
    },
    staff_details: {
      title: form.values.title,
      first_name: form.values.first_name,
      last_name: form.values.last_name,
      middle_name: form.values.middle_name,
      staff_email: form.values.staff_email,
      gender: form.values.gender,
      phone_number: form.values.phone_number,
    },
    school_logo: form.values.school_logo,
  };

  const submit = (values: any) => {
    onboardSchool(values);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Onboard School</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Onboard School" />
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
                    onSubmit={form.onSubmit(() => submit(data))}
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
                        {...form.getInputProps("name")}
                      />

                      <TextInput
                        className="form-item"
                        required
                        label="School Address"
                        placeholder="Enter school address"
                        type="text"
                        {...form.getInputProps("address")}
                      />

                      <TextInput
                        className="form-item"
                        required
                        label="School Code"
                        placeholder="Enter Code"
                        type="text"
                        {...form.getInputProps("code")}
                      />
                    </div>

                    <div className="form-row">
                      <TextInput
                        className="form-item"
                        required
                        label="Registeration Number"
                        placeholder="Enter school reg number"
                        type="text"
                        {...form.getInputProps("reg_no")}
                      />

                      <TextInput
                        className="form-item"
                        required
                        label="School email address"
                        placeholder="Enter email address"
                        type="text"
                        {...form.getInputProps("email")}
                      />
                    </div>

                    <Divider
                      mb="lg"
                      variant="dashed"
                      label="Principal/Admin Info"
                      labelPosition="center"
                    />

                    <div className="form-row">
                      <Select
                        className="form-item"
                        required
                        label="Principal Title"
                        placeholder="Principal Title"
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
                        label="Principal First Name"
                        placeholder="Guardian’s first name"
                        type="text"
                        {...form.getInputProps("first_name")}
                      />

                      <TextInput
                        className="form-item"
                        required
                        label="Principal’s Last Name"
                        placeholder="Guardian’s last name"
                        type="text"
                        {...form.getInputProps("last_name")}
                      />
                    </div>

                    <Box sx={{ maxWidth: 690 }}>
                      <div className="form-row">
                        <TextInput
                          required
                          className="form-item"
                          label="Principal Phone Number"
                          placeholder="Principal phone number"
                          type="tel"
                          value={form.values.phone_number}
                          onKeyDown={(e) =>
                            ["e", "E", "+", "-"].includes(e.key) &&
                            e.preventDefault()
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.value.length > 11) {
                              return;
                            }
                            if (
                              e.target.value === "" ||
                              /^[0-9\b]+$/.test(e.target.value)
                            ) {
                              form.setFieldValue(
                                "phone_number",
                                e.target.value
                              );
                            }
                          }}
                        />

                        <TextInput
                          className="form-item"
                          required
                          label="Pricipal Email"
                          placeholder="Pricipal email"
                          type="email"
                          {...form.getInputProps("staff_email")}
                        />
                      </div>
                    </Box>
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
                      </div>
                    </div>

                    <Group position="apart" mt="xl">
                      <Button size="md" type="submit" color="dark">
                        Submit
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
