import { useState, Fragment } from "react";
import { Text, useMantineColorScheme } from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [showChildren, setShowChildren] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          name: "Subjects",
          route: "/subjects",
        },
        {
          name: "Class",
          route: "/class",
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
          name: "Add Subject",
          route: "/add-ubject",
        },
        {
          name: "Add Class",
          route: "/add-class",
        },
        {
          name: "Student Onboarding",
          route: "/student-onboarding",
        },
        {
          name: "Staff Onboarding",
          route: "/staff-onboarding",
        },
        {
          name: "Create Events",
          route: "/create-events",
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
    >
      <X className="close-icon click" size={25} onClick={toggleSidebar} />

      <div className="sidebar-inner">
        <SchoolLogo className="school-logo" />

        <Text className="school-name">Gracefield Highschool</Text>

        <div className="nav-links">
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
                    }`}
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
                            ? "white"
                            : "black"
                        }
                        size={25}
                        strokeWidth={1.3}
                        className="nav-icon"
                      />
                    </span>

                    <Text>{item.name}</Text>

                    <ChevronDown
                      color={
                        item.key.includes(location.pathname) &&
                        showChildren !== item.name
                          ? "#33cc33"
                          : dark
                          ? "white"
                          : "black"
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
                          ["nav-item", "child", isActive ? "is-active" : null]
                            .filter(Boolean)
                            .join(" ")
                        }
                        to={child.route}
                        onClick={toggleSidebar}
                      >
                        <Text>{child.name}</Text>
                      </NavLink>
                    ))}
                </>
              ) : (
                <NavLink
                  key={item.name}
                  className={({ isActive }) =>
                    [
                      "nav-item",
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
                          ? "white"
                          : "black"
                      }
                      size={25}
                      strokeWidth={1.3}
                      className="nav-icon"
                    />
                  </span>

                  <Text>{item.name}</Text>
                </NavLink>
              )}
            </Fragment>
          ))}

          <div
            className="nav-item"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "DESTROY_SESSION" });
              navigate("/signin");
            }}
          >
            <span>
              <Logout
                color={dark ? "white" : "black"}
                size={25}
                strokeWidth={1.3}
                className="nav-icon"
              />
            </span>
            <Text>Logout</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
