import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../services/stats/stats";
import { setStats } from "../redux/data/data.actions";

const useStats = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state: any) => {
    return state.data.stats;
  });
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });

  const handleGetStats = () => {
    getStats()
      .then((res) => {
        dispatch(setStats(res.data));
      })
      .catch(() => {});
  };

  return {
    stats,
    userdata,
    handleGetStats,
  };
};

export default useStats;
