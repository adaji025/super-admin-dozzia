import React from "react";
import { Text, useMantineColorScheme } from "@mantine/core";
import { NavLink } from "react-router-dom";

import {
  MdOutlineSpaceDashboard,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { CgToolbox } from "react-icons/cg";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaRegThumbsDown } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import { ReactComponent as SchoolLogo } from "../../assets/svg/school-logo.svg";

const Sidebar = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const routes = [
    {
      icon: MdOutlineSpaceDashboard,
      name: "General Overview",
      route: "/dashboard",
    },
    {
      icon: MdOutlineManageAccounts,
      name: "Management",
      route: "/management",
    },
    {
      icon: CgToolbox,
      name: "Administration",
      route: "/administration",
    },
    {
      icon: HiOutlineSpeakerphone,
      name: "Broadcast",
      route: "/broadcast",
    },
    {
      icon: FaRegThumbsDown,
      name: "Reports & Complaints",
      route: "/reports",
    },
    {
      icon: FiSettings,
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
                <item.icon size={22} className="nav-icon" />
              </span>
              <Text>{item.name}</Text>
            </NavLink>
          ))}

          <div className="nav-item">
            <span>
              <BiLogOut size={22} className="nav-icon" />
            </span>
            <Text>Logout</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
