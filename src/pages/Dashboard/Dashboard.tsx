import { Fragment } from "react";
import { Helmet } from "react-helmet";

import "./dashboard.scss";

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>General Overview</title>
        <meta name="description" content="" />
        <meta property="og:title" content="General Overview" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <div className="dashboard-container">Overview</div>
    </Fragment>
  );
};

export default Dashboard;
