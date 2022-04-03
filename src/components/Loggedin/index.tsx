import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paper, useMantineColorScheme } from "@mantine/core";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";

import "./index.scss";

const LoggedinContainer = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Paper
      style={{
        borderRadius: "0px",
        background: colorScheme === "dark" ? "#121212" : "#E5E5E5",
        color: colorScheme === "dark" ? "white" : "black",
      }}
      className="loggedin-container"
    >
      <Sidebar />

      <div className="logged-m21">
        <Header />

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
