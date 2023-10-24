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
