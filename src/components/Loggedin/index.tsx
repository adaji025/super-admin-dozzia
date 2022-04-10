import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Paper } from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { getProfileInfo } from "../../services/auth/auth";
import { setUserData } from "../../redux/user/user.actions";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import OnboardStudent from "../../pages/Administration/OnboardStudent";
import OnboardStaff from "../../pages/Administration/OnboardStaff";
import Settings from "../../pages/Settings/Settings";
import "./index.scss";

const LoggedinContainer = () => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    getProfile();
    //eslint-disable-next-line
  }, []);

  const getProfile = () => {
    getProfileInfo().then((res) => {
      dispatch(setUserData(res.user));
    });
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
            <Route path="/student-onboarding" element={<OnboardStudent />} />
            <Route path="/staff-onboarding" element={<OnboardStaff />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Paper>
  );
};

export default LoggedinContainer;
