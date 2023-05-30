import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { AxiosError } from "axios";
import { ReactComponent as Students } from "../../assets/svg/stats/students.svg";
import { ReactComponent as Staff } from "../../assets/svg/stats/staff.svg";
import { ReactComponent as Classes } from "../../assets/svg/stats/classes.svg";
import { ReactComponent as Complaints } from "../../assets/svg/stats/complaints.svg";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../services/stats/stats";
import { setStats } from "../../redux/data/data.actions";
import useNotification from "../../hooks/useNotification";
import { StatsType } from "../../types/statsTypes";
import "./dashboard.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const stats: StatsType = useSelector(
    (state: { data: { stats: StatsType } }) => {
      return state.data.stats;
    }
  );
  const { handleError } = useNotification();

  useEffect(() => {
    handleGetStats();
    //eslint-disable-next-line
  }, []);

  const handleGetStats = () => {
    getStats()
      .then((res) => {
        dispatch(setStats(res.data));
      })
      .catch((error: AxiosError) => {
        handleError(error);
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>

      <div className="dashboard-container">
        <div className="stat-cards">
          <Stat
            title="Total Students"
            value={stats.total_student}
            Icon={Students}
          />
          <Stat title="Total Staff" value={stats.total_staff} Icon={Staff} />
          <Stat
            title="Total Classes"
            value={stats.total_classroom}
            Icon={Classes}
          />
          <Stat title="Unresolved Complaints" value={0} Icon={Complaints} />
        </div>
      </div>
    </Fragment>
  );
};

interface StatProps {
  title: string;
  value: number;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Stat = ({ title, value, Icon }: StatProps) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon />
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default Dashboard;
