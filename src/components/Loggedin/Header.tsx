import { useSelector } from "react-redux";
import { ActionIcon, useMantineColorScheme, Text, Avatar } from "@mantine/core";
import { Sun, Moon, Bell, Menu2 } from "tabler-icons-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });

  return (
    <div
      className={`loggedin-header ${dark ? "dark-card-bg" : "light-card-bg"}`}
      style={{
        borderBottom: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
      }}
    >
      <div className="header-items">
        <div className="h-left">
          <ActionIcon
            variant="default"
            // onClick={() => toggleColorScheme()}
            title="Notifications"
            size="lg"
            onClick={toggleSidebar}
          >
            <Menu2 size={25} />
          </ActionIcon>
        </div>

        <div className="h-right">
          <div className="h-item">
            <ActionIcon variant="light" title="Notifications" size="lg">
              <Bell size={25} strokeWidth={1.4} />
            </ActionIcon>
          </div>

          <div className="h-item">
            <ActionIcon
              variant="light"
              color={dark ? "yellow" : "green"}
              onClick={() => toggleColorScheme()}
              title="Toggle theme"
              size="lg"
            >
              {dark ? (
                <Sun size={25} strokeWidth={1.4} />
              ) : (
                <Moon strokeWidth={1.4} size={25} />
              )}
            </ActionIcon>
          </div>

          <div className="h-item user">
            <div className="h-name no-select">
              <Text mr="xs" color={dark ? "" : "#393939"}>
                {`Hi${userdata?.profile_details?.first_name ? "," : ""} ${
                  userdata?.profile_details?.first_name ?? "there!"
                }`}
              </Text>
            </div>
            <Avatar
              className="avatar"
              src={userdata?.picture ? userdata?.picture : null}
              radius="xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
