const api: string = process.env.REACT_APP_API!;

export const APIS = {
  AUTH: {
    LOGIN: `${api}/login`,
    RESET_PASSWORD: `${api}/reset/password`,
  },
};
