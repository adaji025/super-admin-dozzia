import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const login = (username: string, password: string) => {
  return AxoisApi.post(`${APIS.AUTH.LOGIN}`, {
    username,
    password,
  }).then((res) => {
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  });
};
