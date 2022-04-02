import { Routes, Route } from "react-router-dom";
import {
  ColorSchemeProvider,
  MantineProvider,
  Paper,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import Signin from "./pages/Auth/Signin";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import "./App.scss";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
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
          <Paper
            style={{
              borderRadius: "0px",
              background: colorScheme === "dark" ? "#121212" : "#ffffff",
              color: colorScheme === "dark" ? "white" : "black",
            }}
          >
            <Routes>
              <Route path="/" element={<Signin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
