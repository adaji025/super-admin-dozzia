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
import useNotification from "./hooks/useNotification";
import "./App.scss";
import { UserState } from "./redux/user/user.reducer";
import { ProfileType } from "./types/authTypes";
import VerifyAccount from "./pages/Auth/VerifyAccount";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: { user: UserState }) => {
    return state.user.loggedIn;
  });
  const showLoader = useSelector((state: any) => {
    return state.utility.showLoader;
  });
  const { handleError } = useNotification();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });

  useEffect(() => {
    if (loggedIn) {
      getProfile();
    }
    //eslint-disable-next-line
  }, []);

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const getProfile = () => {
    getProfileInfo()
      .then((res: ProfileType) => {
        dispatch(setUserData(res));
      })
      .catch((error) => {
        handleError(error);
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
            fontFamily: "Aeonik, sans-serif",
            defaultRadius: 8,
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
                background: colorScheme === "dark" ? "#121212" : "white",
                color: colorScheme === "dark" ? "white" : "black",
              }}
            >
              <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-account" element={<VerifyAccount />} />
                <Route
                  path="/*"
                  element={loggedIn ? <LoggedinContainer /> : <Signin />}
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
