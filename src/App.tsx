import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ColorSchemeProvider,
  MantineProvider,
  Paper,
  ColorScheme,
  LoadingOverlay,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import Signin from "./pages/Auth/Signin";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import LoggedinContainer from "./components/Loggedin";

import { getProfileInfo } from "./services/auth/auth";
import { setUserData } from "./redux/user/user.actions";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });
  const showLoader = useSelector((state: any) => {
    return state.utility.showLoader;
  });

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });

  useEffect(() => {
    if (userdata) {
      getProfile();
    }
    //eslint-disable-next-line
  }, []);

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const getProfile = () => {
    getProfileInfo().then((res) => {
      dispatch(setUserData(res.user));
    });
  };

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            primaryColor: "green",
            fontFamily: "Inter, sans-serif",
            colors: {
              dark: [
                "#d5d7e0",
                "#acaebf",
                "#8c8fa3",
                "#666980",
                "#4d4f66",
                "#34354a",
                "#2b2c3d",
                "#1d1e30",
                "#121212",
                "#000000",
              ],
            },
          }}
        >
          <LoadingOverlay visible={showLoader} />
          <NotificationsProvider
            position="top-right"
            zIndex={2077}
            autoClose={3000}
          >
            <Paper
              style={{
                borderRadius: "0px",
                background: colorScheme === "dark" ? "#121212" : "#f8f9fa",
                color: colorScheme === "dark" ? "white" : "black",
              }}
            >
              <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/*"
                  element={userdata ? <LoggedinContainer /> : <Signin />}
                />
              </Routes>
            </Paper>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
