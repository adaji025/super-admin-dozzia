import { Link } from "react-router-dom";
import { ActionIcon, useMantineColorScheme, Text } from "@mantine/core";
import { BsMoonStars, BsSun } from "react-icons/bs";

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
        color="green"
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <BsSun size={25} /> : <BsMoonStars size={25} />}
      </ActionIcon>
    </div>
  );
};

export default AuthHeader;
