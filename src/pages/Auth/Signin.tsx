import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

import {
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  useMantineColorScheme,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
// import { ReactComponent as Ellipse } from "../../assets/svg/ellipse.svg";
import "./auth.scss";

const Signin = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });
  return (
    <Fragment>
      <Helmet>
        <title>Sign in | Dozzia Systems</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Sign in | Dozzia Systems" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <div className="auth-page">
        <LoadingOverlay visible={showLoader} />
        <AuthHeader />

        <div className="auth-main">
          <div className="a-m-left">
            <Text>
              Best way to <span className="green-text">effectively</span> manage
              your{" "}
              <span className="green-text">
                <Typewriter
                  options={{
                    strings: ["students", "teachers", "curriculum"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </Text>
          </div>

          <div
            className={`a-m-right ${dark ? "dark-card-bg" : "light-card-bg"}`}
          >
            {/* <Ellipse className="ellipse" /> */}
            <div className="form-title">Admin</div>

            <div className="form">
              <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <TextInput
                    required
                    label="Username"
                    placeholder="Username"
                    {...form.getInputProps("username")}
                  />

                  <PasswordInput
                    required
                    mt="sm"
                    label="Password"
                    placeholder="Password"
                    {...form.getInputProps("password")}
                  />

                  <Group position="right" mt="sm">
                    <Link to="/forgot-password">
                      <Text size="xs">Forgot Password</Text>
                    </Link>
                  </Group>

                  <Group position="center" mt="lg">
                    <Button fullWidth type="submit">
                      Sign in
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

export default Signin;
