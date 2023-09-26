import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Paper } from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { useSelector } from "react-redux";
import { UserState } from "../../redux/user/user.reducer";

import "./index.scss";
import Dashboard from "../../pages/Dashboard/Dashboard";
import OnboardStaff from "../../pages/Dashboard/Onboard/OnboardStaff";
import SchoolDetails from "../../pages/Dashboard/SchoolDetails";

const LoggedinContainer = () => {
  const { dark } = useTheme();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Paper
      style={{
        borderRadius: "0px",
        background: dark ? "#121212" : "#f8f9fa",
        color: dark ? "white" : "black",
      }}
      className="loggedin-container"
    >
      <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      <div className="logged-m21">
        <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

        <div className="main-section">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/management" element={<Dashboard />} />
            <Route path="/onboard-school" element={<OnboardStaff />} />
            <Route path="/onboard-staff" element={<OnboardStaff />} />
            <Route path="/onboard-student" element={<OnboardStaff />} />
            <Route path="/school-details/:id" element={<SchoolDetails />} />
          </Routes>
        </div>
      </div>
    </Paper>
  );
};

export default LoggedinContainer;
