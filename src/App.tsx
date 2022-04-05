import { Routes, Route } from "react-router-dom";
import {
  ColorSchemeProvider,
  MantineProvider,
  Paper,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import Signin from "./pages/Auth/Signin";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import LoggedinContainer from "./components/Loggedin";
import "./App.scss";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });

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
          <NotificationsProvider position="top-right" zIndex={2077}>
            <Paper
              style={{
                borderRadius: "0px",
                background: colorScheme === "dark" ? "#121212" : "#E5E5E5",
                color: colorScheme === "dark" ? "white" : "black",
              }}
            >
              <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/*"
                  element={
                    localStorage.getItem("token") ? (
                      <LoggedinContainer />
                    ) : (
                      <Signin />
                    )
                  }
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
