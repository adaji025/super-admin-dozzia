import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Divider,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { login, getProfileInfo } from "../../services/auth/auth";
import { setUserData } from "../../redux/user/user.actions";
import useNotification from "../../hooks/useNotification";
import { useMediaQuery } from "@mantine/hooks";
import { ProfileType, SigninResponse } from "../../types/authTypes";
import DozziaLogo from "../../assets/svg/dozzia-dark.svg";

import "./auth.scss";

const Signin = () => {
  const small = useMediaQuery("(max-width: 450px)");
  const ExSmall = useMediaQuery("(max-width: 370px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);

    login(values.username, values.password)
      .then((res: SigninResponse) => {
        if (res.required_new_password && res.reset_code) {
          showNotification({
            title: "Password reset required!",
            message: `${"This is a one-time step."} 🥲`,
            color: "yellow",
          });

          navigate(`/reset-password?code=${res?.reset_code}`);
        } else {
          getProfile(res.access_token);
        }
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
      });
  };

  const getProfile = (token: string) => {
    setLoading(true);

    getProfileInfo(token, "role")
      .then((res: ProfileType) => {
        showNotification({
          title: "Success",
          message: `${"Login successful."} 😎`,
          color: "green",
        });

        dispatch(setUserData(res));
        navigate("/dashboard");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
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
        <Group pt={80} position="center">
          <img src={DozziaLogo} alt="dozzia" />
        </Group>
        <div className="auth-main">
          <Box
            sx={
              ExSmall ? { width: "", paddingInline: 8,  } : small ? { width: 300 } : { width: 389 }
            }
            mx="auto"
          >
            <Box>
              <Text className="form-title">Sign In</Text>
              <Text className="form-desc">
                Please enter your login details below
              </Text>
            </Box>
            <Divider my={24} />
            <Box sx={{ maxWidth: 420 }}>
              <form onSubmit={form.onSubmit((values) => submit(values))}>
                <TextInput
                  className="input-field"
                  required
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  radius="md"
                  size="md"
                  disabled={loading}
                  {...form.getInputProps("username")}
                />

                <PasswordInput
                  required
                  mt="sm"
                  label="Password"
                  radius="md"
                  size="md"
                  placeholder="*************"
                  disabled={loading}
                  {...form.getInputProps("password")}
                />

                <Group position="right" mt="sm">
                  <Link to="/forgot-password">
                    <Text size="sm">Forgot Password</Text>
                  </Link>
                </Group>

                <Group position="center" mt="lg">
                  <Button
                    fullWidth
                    type="submit"
                    color="dark"
                    size="md"
                    loading={loading}
                  >
                    Sign in
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

export default Signin;
