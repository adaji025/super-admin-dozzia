import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Typewriter from "typewriter-effect";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Lock, User } from "tabler-icons-react";

import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { login } from "../../services/auth/auth";
import { setUserData } from "../../redux/user/user.actions";
import "./auth.scss";
import useNotification from "../../hooks/useNotification";
import useTheme from "../../hooks/useTheme";

const Signin = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      password: "",
    },
  });

  const submit = (values: { username: string; password: string }) => {
    setShowLoader(true);

    login(values.username, values.password)
      .then((res) => {
        if (res.required_new_password) {
          showNotification({
            title: "Password reset required!",
            message: `${"This is a one-time step."} 🥲`,
            color: "yellow",
          });

          localStorage.setItem("reset_code", res?.reset_code);
          navigate("/reset-password?new=true");
        } else {
          showNotification({
            title: "Success",
            message: `${"Login successful."} 😎`,
            color: "green",
          });

          localStorage.setItem("token", res?.access_token);
          dispatch(setUserData(res.user));
          navigate("/dashboard");
        }
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
            <div className="form-title">Admin</div>

            <div className="form">
              <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => submit(values))}>
                  <TextInput
                    required
                    label="Username"
                    placeholder="Username"
                    variant="filled"
                    type="text"
                    icon={<User size={16} />}
                    {...form.getInputProps("username")}
                  />

                  <PasswordInput
                    required
                    mt="sm"
                    label="Password"
                    placeholder="Password"
                    variant="filled"
                    icon={<Lock size={16} />}
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
