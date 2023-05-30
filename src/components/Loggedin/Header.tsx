import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  ActionIcon,
  useMantineColorScheme,
  Text,
  Avatar,
  Burger,
} from "@mantine/core";
import { ReactComponent as Notification } from "../../assets/svg/notification.svg";
import { ReactComponent as UserImage } from "../../assets/svg/user-image.svg";

interface HeaderProps {
  toggleSidebar: () => void;
  showSidebar: boolean;
}

const Header = ({ toggleSidebar, showSidebar }: HeaderProps) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const location = useLocation();

  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });

  return (
    <div className="loggedin-header">
      <div className="header-items">
        <div className="h-left">
          <Burger
            onClick={toggleSidebar}
            opened={showSidebar}
            className="menu"
            title={showSidebar ? "Close navigation" : "Open navigation"}
            mr={16}
          />

          <div className="page-title">
            {location.pathname.split("/")[1].replace("-", " ")}
          </div>
        </div>

        <div className="h-right">
          <div className="h-item">
            <ActionIcon variant="light" title="Notifications" size="md">
              <Notification />
            </ActionIcon>
          </div>

          <div className="h-item user">
            <div className="h-name no-select">
              <Text mr="xs" color={dark ? "" : "#121212"}>
                {`Hi ${userdata?.profile_details?.first_name ?? "there!"}`}
              </Text>
            </div>

            {userdata?.picture ? (
              <Avatar
                className="avatar"
                src={userdata.picture}
                radius={15}
                color="gray"
              />
            ) : (
              <UserImage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
