import { useMantineColorScheme } from "@mantine/core";

const useTheme = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return { dark };
};

export default useTheme;
