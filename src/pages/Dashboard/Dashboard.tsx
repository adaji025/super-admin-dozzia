import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AxiosError } from "axios";
import {
  Button,
  ScrollArea,
  LoadingOverlay,
  Popover,
  Group,
  Text,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { FiChevronRight } from "react-icons/fi";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setEventsDashboard,
  setReportsDashboard,
} from "../../redux/data/data.actions";
import useNotification from "../../hooks/useNotification";
import { getReports } from "../../services/reports/reports";
import { EventType, GetEventsResponse } from "../../types/eventTypes";
import { getEvents } from "../../services/event/event";
import { ReportStatusTypes, ReportType } from "../../types/reportsTypes";

import { getMetrics } from "../../services/metrics/metrics";
import { GetMetricsResponse } from "../../types/metricsTypes";
import Chart from "../../components/Dashboard/Chart";
import { ChevronRight } from "tabler-icons-react";

import Mountain from "../../assets/svg/mountains.svg";
import Student from "../../assets/images/student.png";
import CalendarIcon from "../../assets/svg/calendar.svg";
import EmptyReportState from "../../assets/svg/EmptyState.svg";

import "./dashboard.scss";
import { BillType, BillsState } from "../../types/billsTypes";

const Dashboard = () => {
  const [active, setActive] = useState<"attendance" | "reports">("attendance");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [calenderButtonLoading, setCalenderButtonLoading] =
    useState<boolean>(false);
  const [calenderPopover, setCalenderPopover] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
  const [metrics, setMetrics] = useState<GetMetricsResponse | null>(null);
  const navigate = useNavigate();
  const reports = useSelector((state: any) => {
    return state.data.reportsDashboard;
  });
  const events = useSelector(
    (state: { data: { eventsDashboard: GetEventsResponse } }) => {
      return state.data.eventsDashboard;
    }
  );

  const bills = useSelector(
    (state: { data: { bills: BillsState } }) => state.data.bills
  );
  const { handleError } = useNotification();

  useEffect(() => {
    handleGetReports();
    handleGetEvents();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleGetMetrics();
    //eslint-disable-next-line
  }, [date]);

  const handleGetReports = () => {
    if (!reports) {
      setLoading(true);
    }

    getReports(1, 50, ReportStatusTypes.UNRESOLVED)
      .then((res) => {
        dispatch(setReportsDashboard(res));
      })
      .catch((err: AxiosError) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetEvents = () => {
    getEvents({ page: 1, perPage: 10 })
      .then((res: GetEventsResponse) => {
        dispatch(setEventsDashboard(res));
      })
      .catch((err: AxiosError) => {
        handleError(err);
      });
  };

  const handleGetMetrics = () => {
    setCalenderButtonLoading(true);

    getMetrics(moment(date).format("YYYY-MM-DD"))
      .then((res: GetMetricsResponse) => {
        console.log(res);

        setMetrics(res);
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setCalenderButtonLoading(false);
      });
  };

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

            {metrics && <Chart metric={metrics.chart.attendance_metrics} />}
          </div>
          <div className="bottom">
            <div className="events full">
              <div className="events-title" onClick={() => navigate("/events")}>
                <span>Upcoming Events</span>
                <FiChevronRight className="chevron" />
              </div>

              {events && events?.data.length > 0 && (
                <ScrollArea type="auto" style={{ paddingBottom: 20 }}>
                  <div className="events-row">
                    {events?.data.map((event) => (
                      <Event key={event.event_id} event={event} />
                    ))}
                  </div>
                </ScrollArea>
              )}

              {events && events?.data.length === 0 && (
                <Group py={16} position="center">
                  <img src={CalendarIcon} alt="" />
                  <Text align="center">You have no upcoming events</Text>
                </Group>
              )}
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

            <div className="bills">
              {bills.data.map((bill: BillType) => (
                <Bill bill={bill} key={bill.school_bill_id} />
              ))}
            </div>
            {bills.data.length === 0 && (
              <EmptyState
                title="You have no active bills"
                desc="Active bills will be listed here"
              />
            )}
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

            <div className="bills">
              {reports?.data.map((report: ReportType) => (
                <ReportComplain report={report} key={report.id} />
              ))}
            </div>
            {reports?.data.length === 0 && (
              <EmptyState
                title="You have no unresolved complains"
                desc="Recents unresolved complaints will be listed here"
              />
            )}
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

interface EventProps {
  event: EventType;
}

const Event = ({ event }: EventProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="event-item"
      onClick={() => navigate(`/events?eventId=${event.event_id}`)}
    >
      <img src={!event.image ? Student : event.image} alt="" />
      <div className="event-overlay">
        <div className="overlay-content">
          <span>{event.title.substring(0, 15) + "..."}</span>
          <span>{moment(event.start_at).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <div className="event-overlay-2" />
    </div>
  );
};

type BillProps = {
  bill: BillType;
};

const Bill = ({ bill }: BillProps) => {
  return (
    <div className="bill">
      <div className="report">
        <div className="left">
          <div>{bill.title}</div>
        </div>
        <div className="right">
          <div className="desc">N300, 000</div>
        </div>
      </div>
      <div className="report two">
        <div className="left">
          <div>All Parents </div>
        </div>
        <div className="right two">
          <div className="rest">
            {" "}
            {moment(bill.deadline_date).format("MMM DD,YYYY")}
          </div>
          <div className="rest more">
            <span>More</span> <ChevronRight size={12} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

type ReportProps = {
  report: ReportType;
};

const ReportComplain = ({ report }: ReportProps) => {
  return (
    <div className="bill">
      <div className="report">
        <div className="left">
          <div>{report.tracking_code}</div>
        </div>
        <div className="right">
          <div className="desc"> {report.comment}</div>
        </div>
      </div>
      <div className="report two">
        <div className="left">
          <div>{moment(report.date).format("MMM DD,YYYY")}</div>
        </div>
        <div className="right two">
          <div className="rest unresolved"> {report.status}</div>
          <div className="rest more">
            <span>More</span> <ChevronRight size={12} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

type EmptyStateProps = {
  title: string;
  desc: string;
};

const EmptyState = ({ title, desc }: EmptyStateProps) => {
  return (
    <div className="empty-report">
      <img src={EmptyReportState} alt="" className="empty-report-image" />
      <h2 className="empty-report-text">{title}</h2>
      <span className="empty-report-desc">{desc}</span>
    </div>
  );
};

export default Dashboard;
