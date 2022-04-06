import { Link } from "react-router-dom";
import { ActionIcon, useMantineColorScheme, Text } from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

import "./auth-header.scss";

const AuthHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div
      className={`auth-header ${dark ? "dark-card-bg" : "light-card-bg"}`}
      style={{
        borderBottom: `1px solid ${dark ? "#2c2e33" : "#e9ecef"}`,
      }}
    >
      <div className="app-logo">
        <Link to="/">
          <Text style={{ fontSize: "30px" }}>Dozzia</Text>
        </Link>
      </div>

      <ActionIcon
        variant="transparent"
        color={dark ? "yellow" : "green"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <Sun size={25} /> : <Moon size={25} />}
      </ActionIcon>
    </div>
  );
};

export default AuthHeader;
