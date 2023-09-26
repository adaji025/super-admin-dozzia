import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  TextInput,
  Button,
  Group,
  Box,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import queryString from "query-string";
import Logo from "../../assets/svg/dozzia-dark.svg";

import { resetPassword } from "../../services/auth/auth";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import "./auth.scss";
import { useMediaQuery } from "@mantine/hooks";

const ResetPassword = () => {
  const small = useMediaQuery("(max-width: 450px)");
  const ExSmall = useMediaQuery("(max-width: 370px)");
  const location: any = useLocation();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [resetCode, setResetCode] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { handleError } = useNotification();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/management");
    }

    let parseddata: any = queryString.parse(location.search);

    if (parseddata.code) {
      const code: string = parseddata.code.toString();
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
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
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
        handleError(error);
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
        <LoadingOverlay visible={showLoader} />

        <Group pt={80} position="center">
          <img src={Logo} alt="dozzia systems" />
        </Group>

        <div className="auth-main">
          <Box
            sx={
              ExSmall
                ? { width: "", paddingInline: 16 }
                : small
                ? { width: 300 }
                : { width: 389 }
            }
            mx="auto"
          >
            <Text className="form-title">Create New Password</Text>
            <Box sx={{ maxWidth: 428 }} mx="auto" mt={20}>
              <form onSubmit={form.onSubmit((values) => submit(values))}>
                {!isNewUser && (
                  <TextInput
                    required
                    label="Reset code"
                    placeholder="Enter resent code"
                    size="md"
                    radius="md"
                    {...form.getInputProps("reset_code")}
                  />
                )}

                <PasswordInput
                  required
                  mt="sm"
                  label="New password"
                  placeholder="Enter new password"
                  size="md"
                  radius="md"
                  {...form.getInputProps("password")}
                />

                <PasswordInput
                  required
                  mt="sm"
                  label="Confirm new password"
                  placeholder="Confirm new password"
                  size="md"
                  radius="md"
                  {...form.getInputProps("confirmPassword")}
                />

                <Group position="center" mt={42}>
                  <Button fullWidth type="submit" color="dark" size="md">
                    Create new password
                  </Button>
                </Group>
              </form>
            </Box>
          </Box>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
