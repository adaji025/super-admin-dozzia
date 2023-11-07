import { useState, Fragment } from "react";
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
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";

import { objectToFormData } from "../../lib/util";
import "./onboarding.scss";
import { AddSchoolData } from "../../types/schoolTypes";
import { onboardSchool } from "../../services/shcool/school";
import UploadComponent from "../../components/Upload/Upload";

const OnboardSchool = () => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { dark } = useTheme();

  const { handleError } = useNotification();

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
      staff_email: "",
      phone_number: "",
      school_logo: null,
    },
  });

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
      email: form.values.staff_email,
      gender: form.values.gender,
      phone_number: form.values.phone_number,
    },
    school_logo: file,
  };

  const submit = (values: any) => {
    setLoading(true);
    onboardSchool(values)
      .then(() => {
        showNotification({
          title: "Success",
          message: "School added successfully 🤗",
          color: "green",
        });
        form.reset();
        setFile(null);
      })
      .catch((err) => {
        handleError(err);
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
                    onSubmit={form.onSubmit(() =>
                      submit(objectToFormData({ ...data }))
                    )}
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

                    <div className="form-row two-col">
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
                        placeholder="Principal’s last name"
                        type="text"
                        {...form.getInputProps("last_name")}
                      />
                    </div>

                    <div className="form-row">
                      <TextInput
                        className="form-item"
                        label="Principal’s middle Name"
                        placeholder="Principal’s middle name"
                        type="text"
                        {...form.getInputProps("middle_name")}
                      />
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

                      <TextInput
                        className="form-item"
                        required
                        label="Pricipal Email"
                        placeholder="Pricipal email"
                        type="email"
                        {...form.getInputProps("staff_email")}
                      />
                    </div>
                    <div className="form-row one-col">
                      <Select
                        className="form-item"
                        required
                        label="Gender"
                        placeholder="Choose gender"
                        data={[
                          { value: "Male", label: "Male 🧑" },
                          { value: "Female", label: "Female 👱‍♀️" },
                        ]}
                        {...form.getInputProps("gender")}
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

                        <UploadComponent
                          text={file ? file?.name : "Upload Image"}
                          accept={["image/jpeg", "image/png", "image/jpg"]}
                          extraClasses={`${file ? "file-selected" : ""}`}
                          setFile={setFile}
                        />
                      </div>
                    </div>

                    <Group position="apart" mt="xl">
                      <Button
                        size="md"
                        type="submit"
                        color="dark"
                        loading={loading}
                      >
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
