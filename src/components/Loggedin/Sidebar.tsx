import { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Burger, Text } from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import useTheme from "../../hooks/useTheme";
import {
  LayoutDashboard,
  ChevronDown,
  FilePencil,
  Books,
  ClipboardList,
  Wall,
} from "tabler-icons-react";
import { ReactComponent as Administration } from "../../assets/svg/navigation/administration.svg";
import { ReactComponent as Broadcast } from "../../assets/svg/navigation/broadcast.svg";
import { ReactComponent as Dashboard } from "../../assets/svg/navigation/dashboard.svg";
import { ReactComponent as Logout } from "../../assets/svg/navigation/logout.svg";
import { ReactComponent as Management } from "../../assets/svg/navigation/management.svg";
import { ReactComponent as Reports } from "../../assets/svg/navigation/reports.svg";
import { ReactComponent as Settings } from "../../assets/svg/navigation/setting.svg";
import { ReactComponent as Trash } from "../../assets/svg/navigation/trash.svg";
import { ReactComponent as Wallet } from "../../assets/svg/navigation/wallet.svg";
import { ReactComponent as Promotion } from "../../assets/svg/navigation/promotion.svg";
import { ReactComponent as Security } from "../../assets/svg/navigation/security-user.svg";
import { UserState } from "../../redux/user/user.reducer";
import { Roles } from "../../types/authTypes";

interface SidebarProps {
  toggleSidebar: () => void;
  showSidebar: boolean;
}

const Sidebar = ({ toggleSidebar, showSidebar }: SidebarProps) => {
  const { dark } = useTheme();
  const [showChildren, setShowChildren] = useState<string>("");
  const [routes, setRoutes] = useState<any>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userdata = useSelector((state: { user: UserState }) => {
    return state.user.userdata;
  });

  useEffect(() => {
    if (
      userdata.role.name === Roles.Principal ||
      userdata.role.name === Roles.SchoolAdmin
    ) {
      setRoutes(adminRoutes);
    } else if (userdata?.role?.name === Roles.Teacher) {
      setRoutes(teacherRoutes);
    }

    //eslint-disable-next-line
  }, []);

  const adminRoutes = [
    {
      icon: Dashboard,
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: Management,
      name: "Management",
      route: "/management",
      key: [
        "students",
        "staff",
        "subjects",
        "classes",
        "events",
        "class-wall",
        "grades",
      ],
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
        {
          icon: Promotion,
          name: "Promotion Request",
          route: "/promotion-request",
        },
        {
          name: "Grades",
          route: "/grades",
        },
      ],
    },
    {
      icon: Administration,
      name: "Admissions",
      route: "/admissions",
      key: ["add-student", "add-staff", "terms-sessions"],
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
          name: "Terms & Sessions",
          route: "/terms-sessions",
        },
      ],
    },
    {
      icon: Security,
      name: "Security",
      route: "/security",
      key: ["school-buses", "attendance"],
      children: [
        {
          name: "Bus GPS",
          route: "/school-buses",
        },
        {
          name: "Attendance",
          route: "/attendance",
        },
      ],
    },
    {
      icon: Wallet,
      name: "Wallet",
      route: "/wallet",
    },
    {
      icon: Broadcast,
      name: "Broadcast",
      route: "/broadcast",
    },
    {
      icon: Reports,
      name: "Reports & Complaints",
      route: "/reports",
    },
    {
      icon: Settings,
      name: "Settings",
      route: "/settings",
    },
    {
      icon: Trash,
      name: "Recycle Bin",
      route: "/recycle-bin",
    },
  ];

  const teacherRoutes = [
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: Wall,
      name: "Classes",
      route: "/classes",
    },

    {
      icon: ClipboardList,
      name: "Class Wall",
      route: "/class-wall",
    },
    {
      icon: Books,
      name: "Subjects",
      route: "/subjects",
    },
    {
      icon: FilePencil,
      name: "Attendance",
      route: "/attendance",
    },
    {
      icon: Broadcast,
      name: "Broadcast",
      route: "/broadcast",
    },
    {
      icon: Promotion,
      name: "Promotion Request",
      route: "/promotion-request",
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
          {routes.map((item: any) => (
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
