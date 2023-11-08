import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Group,
  Select,
  TextInput,
  LoadingOverlay,
  Divider,
  Box,
} from "@mantine/core";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useForm } from "@mantine/form";
import useNotification from "../../hooks/useNotification";
import "./onboard.scss";
import { showNotification } from "@mantine/notifications";
import { onboardStudent } from "../../services/student/student";
import useClass from "../../hooks/useClass";
import { ClassroomType } from "../../types/classTypes";
import { DatePicker } from "@mantine/dates";
import moment from "moment";

const OnboardStudent = () => {
  const [loading, setLoading] = useState(false);
  const { allClasses, getClassList } = useClass();

  const { handleError } = useNotification();

  useEffect(() => {
    getClassList(1, 200, "", "", true);
    // eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      classroom_id: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      gender: "",
      picture: null,
      dob: "",

      email: "",
      g_first_name: "",
      g_last_name: "",
      phone_number: "",
      title: "",
    },
  });

  const data = {
    extra: {
      classroom_id: form.values.classroom_id,
    },
    profile: {
      first_name: form.values.first_name,
      last_name: form.values.last_name,
      middle_name: form.values.middle_name,
      gender: form.values.gender,
      dob: moment(form.values.dob).format("YYYY-MM-DD"),
    },
    guardian: {
      title: form.values.title,
      phone_number: form.values.phone_number,
      email: form.values.email,
      first_name: form.values.g_first_name,
      last_name: form.values.g_last_name,
    },
  };

  const submit = () => {
    setLoading(true);

    onboardStudent(data)
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
            <div className="form-row"></div>

            <div className="form-row">
              <Select
                mb={24}
                required
                label="Class of Entry"
                placeholder="Select class"
                searchable
                className="form-item"
                nothingFound="No class found"
                data={allClasses.map((item: ClassroomType) => ({
                  key: item?.classroom_id,
                  value: item.classroom_id,
                  label: `${item.name} ${item.level} ${item.type}`,
                }))}
                {...form.getInputProps("classroom_id")}
              />

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

              <DatePicker
                className="form-item"
                required
                label="Date of birth"
                placeholder="Date of birth"
                {...form.getInputProps("dob")}
              />
            </div>

            <Box>
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
                  {...form.getInputProps("g_first_name")}
                />

                <TextInput
                  className="form-item"
                  required
                  label="Last Name"
                  placeholder="Last name"
                  type="text"
                  {...form.getInputProps("g_last_name")}
                />
              </div>

              <div className="form-row two-col">
                <TextInput
                  className="form-item"
                  label="Guardian Phone Number"
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
                  label="Guardian email address"
                  placeholder="Enter email address"
                  type="email"
                  {...form.getInputProps("email")}
                />
              </div>
            </Box>

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
