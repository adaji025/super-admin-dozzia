import AxoisApi from "../../api/index";
import { APIS } from "../../api/api";

export const getStats = () => {
  return AxoisApi.get(`${APIS.STATS.GET_STATS}`).then((res) => {
    return res.data;
  });
};
