import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      username: "",
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
            <div className="form-title">Forgot Password</div>

            <div className="form-desc">
              Enter your username to get a password reset link from Dozzia
            </div>

            <div className="form">
              <Box sx={{ maxWidth: 340 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    required
                    label="Username"
                    placeholder="Username"
                    {...form.getInputProps("username")}
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
