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

export const forgotPassword = (username: string) => {
  return AxoisApi.post(`${APIS.AUTH.FORGOT_PASSWORD}`, {
    username,
  }).then((res) => {
    return res.data;
  });
};

export const resetPassword = (
  reset_code: string,
  password: string,
  password_confirmation: string
) => {
  return AxoisApi.post(`${APIS.AUTH.RESET_PASSWORD}`, {
    reset_code,
    password,
    password_confirmation,
  }).then((res) => {
    return res.data;
  });
};
