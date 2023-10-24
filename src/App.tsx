import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, } from "react-redux";
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

import "./App.scss";

function App() {
  
  const showLoader = useSelector((state: any) => {
    return state.utility.showLoader;
  });

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });

  const loggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (loggedIn) {
    }
    //eslint-disable-next-line
  }, []);

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
