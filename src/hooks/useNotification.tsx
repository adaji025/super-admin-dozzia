import { showNotification } from "@mantine/notifications";

const useNotification = () => {
  const handleError = (error: any) => {
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
