import axios from "axios";

function getToken() {
  let token = localStorage.getItem("token") ?? null;
  return token;
}

let AxoisApi = axios.create({
  baseURL: process.env.REACT_APP_API,
});

AxoisApi.defaults.headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  //    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
};

AxoisApi.interceptors.response.use(
  function (response) {
    let datares = response.data;
    if (typeof datares == "object") {
      if (
        Number(datares?.status) === 400 ||
        Number(datares?.status) === 401 ||
        Number(datares?.status) === 500
      ) {
        return Promise.reject(response);
      }
    }

    return response;
  },
  function (error) {
    console.log(error);

    return Promise.reject(error);
  }
);

AxoisApi.interceptors.request.use(function (config) {
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }

  return config;
});

export default AxoisApi;
