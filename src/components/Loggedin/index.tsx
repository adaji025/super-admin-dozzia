import {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Paper } from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import Header from "./Header";
import Sidebar from "./Sidebar";

import Management from "../../pages/Management/Management";
import OnboardStaff from "../../pages/Management/OnboardStaff";
import SchoolDetails from "../../pages/Management/SchoolDetails";
import "./index.scss";
import OnboardSchool from "../../pages/Management/OnboardSchool";
import OnboardStudent from "../../pages/Management/OnboardStudent";
import AdminManagement from "../../pages/AdminManagement/AdminManagement";

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
            <Route path="/" element={<Management />} />
            <Route path="/management" element={<Management />} />
            <Route path="/onboard-school" element={<OnboardSchool />} />
            <Route path="/onboard-staff" element={<OnboardStaff />} />
            <Route path="/onboard-student" element={<OnboardStudent />} />
            <Route path="/school-details/:id" element={<SchoolDetails />} />
            <Route path="/admin-management" element={<AdminManagement />} />
          </Routes>
        </div>
      </div>
    </Paper>
  );
};

export default LoggedinContainer;
