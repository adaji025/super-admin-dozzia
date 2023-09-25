import { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Burger, Text } from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import useTheme from "../../hooks/useTheme";
import { ChevronDown } from "tabler-icons-react";
import { ReactComponent as Administration } from "../../assets/svg/navigation/people.svg";
import { ReactComponent as Audit } from "../../assets/svg/navigation/archive-book.svg";
import { ReactComponent as Dashboard } from "../../assets/svg/navigation/dashboard.svg";
import { ReactComponent as Logout } from "../../assets/svg/navigation/logout.svg";
import { ReactComponent as Support } from "../../assets/svg/navigation/24-support.svg";
import { ReactComponent as Settings } from "../../assets/svg/navigation/setting.svg";

import { UserState } from "../../redux/user/user.reducer";

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

  const userdata = useSelector((state: { user: UserState }) => {
    return state.user.userdata;
  });

  const adminRoutes = [
    {
      icon: Dashboard,
      name: "Management",
      route: "/dashboard",
      key: ["onboard-school", "onboard-staff", "onboard-student"],
      children: [
        {
          name: "Onboard School",
          route: "/onboard-school",
        },
        {
          name: "Onboard Staff",
          route: "/onboard-staff",
        },
        {
          name: "Onboard Student",
          route: "/onboard-student",
        },
      ],
    },

    {
      icon: Administration,
      name: "Admin Management",
      route: "/admin-management",
    },
    {
      icon: Audit,
      name: "Audit Log",
      route: "/audit",
    },
    {
      icon: Support,
      name: "Help and support",
      route: "/supports",
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
        !dark ? "dark-card-bg" : "light-card-bg"
      } ${!showSidebar ? "is-hidden" : ""}`}
    >
      <Burger
        opened={showSidebar}
        onClick={toggleSidebar}
        title={showSidebar ? "Close navigation" : "Open navigation"}
        className="close-icon click"
        color="white"
      />

      <div className="sidebar-inner">
        <div className="school-info">
          <div className="school-info-inner">
            <div className="school-logo-wrapper">
              <img
                src={userdata.school.logo ?? ""}
                alt="school brand"
                className="school-logo"
                height={62}
                width={62}
              />
            </div>

            <Text
              className="school-name"
              style={{
                color: !dark ? "white" : "black",
              }}
            >
              {userdata.school.name}
            </Text>
          </div>
        </div>

        <div
          className="nav-links"
          style={{
            color: !dark ? "white" : "black",
          }}
        >
          {adminRoutes.map((item: any) => (
            <Fragment key={item.name}>
              {item.children ? (
                <>
                  <div
                    className={`nav-item ${
                      item.key.includes(location.pathname.split("/")[1]) &&
                      showChildren !== item.name
                        ? "is-active"
                        : ""
                    } ${!dark ? "h-dark" : "h-light"}`}
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
                      <item.icon className="nav-icon" />
                    </span>

                    <Text sx={{ fontSize: "14px" }}>{item.name}</Text>

                    <ChevronDown
                      color={
                        item.key.includes(location.pathname.split("/")[1]) &&
                        showChildren !== item.name
                          ? "#33cc33"
                          : !dark
                          ? "white"
                          : "#5e5e5e"
                      }
                      className={`arrow-down ${
                        showChildren === item.name ? "rotate" : ""
                      }`}
                      size={18}
                    />
                  </div>

                  {showChildren === item.name &&
                    item.children.map((child: any) => (
                      <NavLink
                        key={child.name}
                        className={({ isActive }) =>
                          [
                            "nav-item",
                            "child",
                            !dark ? "h-dark" : "h-light",
                            isActive ? "is-active" : null,
                            location.pathname.includes("/class-wall") &&
                            child.name === "Classes"
                              ? "is-active"
                              : null,
                          ]
                            .filter(Boolean)
                            .join(" ")
                        }
                        to={child.route}
                        onClick={() => {
                          if (showSidebar) {
                            toggleSidebar();
                          }
                        }}
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
                      !dark ? "h-dark" : "h-light",
                      isActive ||
                      (item.route === "/dashboard" && location.pathname === "/")
                        ? "is-active"
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                  to={item.route}
                  onClick={() => {
                    if (showSidebar) {
                      toggleSidebar();
                    }
                  }}
                >
                  <span>
                    <item.icon className="nav-icon" />
                  </span>

                  <Text sx={{ fontSize: "14px" }}>{item.name}</Text>
                </NavLink>
              )}
            </Fragment>
          ))}

          <div
            className={`nav-item ${!dark ? "h-dark" : "h-light"}`}
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
              <Logout className="nav-icon" />
            </span>
            <Text sx={{ fontSize: "14px" }}>Logout</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
