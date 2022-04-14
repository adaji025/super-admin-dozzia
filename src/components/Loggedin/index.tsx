import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Paper } from "@mantine/core";
import useTheme from "../../hooks/useTheme";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import OnboardStudent from "../../pages/Administration/OnboardStudent";
import OnboardStaff from "../../pages/Administration/OnboardStaff";
import Settings from "../../pages/Settings/Settings";
import Classes from "../../pages/Classes/Classes";
import ClassesInfo from "../../pages/Classes/ClassInfo";
import Subjects from "../../pages/Subjects/Subjects";

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
            <Route path="/classes/:id" element={<ClassesInfo />} />
            <Route path="/subjects" element={<Subjects />} />
          </Routes>
        </div>
      </div>
    </Paper>
  );
};

export default LoggedinContainer;
