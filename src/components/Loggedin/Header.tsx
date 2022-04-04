import { ActionIcon, useMantineColorScheme, Text, Avatar } from "@mantine/core";
import { Sun, Moon, Bell, Menu2 } from "tabler-icons-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div
      className="loggedin-header"
      style={{
        backgroundColor: dark ? "#1c1c1c" : "#ffffff",
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
            <ActionIcon
              variant="light"
              // onClick={() => toggleColorScheme()}
              title="Notifications"
              size="lg"
            >
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

          <div className="h-item user click">
            <div className="h-name no-select">
              <Text mr="xs" color={dark ? "" : "#515151"}>
                Hi, Omotunde
              </Text>
            </div>
            <Avatar radius="xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
