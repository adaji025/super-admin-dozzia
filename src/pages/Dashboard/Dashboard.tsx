import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, LoadingOverlay, Popover, Group, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { FiChevronRight } from "react-icons/fi";
import moment from "moment";

import { ChevronRight } from "tabler-icons-react";

import Mountain from "../../assets/svg/mountains.svg";
import CloudIcon from "../../assets/svg/cloud.svg";

import "./dashboard.scss";

const Dashboard = () => {
  const [active, setActive] = useState<"attendance" | "reports">("attendance");
  const [loading, setLoading] = useState<boolean>(false);
  const [calenderButtonLoading, setCalenderButtonLoading] =
    useState<boolean>(false);
  const [calenderPopover, setCalenderPopover] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    //eslint-disable-next-line
  }, [date]);

  const analyticsData = [
    {
      title: "Total Schools",
      value: 1000,
      desc: "3.5% increase this month",
    },
    {
      title: "Active Schools",
      value: 900,
      desc: "5% increase this month",
    },
    {
      title: "Total Parents",
      value: 300,
      desc: "6% increase this month",
    },
    {
      title: "Total Staff",
      value: 1000,
      desc: "3.5% decrease this month",
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>

      <LoadingOverlay visible={loading} />

      <div className="analytics">
        {analyticsData.map((item, index) => (
          <AnalyticsCard item={item} index={index} key={index} />
        ))}
      </div>

      <div className="dashboard">
        
      </div>
    </Fragment>
  );
};

type AnalyticsProps = {
  index: number;
  item: {
    title: string;
    value: number;
    desc: string;
  };
};

const AnalyticsCard = ({ item, index }: AnalyticsProps) => {
  return (
    <div className={`analytic-card c-${index}`}>
      <div className="a-title">{item.title}</div>
      <div className="a-total">{item.value}</div>
      <div className="a-desc">
        <img src={CloudIcon} alt="dozzia" />
        {item.desc}
      </div>
      <img src={Mountain} alt="mountains" className="mountains" />
    </div>
  );
};

export default Dashboard;
