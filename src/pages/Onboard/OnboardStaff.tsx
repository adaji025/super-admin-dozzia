import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Select, TextInput } from "@mantine/core";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useForm } from "@mantine/form";
import { getStaffRoleList } from "../../services/staff/staff";
import { ApiResponseType, StaffRoleType } from "../../types/utilityTypes";
import useNotification from "../../hooks/useNotification";
import { AxiosError } from "axios";
import "./onboard.scss"

const OnboardStaff = () => {
  const [staffRoles, setStaffRoles] = useState<StaffRoleType[]>([]);
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
      gender: "",
    },
  });
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
        <div className="page-main">
          <PageHeader
            title=" Add Staff"
            desc="Let’s get to know your staff 🤩"
          />
          <div className="onboard-group">
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
                label="First Name"
                placeholder="First name"
                type="text"
                {...form.getInputProps("first_name")}
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
              <TextInput
                className="form-item"
                required
                label="First Name"
                placeholder="First name"
                type="text"
                {...form.getInputProps("first_name")}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OnboardStaff;
