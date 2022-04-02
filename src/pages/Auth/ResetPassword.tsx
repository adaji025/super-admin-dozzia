import { Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  PasswordInput,
  Button,
  Group,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./auth.scss";

const ResetPassword = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <Fragment>
      <Helmet>
        <title>Create New Password | Dozzia Systems</title>
        <meta name="description" content="" />
        <meta
          property="og:title"
          content="Create New Password | Dozzia Systems"
        />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <div className="auth-page">
        <AuthHeader />

        <div className="auth-main center">
          <div
            className={`a-m-right ${dark ? "dark-card-bg" : "light-card-bg"}`}
          >
            <div className="form-title">Create New Password</div>

            <div className="form-desc">
              Enter your new preferred password. Password must be at least 6
              characters.
            </div>

            <div className="form">
              <Box sx={{ maxWidth: 340 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <PasswordInput
                    required
                    label="New password"
                    placeholder="Password"
                    {...form.getInputProps("password")}
                  />

                  <PasswordInput
                    required
                    mt="sm"
                    label="Confirm new password"
                    placeholder="Confirm password"
                    {...form.getInputProps("confirmPassword")}
                  />

                  <Group position="center" mt="lg">
                    <Button fullWidth type="submit">
                      Submit
                    </Button>
                  </Group>
                </form>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
