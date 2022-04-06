import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Paper, useMantineColorScheme } from "@mantine/core";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";

import "./index.scss";

const LoggedinContainer = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Paper
      style={{
        borderRadius: "0px",
        background: dark ? "#121212" : "#f8f9fa",
        color: dark ? "white" : "#495057",
      }}
      className="loggedin-container"
    >
      <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      <div className="logged-m21">
        <Header toggleSidebar={toggleSidebar} />

        <div className="main-section">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Paper>
  );
};

export default LoggedinContainer;
