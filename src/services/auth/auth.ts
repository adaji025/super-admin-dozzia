import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";
import { ApiResponseType } from "../../types/utilityTypes";
import { ProfileType, SigninResponse } from "../../types/authTypes";
import { AxiosError } from "axios";

export const login = (email: string, password: string) => {
  return AxoisApi.post(`${APIS.AUTH.LOGIN}`, {
    email,
    password,
  }).then((res: { data: ApiResponseType<SigninResponse> }) => {
    if (res.data.data.access_token) {
      localStorage.setItem("token", res.data.data.access_token);
    }
    return res.data.data;
  });
};

export const getProfileInfo = (token?: string, include?: string) => {
  return new Promise<ProfileType>((resolve, reject) => {
    AxoisApi.get(
      APIS.AUTH.PROFILE,
      ...(token ? [{ headers: { Authorization: `Bearer ${token}` } }] : [])
    )
      .then((res: { data: ApiResponseType<ProfileType> }) => {
        resolve(res.data.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const forgotPassword = (username: string) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.FORGOT_PASSWORD}`, {
      username,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const resetPassword = (
  reset_code: string,
  password: string,
  password_confirmation: string
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.RESET_PASSWORD}`, {
      reset_code,
      password,
      password_confirmation,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
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
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.PROFILE}`, {
      first_name,
      last_name,
      middle_name,
      email,
      phone_number,
      address,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const changePassword = (
  current_password: string,
  password: string,
  password_confirmation: string
) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.CHANGE_PASSWORD}`, {
      current_password,
      password,
      password_confirmation,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const changeProfileImage = (image: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.CHANGE_PROFILE_IMAGE}`, image)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.LOGOUT}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
};
