import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import useStats from "../../hooks/useStats";
import useTheme from "../../hooks/useTheme";
import "./dashboard.scss";

const Dashboard = () => {
  const { userdata, stats, handleGetStats } = useStats();
  const { dark } = useTheme();

  useEffect(() => {
    handleGetStats();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>General Overview</title>
        <meta name="description" content="" />
        <meta property="og:title" content="General Overview" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <div
        className="dashboard-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="greeting">
          Welcome! {userdata?.profile_details?.first_name}👋🏼
        </div>

        <div className="cards-container">
          <div className="card-item">
            <div className="c-i-wrapper">
              <div className="card-title">Total Students</div>
              <div
                className="card-value"
                style={{ background: dark ? "#2f9e4459" : "#80d38ffc" }}
              >
                {stats?.total_student}
              </div>
            </div>
          </div>

          <div className="card-item">
            <div className="c-i-wrapper">
              <div className="card-title">Total Staff</div>
              <div
                className="card-value"
                style={{ background: dark ? "#2f9e4459" : "#80d38ffc" }}
              >
                {stats?.total_staff}
              </div>
            </div>
          </div>

          <div className="card-item">
            <div className="c-i-wrapper">
              <div className="card-title">Total Classes</div>
              <div
                className="card-value"
                style={{ background: dark ? "#2f9e4459" : "#80d38ffc" }}
              >
                {stats?.total_classroom}
              </div>
            </div>
          </div>

          <div className="card-item">
            <div className="c-i-wrapper">
              <div className="card-title">Unresolved Complaints</div>
              <div
                className="card-value"
                style={{ background: dark ? "#2f9e4459" : "#80d38ffc" }}
              >
                {stats && "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
