import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";

const LoggedinContainer = () => {
  return (
    <div className="loggedin-container">
      <div className="loggedin-wrapper">
        <Header />

        <div className="logged-m21">
          <Sidebar />
          <div className="main-section">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedinContainer;
