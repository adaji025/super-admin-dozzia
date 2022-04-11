import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Text } from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import useTheme from "../../hooks/useTheme";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Speakerphone,
  ThumbDown,
  Settings,
  Logout,
  ChevronDown,
  X,
} from "tabler-icons-react";
import { ReactComponent as SchoolLogo } from "../../assets/svg/school-logo.svg";

interface SidebarProps {
  toggleSidebar: () => void;
  showSidebar: boolean;
}

const Sidebar = ({ toggleSidebar, showSidebar }: SidebarProps) => {
  const { dark } = useTheme();
  const [showChildren, setShowChildren] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schoolName = useSelector((state: any) => {
    return state.user.userdata?.profile_details?.school_name;
  });

  const routes = [
    {
      icon: LayoutDashboard,
      name: "General Overview",
      route: "/dashboard",
    },
    {
      icon: Briefcase,
      name: "Management",
      route: "/management",
      key: ["/students", "/staff", "/subjects", "/class"],
      children: [
        {
          name: "Students",
          route: "/students",
        },
        {
          name: "Staff",
          route: "/staff",
        },
        {
          name: "Classes",
          route: "/classes",
        },
        {
          name: "Events",
          route: "/events",
        },
        {
          name: "Subjects",
          route: "/subjects",
        },
      ],
    },
    {
      icon: Users,
      name: "Administration",
      route: "/administration",
      key: [
        "/add-ubject",
        "/add-class",
        "/student-onboarding",
        "/staff-onboarding",
        "/create-events",
        "/attendance",
        "/recycle-bin",
      ],
      children: [
        {
          name: "Add Student",
          route: "/add-student",
        },
        {
          name: "Add Staff",
          route: "/add-staff",
        },
        {
          name: "Attendance",
          route: "/attendance",
        },
        {
          name: "Recycle Bin",
          route: "/recycle-bin",
        },
      ],
    },
    {
      icon: Speakerphone,
      name: "Broadcast",
      route: "/broadcast",
    },
    {
      icon: ThumbDown,
      name: "Reports & Complaints",
      route: "/reports",
    },
    {
      icon: Settings,
      name: "Settings",
      route: "/settings",
    },
  ];

  return (
    <div
      className={`sidebar-container no-select ${
        dark ? "dark-card-bg" : "light-card-bg"
      } ${!showSidebar ? "is-hidden" : ""}`}
      style={{
        borderRight: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
      }}
    >
      <X className="close-icon click" size={29} onClick={toggleSidebar} />

      <div className="sidebar-inner">
        <div
          className="school-info"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
          }}
        >
          <div className="school-info-inner">
            <div className="school-logo-wrapper">
              <SchoolLogo className="school-logo" />
            </div>

            <Text
              className="school-name"
              style={{
                color: dark ? "#b0b0b0" : "black",
              }}
            >
              {schoolName ? schoolName : ""}
            </Text>
          </div>
        </div>

        <div
          className="nav-links"
          style={{
            color: dark ? "#b0b0b0" : "black",
          }}
        >
          {routes.map((item) => (
            <Fragment key={item.name}>
              {item.children ? (
                <>
                  <div
                    className={`nav-item ${
                      item.key.includes(location.pathname) &&
                      showChildren !== item.name
                        ? "is-active"
                        : ""
                    } ${dark ? "h-dark" : "h-light"}`}
                    key={item.name}
                    onClick={() => {
                      if (showChildren === item.name) {
                        setShowChildren("");
                      } else {
                        setShowChildren(item.name);
                      }
                    }}
                  >
                    <span>
                      <item.icon
                        color={
                          item.key.includes(location.pathname) &&
                          showChildren !== item.name
                            ? "#33cc33"
                            : dark
                            ? "#b0b0b0"
                            : "#5e5e5e"
                        }
                        size={25}
                        strokeWidth={1.3}
                        className="nav-icon"
                      />
                    </span>

                    <Text sx={{ fontSize: "14px" }}>{item.name}</Text>

                    <ChevronDown
                      color={
                        item.key.includes(location.pathname) &&
                        showChildren !== item.name
                          ? "#33cc33"
                          : dark
                          ? "#b0b0b0"
                          : "#5e5e5e"
                      }
                      className={`arrow-down ${
                        showChildren === item.name ? "rotate" : ""
                      }`}
                      size={18}
                    />
                  </div>

                  {showChildren === item.name &&
                    item.children.map((child) => (
                      <NavLink
                        key={child.name}
                        className={({ isActive }) =>
                          [
                            "nav-item",
                            "child",
                            dark ? "h-dark" : "h-light",
                            isActive ? "is-active" : null,
                          ]
                            .filter(Boolean)
                            .join(" ")
                        }
                        to={child.route}
                        onClick={toggleSidebar}
                      >
                        <Text sx={{ fontSize: "14px" }}>{child.name}</Text>
                      </NavLink>
                    ))}
                </>
              ) : (
                <NavLink
                  key={item.name}
                  className={({ isActive }) =>
                    [
                      "nav-item",
                      dark ? "h-dark" : "h-light",
                      isActive ||
                      (item.route === "/dashboard" && location.pathname === "/")
                        ? "is-active"
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                  to={item.route}
                  onClick={toggleSidebar}
                >
                  <span>
                    <item.icon
                      color={
                        location.pathname.includes(item.route) ||
                        (item.route === "/dashboard" &&
                          location.pathname === "/")
                          ? "#33cc33"
                          : dark
                          ? "#b0b0b0"
                          : "#5e5e5e"
                      }
                      size={25}
                      strokeWidth={1.3}
                      className="nav-icon"
                    />
                  </span>

                  <Text sx={{ fontSize: "14px" }}>{item.name}</Text>
                </NavLink>
              )}
            </Fragment>
          ))}

          <div
            className={`nav-item ${dark ? "h-dark" : "h-light"}`}
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              showNotification({
                title: "User logged out",
                message: `${"Sign in to continue "} 😑`,
                color: "yellow",
              });
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            <span>
              <Logout
                color={dark ? "#b0b0b0" : "#5e5e5e"}
                size={25}
                strokeWidth={1.3}
                className="nav-icon"
              />
            </span>
            <Text sx={{ fontSize: "14px" }}>Logout</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
