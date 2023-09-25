import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, LoadingOverlay, Popover, Group, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { FiChevronRight } from "react-icons/fi";
import moment from "moment";

import { ChevronRight } from "tabler-icons-react";

import Mountain from "../../assets/svg/mountains.svg";

import "./dashboard.scss";

const Dashboard = () => {
  const [active, setActive] = useState<"attendance" | "reports">("attendance");
  const [loading, setLoading] = useState<boolean>(false);
  const [calenderButtonLoading, setCalenderButtonLoading] =
    useState<boolean>(false);
  const [calenderPopover, setCalenderPopover] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
  const [metrics, setMetrics] = useState<null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    //eslint-disable-next-line
  }, [date]);

  const analyticsData = [
    {
      title: "Total Students",
      value: 1200,
    },
    {
      title: "Total Staffs",
      value: 300,
    },
    {
      title: "Total Classes",
      value: 30,
    },
    {
      title: "Active Bills",
      value: 15,
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
        <div className="left">
          <div className="graph">
            <div className="header">
              <div className="analytic">Analytics</div>
              <div className="d-p-h-right">
                <Popover
                  opened={calenderPopover}
                  onClose={() => setCalenderPopover(false)}
                  target={
                    <Button
                      color="dark"
                      compact
                      onClick={() => setCalenderPopover((o) => !o)}
                      loading={calenderButtonLoading}
                    >
                      {moment(date).format("MMM DD,YYYY")}
                    </Button>
                  }
                  position="bottom"
                  placement="end"
                  withArrow
                >
                  <Calendar
                    value={date}
                    initialMonth={date}
                    onChange={(value) => {
                      setDate(value);
                      setCalenderPopover(false);
                    }}
                  />
                </Popover>
              </div>
            </div>
            <div className="tabs">
              <Button
                className={`tab-item ${active === "attendance" && "active"}`}
                onClick={() => setActive("attendance")}
              >
                Attendance
              </Button>
              <Button
                className={`tab-item ${active === "reports" && "active"}`}
                onClick={() => setActive("reports")}
              >
                Reports
              </Button>
            </div>
          </div>
          <div className="bottom">
            <div className="events full">
              <div className="events-title" onClick={() => navigate("/events")}>
                <span>Upcoming Events</span>
                <FiChevronRight className="chevron" />
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="complaints">
            <Group grow>
              <Group position="left">
                <Text weight={500}>Active Bills</Text>
              </Group>
              <Group position="right">
                <Button
                  size="xs"
                  color="gray"
                  rightIcon={<ChevronRight size={12} />}
                  variant="subtle"
                >
                  View all
                </Button>
              </Group>
            </Group>
          </div>

          <div className="complaints reports">
            <Group grow>
              <Group grow position="left">
                <Text size="sm" weight={500}>
                  Report and Complaints
                </Text>
              </Group>
              <Group position="right">
                <Button
                  size="xs"
                  color="gray"
                  rightIcon={<ChevronRight size={12} />}
                  variant="subtle"
                >
                  View all
                </Button>
              </Group>
            </Group>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

type AnalyticsProps = {
  index: number;
  item: {
    title: string;
    value: number;
  };
};

const AnalyticsCard = ({ item, index }: AnalyticsProps) => {
  return (
    <div className={`analytic-card c-${index}`}>
      <div className="a-title">{item.title}</div>
      <div className="a-total">{item.value}</div>
      <img src={Mountain} alt="mountains" />
    </div>
  );
};

export default Dashboard;
