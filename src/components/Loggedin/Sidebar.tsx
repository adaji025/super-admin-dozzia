import React from "react";
import { Text, useMantineColorScheme } from "@mantine/core";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  Speakerphone,
  ThumbDown,
  Settings,
  Logout,
} from "tabler-icons-react";

import { ReactComponent as SchoolLogo } from "../../assets/svg/school-logo.svg";

const Sidebar = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const location = useLocation();

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
    },
    {
      icon: Users,
      name: "Administration",
      route: "/administration",
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
      className={`sidebar-container ${dark ? "dark-card-bg" : "light-card-bg"}`}
    >
      <div className="sidebar-inner">
        <div className="school-logo">
          <SchoolLogo />
        </div>

        <Text className="school-name">Gracefield Highschool</Text>

        <div className="nav-links">
          {routes.map((item) => (
            <NavLink
              key={item.name}
              className={({ isActive }) =>
                ["nav-item", isActive ? "is-active" : null]
                  .filter(Boolean)
                  .join(" ")
              }
              to={item.route}
            >
              <span>
                <item.icon
                  color={
                    location.pathname.includes(item.route)
                      ? "#33cc33"
                      : dark
                      ? "white"
                      : "black"
                  }
                  size={25}
                  strokeWidth={1}
                  className="nav-icon"
                />
              </span>
              <Text>{item.name}</Text>
            </NavLink>
          ))}

          <div className="nav-item">
            <span>
              <Logout
                color={dark ? "white" : "black"}
                size={25}
                strokeWidth={1}
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
