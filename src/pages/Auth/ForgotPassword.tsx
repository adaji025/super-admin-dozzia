import { Fragment, } from "react";
import { Helmet } from "react-helmet";
import { Link, } from "react-router-dom";
import {
  TextInput,
  Button,
  Group,
  Box,
  Text,
} from "@mantine/core";
import Logo from "../../assets/svg/dozzia-dark.svg";
import { ArrowLeft } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";

const ForgotPassword = () => {
  const small = useMediaQuery("(max-width: 450px)");
  const ExSmall = useMediaQuery("(max-width: 370px)");


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
            <Text className="form-title">Forgot Password</Text>
            <Box sx={{ maxWidth: 428 }} mx="auto" mt={20}>
              <form>
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
