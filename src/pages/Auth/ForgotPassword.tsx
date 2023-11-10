import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, Button, Group, Box, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Logo from "../../assets/svg/dozzia-dark.svg";
import { forgotPassword } from "../../services/auth/auth";
import useNotification from "../../hooks/useNotification";
import { ArrowLeft } from "tabler-icons-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Forgot Password");
  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      username: "",
    },
  });

  const submit = (values: { username: string }) => {
    setShowLoader(true);

    forgotPassword(values.username)
      .then(() => {
        showNotification({
          title: "Reset code sent.",
          message: `${"Check your inbox or spam for request code"} 👀`,
          color: "green",
        });
        setMessage("Check email for reset link");
        form.reset();
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
        <LoadingOverlay visible={showLoader} />

        <div className={`forgot-password`}>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>

          <div className="form">
            <div className="form-title">{message}</div>
            <Box sx={{ maxWidth: 428 }} mx="auto" mt={20}>
              <form onSubmit={form.onSubmit((values) => submit(values))}>
                <TextInput
                  required
                  label="Email or Username"
                  placeholder="Enter your username"
                  size="md"
                  radius="md"
                  {...form.getInputProps("username")}
                />

                <Group position="center" mt={42}>
                  <Button fullWidth type="submit" color="dark" size="md">
                    Send password reset link
                  </Button>
                </Group>

                <Group position="center" mt={30}>
                  <Link to="/sign-in">
                    <Group position="center" align="center" spacing={8}>
                      <ArrowLeft size={16} color={"black"} /> back to sign in
                    </Group>
                  </Link>
                </Group>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
