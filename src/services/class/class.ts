import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const addClass = (data: {
  classroom_level: string;
  classroom_name: string;
  classroom_teacher: string;
  classroom_description: string;
}) => {
  return AxoisApi.post(`${APIS.CLASS.CLASS}`, data).then((res) => {
    return res.data;
  });
};
