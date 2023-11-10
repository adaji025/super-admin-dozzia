import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Group,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import queryString from "query-string";
import Logo from "../../assets/svg/dozzia-dark.svg";

import { verifyAccount } from "../../services/auth/auth";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";
import "./auth.scss";

const VerifyAccount = () => {
  const { dark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [resetCode, setResetCode] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { handleError } = useNotification();

  useEffect(() => {
    let parseddata = queryString.parse(location.search);

    if (parseddata.token) {
      const token: string = parseddata.token.toString();
      setResetCode(token);
    }
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const submit = (values: { password: string; confirmPassword: string }) => {
    setShowLoader(true);

    verifyAccount(resetCode, values.password)
      .then(() => {
        showNotification({
          title: "Success",
          message: `Password reset successful. Login to contine. 😊`,
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

        <div className={`forgot-password`}>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>

          <div className={`form ${dark ? "dark-card-bg" : "light-card-bg"}`}>
            <div className="form-title">Create New Password</div>
            <Box sx={{ maxWidth: 428 }} mx="auto" mt={20}>
              <form onSubmit={form.onSubmit((values) => submit(values))}>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyAccount;
