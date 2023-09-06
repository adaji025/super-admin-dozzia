import { useEffect, useState } from "react";
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
import RecycleBin from "../../pages/RecycleBin/RecycleBin";
import TermsSessions from "../../pages/TermsSessions/TermsSessions";
import Grades from "../../pages/Grades/Grades";
import ClassWall from "../../pages/ClassWall/ClassWall";
import AcdemicLog from "../../pages/ClassWall/AcdemicLog";
import BehaviouralLog from "../../pages/ClassWall/BehaviouralLog";
import TestExam from "../../pages/ClassWall/TestExam";
import StudyResources from "../../pages/ClassWall/StudyResources";
import ClassEvents from "../../pages/ClassWall/ClassEvents";
import Curriculum from "../../pages/ClassWall/Curriculum";
import Wallet from "../../pages/Wallet/Wallet";
import Bus from "../../pages/SchoolBuses/SchoolBuses";
import TrackVehicle from "../../pages/SchoolBuses/TrackVehicle";
import ViewStudents from "../../pages/SchoolBuses/ViewStudents";
import PromotionRequest from "../../pages/PromotionRequest/PromotionRequest";
import TeacherDashboard from "../../pages/Dashboard/TeacherDashboard";
import { Roles } from "../../types/authTypes";
import { useSelector } from "react-redux";
import { UserState } from "../../redux/user/user.reducer";
import BillDetails from "../../pages/Wallet/BillDetails";
import useTermsSessions from "../../hooks/useTermsSessions";
import "./index.scss";

const LoggedinContainer = () => {
  const { dark } = useTheme();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const userdata = useSelector((state: { user: UserState }) => {
    return state.user.userdata;
  });
  const { handleGetSessions } = useTermsSessions();

  useEffect(() => {
    handleGetSessions();
    //eslint-disable-next-line
  }, []);

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
            <Route
              path="/dashboard"
              element={
                userdata?.role?.name === Roles.Teacher ? (
                  <TeacherDashboard />
                ) : (
                  <Dashboard />
                )
              }
            />{" "}
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
            <Route path="/grades" element={<Grades />} />
            <Route path="/recycle-bin" element={<RecycleBin />} />
            <Route path="/terms-sessions" element={<TermsSessions />} />
            <Route path="/class-wall" element={<ClassWall />} />
            <Route path="/class-wall/academic-log" element={<AcdemicLog />} />
            <Route
              path="/class-wall/behavioral-log"
              element={<BehaviouralLog />}
            />
            <Route path="/class-wall/test-exam" element={<TestExam />} />
            <Route
              path="/class-wall/study-resources"
              element={<StudyResources />}
            />
            <Route path="/class-wall/class-events" element={<ClassEvents />} />
            <Route path="/class-wall/curriculum" element={<Curriculum />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/school-buses" element={<Bus />} />
            <Route
              path="/school-buses/track-vehicle"
              element={<TrackVehicle />}
            />
            <Route path="/school-buses/students" element={<ViewStudents />} />
            <Route path="/promotion-request" element={<PromotionRequest />} />
            <Route path="/wallet/bill/:billId" element={<BillDetails />} />
          </Routes>
        </div>
      </div>
    </Paper>
  );
};

export default LoggedinContainer;
