import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  TextInput,
  Button,
  Group,
  Box,
  useMantineColorScheme,
  LoadingOverlay,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import queryString from "query-string";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { resetPassword } from "../../services/auth/auth";

import "./auth.scss";

const ResetPassword = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const location: any = useLocation();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [resetCode, setResetCode] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }

    let parseddata: any = queryString.parse(location.search);

    if (parseddata.new) {
      const code: string = localStorage.getItem("reset_code")!;
      setResetCode(code.toString());
      setIsNewUser(true);
    }
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
      reset_code: "",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const submit = (values: {
    password: string;
    confirmPassword: string;
    reset_code: string;
  }) => {
    setShowLoader(true);

    const reset_code = isNewUser ? resetCode : values.reset_code;

    resetPassword(reset_code, values.password, values.confirmPassword)
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Password reset successful. Login to contine."} 😊`,
          color: "green",
        });
        localStorage.removeItem("reset_code");
        navigate("/signin");
      })
      .catch((error) => {
        showNotification({
          title: "Error",
          message: `${
            error?.response?.data?.message ??
            "Password reset failed, please try again"
          } 🤥`,
          color: "red",
        });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

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
        <LoadingOverlay visible={showLoader} />

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
                <form onSubmit={form.onSubmit((values) => submit(values))}>
                  {!isNewUser && (
                    <TextInput
                      required
                      label="Reset code"
                      placeholder="Reset code"
                      {...form.getInputProps("reset_code")}
                    />
                  )}

                  <PasswordInput
                    required
                    mt="sm"
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
