import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Paper } from "@mantine/core";
import useTheme from "../../hooks/useTheme";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import OnboardStudent from "../../pages/Onboard/OnboardStudent";
import OnboardStaff from "../../pages/Onboard/OnboardStaff";
import Settings from "../../pages/Settings/Settings";
import Classes from "../../pages/Classes/Classes";
import Subjects from "../../pages/Subjects/Subjects";
import Students from "../../pages/Students/Students";
import Staff from "../../pages/Staff/Staff";
import Events from "../../pages/Events/Events";
import Broadcast from "../../pages/Broadcast/Broadcast";
import Attendance from "../../pages/Attendance/Attendance";
import ReportsComplaints from "../../pages/ReportsComplaints/ReportsComplaints";
import "./index.scss";

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
        <Header toggleSidebar={toggleSidebar} />

        <div className="main-section">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />{" "}
            <Route path="/add-student" element={<OnboardStudent />} />
            <Route path="/add-staff" element={<OnboardStaff />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/students" element={<Students />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/events" element={<Events />} />
            <Route path="/broadcast" element={<Broadcast />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/reports" element={<ReportsComplaints />} />
          </Routes>
        </div>
      </div>
    </Paper>
  );
};

export default LoggedinContainer;
