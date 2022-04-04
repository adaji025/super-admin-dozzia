import React from "react";
import { ActionIcon, useMantineColorScheme, Text, Avatar } from "@mantine/core";
import { Sun, Moon, Bell } from "tabler-icons-react";

const Header = () => {
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
        <div className="h-item">
          <ActionIcon
            variant="light"
            // onClick={() => toggleColorScheme()}
            title="Notifications"
            size="lg"
          >
            <Bell size={25} />
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
            {dark ? <Sun size={25} /> : <Moon size={25} />}
          </ActionIcon>
        </div>

        <div className="h-item user click">
          <div className="h-name">
            <Text mr="xs" color={dark ? "" : "#515151"}>
              Hi, Omotunde
            </Text>
          </div>
          <Avatar radius="xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
