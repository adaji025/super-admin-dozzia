import { Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  TextInput,
  Button,
  Group,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./auth.scss";

const ForgotPassword = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <Fragment>
      <Helmet>
        <title>Forgot Password | Dozzia Systems</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Forgot Password | Dozzia Systems" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <div className="auth-page">
        <AuthHeader />

        <div className="auth-main center">
          <div
            className={`a-m-right ${dark ? "dark-card-bg" : "light-card-bg"}`}
          >
            <div className="form-title">Reset Password</div>

            <div className="form-desc">
              Enter your registered email address to get a password reset link
              from Dozzia
            </div>

            <div className="form">
              <Box sx={{ maxWidth: 340 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    required
                    label="Email Address"
                    placeholder="Email"
                    {...form.getInputProps("email")}
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

export default ForgotPassword;
