import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const addGrade = (data: {
  name: string;
  remark: string;
  min_score: string;
  max_score: string;
}) => {
  return AxoisApi.post(`${APIS.GRADES.GRADES}`, data).then((res) => {
    return res.data;
  });
};

export const getGrades = () => {
  return AxoisApi.get(`${APIS.GRADES.GRADES}`).then((res) => {
    return res.data;
  });
};

export const deleteGrade = (id: string) => {
  return AxoisApi.delete(`${APIS.GRADES.GRADE(id)}`).then((res) => {
    return res.data;
  });
};

export const updateRemark = (
  id: string,
  data: {
    remark: string;
  }
) => {
  return AxoisApi.put(`${APIS.GRADES.GRADE(id)}`, data).then((res) => {
    return res.data;
  });
};
