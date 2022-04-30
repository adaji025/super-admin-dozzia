import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
    showNotification({
      title: "User logged out",
      message: `${"Sign in to continue "} 😑`,
      color: "yellow",
    });
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleError = (error: any) => {
    if (!error.response) {
      return showNotification({
        title: "Network Error",
        message: "Please check your connection",
        color: "red",
      });
    }

    if (error?.response?.status === 401) {
      return logoutUser();
    }

    if (error?.response?.status === 500) {
      return showNotification({
        title: "Error",
        message: `${
          error?.response?.data?.message ?? "An error occured, please try again"
        } 🤥`,
        color: "red",
      });
    }

    if (typeof error?.response?.data?.errors === "object" && error !== null) {
      // eslint-disable-next-line
      for (const [key, value] of Object?.entries(
        error?.response?.data?.errors
      )) {
        showNotification({
          message: `${value}`,
          color: "red",
        });
      }
    } else {
      showNotification({
        title: "Error",
        message: `${error?.response?.data?.message} 🤥`,
        color: "red",
      });
    }
  };
  return {
    handleError,
  };
};

export default useNotification;
