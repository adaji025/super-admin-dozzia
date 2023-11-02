import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Group,
  Select,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useForm } from "@mantine/form";
import { getStaffRoleList, onboardStaff } from "../../services/staff/staff";
import { ApiResponseType, StaffRoleType } from "../../types/utilityTypes";
import useNotification from "../../hooks/useNotification";
import { AxiosError } from "axios";
import "./onboard.scss";
import { showNotification } from "@mantine/notifications";
import { importStudent } from "../../services/student/student";

const OnboardStudent = () => {
  const [staffRoles, setStaffRoles] = useState<StaffRoleType[]>([]);
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotification();

  useEffect(() => {
    getStaffRoles();
    // eslint-disable-next-line
  }, []);

  const getStaffRoles = () => {
    getStaffRoleList()
      .then((res: ApiResponseType<StaffRoleType[]>) => {
        setStaffRoles(res.data);
      })
      .catch((err: AxiosError) => handleError(err));
  };
  const form = useForm({
    initialValues: {
      role_id: "",
      title: "",
      first_name: "",
      last_name: "",
      middle_name: null,
      gender: "",
      phone_number: "",
      email: "",
    },
  });

  const data = {
    extra: {
      role_id: form.values.role_id,
    },
    profile: {
      title: form.values.title,
      first_name: form.values.first_name,
      last_name: form.values.last_name,
      middle_name: form.values.middle_name,
      gender: form.values.gender,
      phone_number: form.values.phone_number,
      email: form.values.email,
    },
  };

  const submit = () => {
    setLoading(true);

    importStudent(data)
      .then(() => {
        showNotification({
          title: "Success",
          message: "Students onboaded successfully",
          color: "green",
        });
        form.reset();
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
        <title>Onboard Staff</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Onboard Staff" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <LoadingOverlay visible={loading} />
      <div className="page-container">
        <div className="page-main">
          <PageHeader
            title=" Add Student"
            desc="Let’s get to know your student 🤩"
          />
          <form className="onboard-group" onSubmit={form.onSubmit(submit)}>
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
            </div>
            <div className="form-row two-col">
              <TextInput
                className="form-item"
                label="Principal Phone Number"
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

              <TextInput
                className="form-item"
                required
                label="School email address"
                placeholder="Enter email address"
                type="text"
                {...form.getInputProps("email")}
              />
            </div>

            <Group position="right">
              <Button type="submit" color="dark">
                Submit
              </Button>
            </Group>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default OnboardStudent;
