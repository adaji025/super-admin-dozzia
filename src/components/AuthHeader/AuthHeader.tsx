import { Link } from "react-router-dom";
import { ActionIcon, useMantineColorScheme, Text } from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

import "./auth-header.scss";

const AuthHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div
      className="auth-header"
      style={{
        backgroundColor: dark ? "#070707" : "#f7f7f7",
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
