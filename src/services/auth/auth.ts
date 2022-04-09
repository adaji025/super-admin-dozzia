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

export const updateProfile = (
  first_name: string,
  last_name: string,
  middle_name: string,
  email: string,
  phone_number: string,
  address: string
) => {
  return AxoisApi.post(`${APIS.AUTH.UPDATE_PROFILE}`, {
    first_name,
    last_name,
    middle_name,
    email,
    phone_number,
    address,
  }).then((res) => {
    return res.data;
  });
};

export const changePassword = (
  current_password: string,
  password: string,
  password_confirmation: string
) => {
  return AxoisApi.post(`${APIS.AUTH.CHANGE_PASSWORD}`, {
    current_password,
    password,
    password_confirmation,
  }).then((res) => {
    return res.data;
  });
};
