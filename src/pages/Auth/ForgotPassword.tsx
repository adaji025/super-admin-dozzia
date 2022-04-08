import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Group,
  Box,
  useMantineColorScheme,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { User } from "tabler-icons-react";

import { forgotPassword } from "../../services/auth/auth";
import useNotification from "../../hooks/useNotification";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "./auth.scss";

const ForgotPassword = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { handleError } = useNotification();

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

  const submit = (values: { username: string }) => {
    setShowLoader(true);

    forgotPassword(values.username)
      .then((res) => {
        showNotification({
          title: "Reset code sent.",
          message: `${"Check your inbox or spam for request code"} 👀`,
          color: "green",
        });
        localStorage.removeItem("reset_code");
        navigate("/reset-password");
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
        <title>Forgot Password | Dozzia Systems</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Forgot Password | Dozzia Systems" />
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
            <div className="form-title">Forgot Password</div>

            <div className="form-desc">
              Enter your username to get a password reset link from Dozzia
            </div>

            <div className="form">
              <Box sx={{ maxWidth: 340 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => submit(values))}>
                  <TextInput
                    required
                    label="Username"
                    placeholder="Username"
                    type="text"
                    icon={<User size={16} />}
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
