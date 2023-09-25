import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Group,
  Box,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Logo from "../../assets/svg/dozzia-dark.svg";
import { forgotPassword } from "../../services/auth/auth";
import useNotification from "../../hooks/useNotification";
import { ArrowLeft } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";

const ForgotPassword = () => {
  const small = useMediaQuery("(max-width: 450px)");
  const ExSmall = useMediaQuery("(max-width: 370px)");
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
        <LoadingOverlay visible={showLoader} />

        <Group pt={80} position="center">
          <img src={Logo} alt="dozzia systems" />
        </Group>

        <div className="auth-main">
          <Box
            sx={
              ExSmall ? { width: "", paddingInline: 16 } : small ? { width: 300 } : { width: 389 }
            }
            mx="auto"
          >
            <Text className="form-title">Forgot Password</Text>
            <Box sx={{ maxWidth: 428 }} mx="auto" mt={20}>
              <form onSubmit={form.onSubmit((values) => submit(values))}>
                <TextInput
                  required
                  label="Username"
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
          </Box>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
