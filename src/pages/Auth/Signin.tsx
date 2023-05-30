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
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { login } from "../../services/auth/auth";
import { setUserData } from "../../redux/user/user.actions";
import useNotification from "../../hooks/useNotification";
import { useMediaQuery } from "@mantine/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import { CardOne, CardThree, CardTwo } from "../../components/Auth/AuthCards";
import "./auth.scss";
import AuthHeader from "../../components/AuthHeader/AuthHeader";

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
        <AuthHeader />

        <div className="auth-main">
          <div className={`a-m-left`}>
            <Box
              className="left-container"
              sx={
                ExSmall
                  ? { width: "" }
                  : small
                  ? { width: 350 }
                  : { width: 389 }
              }
              mx="auto"
            >
              <div className="form-title">Sign In</div>
              <div className="form-desc">
                Please enter your login details below
              </div>

              <div className="form">
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
              </div>
            </Box>
          </div>

          <div className="a-m-right">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="mySwiper"
            >
              <SwiperSlide>
                <CardOne />
              </SwiperSlide>
              <SwiperSlide>
                <CardTwo />
              </SwiperSlide>
              <SwiperSlide>
                <CardThree />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;
