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
  Menu,
  Text,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { FiChevronRight } from "react-icons/fi";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setEvents, setReports } from "../../redux/data/data.actions";
import useNotification from "../../hooks/useNotification";
import { getReports } from "../../services/reports/reports";
import { EventType, GetEventsResponse } from "../../types/eventTypes";
import { getEvents } from "../../services/event/event";
import { ReportStatusTypes, ReportType } from "../../types/reportsTypes";
import { getMetrics } from "../../services/metrics/metrics";
import { GetMetricsResponse } from "../../types/metricsTypes";
import useClass from "../../hooks/useClass";
import { UserState } from "../../redux/user/user.reducer";
import { ClassroomType } from "../../types/classTypes";
import Chart from "../../components/Dashboard/Chart";
import { ChevronRight } from "tabler-icons-react";

import Mountain from "../../assets/svg/mountains.svg";
import Student from "../../assets/images/student.png";
import CalendarIcon from "../../assets/svg/calendar.svg";
import EmptyReportState from "../../assets/svg/EmptyState.svg";
import { ReactComponent as Note2 } from "../../assets/svg/note-2.svg";

import "./dashboard.scss";

const TeacherDashboard = () => {
  const [page] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [search] = useState<string>("");
  const [level] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [calenderButtonLoading, setCalenderButtonLoading] =
    useState<boolean>(false);
  const [calenderPopover, setCalenderPopover] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
  const [metrics, setMetrics] = useState<GetMetricsResponse>();
  const [classList, setClassList] = useState<ClassroomType[]>([]);
  const [, setClassId] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reports = useSelector((state: any) => {
    return state.data.reports;
  });
  const events = useSelector(
    (state: { data: { events: GetEventsResponse } }) => {
      return state.data.events;
    }
  );
  const userdata = useSelector((state: { user: UserState }) => {
    return state.user.userdata;
  });
  const { handleError } = useNotification();
  const { getClassList } = useClass();

  useEffect(() => {
    handleGetReports();
    handleGetEvents();
    handleGetClassList();
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
        dispatch(setReports(res));
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
        dispatch(setEvents(res));
      })
      .catch((err: AxiosError) => {
        handleError(err);
      });
  };

  const handleGetClassList = () => {
    getClassList(page, perPage, level, search, false, userdata.staff_id)
      .then((res: any) => {
        setClassList(res);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleGetMetrics = () => {
    setCalenderButtonLoading(true);

    getMetrics(moment(date).format("YYYY-MM-DD"))
      .then((res: GetMetricsResponse) => {
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

  const bills = [
    {
      title: "School fees",
      party: "All Parent",
      amount: 300000,
      date: "Sept 9, 2023",
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>

      <LoadingOverlay visible={loading} />

      <div className="top">
        <Group position="apart">
          <Text weight={600}>Jss 1A</Text>
          <Menu
            gutter={15}
            withArrow
            size="sm"
            control={<Button color="dark">Select Class</Button>}
          >
            {classList?.map((classItem: any) => (
              <Menu.Item
                onClick={() => {
                  setClassId(classItem.classroom_id);
                }}
              >
                {classItem.name}
              </Menu.Item>
            ))}
          </Menu>
        </Group>
      </div>

      <div className="analytics">
        {analyticsData.map((item, index) => (
          <AnalyticsCard item={item} index={index} key={index} />
        ))}
      </div>

      <div className="dashboard">
        <div className="left">
          <div className="graph">
            <div className="header">
              <div className="analytic">Attendance</div>
              <div className="d-p-h-right">
                <Group align="center">
                  <Popover
                    opened={calenderPopover}
                    onClose={() => setCalenderPopover(false)}
                    target={
                      <Button
                        variant="outline"
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

                  <Button color="dark" onClick={() => navigate("/attendance")}>
                    Take Attendance
                  </Button>
                </Group>
              </div>
            </div>

            {metrics && <Chart metric={metrics.chart.attendance_metrics} />}
          </div>

          <div className="bottom">
            <div className="events">
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
            <div className="c-wall">
              <Text weight={600}>Class wall</Text>
              <div className="note-text">
                <div className="box">
                  <Note2 />
                </div>
                <Text size="xs">
                  Manage your class activities on the class wall
                </Text>
              </div>
              <Button
                variant="outline"
                color="dark"
                mt={16}
                onClick={() => navigate("/class-wall")}
              >
                Go to Class Wall
              </Button>
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
              {[...Array(2)].map((_, index) => (
                <Bill key={index} />
              ))}
            </div>
            {bills.length === 0 && (
              <EmptyState
                title="You have no unresolved complains"
                desc="Recents unresolved complaints will be listed here"
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
              {reports &&
                reports?.data.map((report: ReportType) => (
                  <ReportComplain report={report} key={report.id} />
                ))}
            </div>
            {reports?.data.length === 0 && (
              <EmptyState
                title="You have no active bills"
                desc="Active bills will be listed here"
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
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
      <div>
        <Text weight={500} transform="capitalize" className="e-title">
          {event.title}
        </Text>
        <Text size="xs" color="#495057">
          {moment(event.start_at).format("MMM DD, YYYY")}
        </Text>
        <Text size="xs" underline mt={12}>
          Learn More
        </Text>
      </div>
      <img src={!event.image ? Student : event.image} alt="" />
    </div>
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

const Bill = () => {
  return (
    <div className="bill">
      <div className="report">
        <div className="left">
          <div>School Fees</div>
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
          <div className="rest"> Sept 9,2023</div>
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

export default TeacherDashboard;
