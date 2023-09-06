import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AxiosError } from "axios";
import { Button, ScrollArea, LoadingOverlay, Popover } from "@mantine/core";
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
import RemoveNote from "../../assets/svg/note-remove.svg";
import Mountain from "../../assets/svg/mountains.svg";
import Student from "../../assets/images/student.png";
import CalendarIcon from "../../assets/svg/calendar.svg";
import EmptyReportState from "../../assets/svg/EmptyState.svg";
import { getMetrics } from "../../services/metrics/metrics";
import { GetMetricsResponse } from "../../types/metricsTypes";
import Chart from "../../components/Dashboard/Chart";
import "./dashboard.scss";

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

  const callToAction = [
    {
      title: "You have 3 events",
      btnText: "Create broadcast",
      variant: "dark",
      click: () => navigate("/broadcast"),
    },
    {
      title: "Go to class wall",
      btnText: "Class wall",
      variant: "green",
      click: () => navigate("/class-wall"),
    },
    {
      title: "Staff",
      btnText: "Find staff",
      variant: "yellow",
      click: () => navigate("/staff"),
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>

      <LoadingOverlay visible={loading} />

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
          <div className="cards">
            {callToAction.map((action) => (
              <ActionCard key={action.title} action={action} />
            ))}
          </div>
        </div>
        <div className="right">
          <div className="complaints">
            <span className="title">Reports and complaints</span>

            <div className="complaints-statistics">
              <img src={RemoveNote} alt="remove note" />
              <p>Unresolved Complaints</p>
              <div className="count">{reports ? reports?.meta.total : "0"}</div>
              <img src={Mountain} alt="mountain" className="mountain" />
            </div>
            {reports?.data.length > 0 ? (
              <div>
                {reports.data.map((report: ReportType) => (
                  <ComplaintCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <div className="empty-report">
                <img
                  src={EmptyReportState}
                  alt=""
                  className="empty-report-image"
                />
                <h2 className="empty-report-text">No unresolved complaint</h2>
                <span className="empty-report-desc">
                  Recents unresolved complaints will be listed here
                </span>
              </div>
            )}
          </div>

          <div className="events">
            <div className="events-title" onClick={() => navigate("/events")}>
              <span>Upcoming Events</span>
              <FiChevronRight className="chevron" />
            </div>

            {events && events?.data.length > 0 ? (
              <ScrollArea type="auto" style={{ paddingBottom: 20 }}>
                <div className="events-row">
                  {events?.data.map((event) => (
                    <Event key={event.event_id} event={event} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="empty-event">
                <div>
                  <img src={CalendarIcon} alt="" />
                  <h2>You have no upcoming events</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

type ReportsProps = {
  report: ReportType;
};

const ComplaintCard: React.FC<ReportsProps> = ({ report }) => {
  return (
    <div className="complaint-box">
      <table>
        <thead>
          <tr>
            <th className="c-title">Issue Number</th>
            <th className="c-title">Title</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="c-desc">{report.tracking_code}</td>
            <td className="c-desc">{report.title}</td>
          </tr>
          <tr>
            <td className="c-title date-status">Date</td>
            <td className="c-title date-status">Status</td>
          </tr>
          <tr>
            <td className="c-desc">{report.date}</td>
            <td className="status">{report.status}</td>
            <Button variant="subtle" rightIcon={<FiChevronRight />}>
              View
            </Button>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface ActionProps {
  action: {
    title: string;
    btnText: string;
    variant: string;
    click: () => void;
  };
}

const ActionCard = ({ action }: ActionProps) => {
  return (
    <div className={`call-to-action card-${action.variant}`}>
      <h2 className={`call-to-action-text card-${action.variant}`}>
        {action.title}
      </h2>
      <Button className={`card-${action.variant}`} onClick={action.click}>
        {action.btnText}
      </Button>
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

export default Dashboard;
