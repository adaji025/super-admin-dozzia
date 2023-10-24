import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import {
  PasswordInput,
  TextInput,
  Button,
  Group,
  Box,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Logo from "../../assets/svg/dozzia-dark.svg";

import "./auth.scss";
import { useMediaQuery } from "@mantine/hooks";

const ResetPassword = () => {
  const small = useMediaQuery("(max-width: 450px)");
  const ExSmall = useMediaQuery("(max-width: 370px)");
  const [isNewUser] = useState<boolean>(false);
  const [showLoader] = useState<boolean>(false);

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
              <form>
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
