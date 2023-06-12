import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { AxiosError } from "axios";
import {
  Button,
  Modal,
  Text,
  Input,
  Menu,
  Pagination,
  Skeleton,
  Alert,
  Group,
  Box,
  Table,
  Popover,
  Badge,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setAttendance } from "../../redux/data/data.actions";
import { Calendar } from "@mantine/dates";
import { X, Search, ClipboardList } from "tabler-icons-react";
import useTheme from "../../hooks/useTheme";
import moment from "moment";
import ClassAttendance from "../../components/modals/Attendance/ClassAttendance";
import useNotification from "../../hooks/useNotification";
import { getGeneralAttendance } from "../../services/attendance/attendance";
import { GeneralAttendanceType } from "../../types/attendanceTypes";

const Attendance = () => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [date, setDate] = useState<any>(new Date());
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [calenderPopover, setCalenderPopover] = useState<boolean>(false);
  const [perPage] = useState<number>(10);
  const { dark } = useTheme();
  const [classAttendanceModal, setClassAttendanceModal] =
    useState<boolean>(false);
  const [activeClass, setActiveClass] = useState<any>(null);
  const deviceWidth = window.innerWidth;
  const attendance = useSelector((state: any) => {
    return state.data.attendance;
  });

  useEffect(() => {
    handleGetGeneralAttendance();
    //eslint-disable-next-line
  }, [page, date, search]);

  const handleGetGeneralAttendance = () => {
    if (!attendance) {
      setLoading(true);
    }

    getGeneralAttendance(
      page,
      perPage,
      moment(date).format("YYYY-MM-DD"),
      search
    )
      .then((res) => {
        dispatch(setAttendance(res));
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Attendance</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Attendance" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={classAttendanceModal}
        onClose={() => {
          setClassAttendanceModal(false);
          setActiveClass(null);
        }}
        title={
          <Group position="apart">
            <Text weight={600}>{activeClass?.classroom_name} Attendance </Text>
            <Badge size="lg">{`${activeClass?.total_present}/ ${activeClass?.total_student}`}</Badge>
          </Group>
        }
        size="xl"
      >
        <ClassAttendance
          closeModal={() => {
            setClassAttendanceModal(false);
            setActiveClass(null);
          }}
          selectedClass={activeClass}
          modalActive={classAttendanceModal}
          date={date}
          callback={handleGetGeneralAttendance}
        />
      </Modal>

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left no-select"></div>

            <div className="d-p-h-right">
              <Popover
                opened={calenderPopover}
                onClose={() => setCalenderPopover(false)}
                target={
                  <Button onClick={() => setCalenderPopover((o) => !o)}>
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
                    setLoading(true);
                    setDate(value);
                    setCalenderPopover(false);
                  }}
                />
              </Popover>
            </div>
          </div>

          <div
            className="d-p-search with-btns"
            style={{
              background: dark ? "#121212" : "#f8f9fa",
            }}
          >
            <div className="s-left">
              <Input
                sx={{
                  maxWidth: "706px",
                }}
                icon={<Search size={16} />}
                placeholder="Search class"
                value={searchInput}
                onKeyUp={(e: any) => {
                  if (e.code === "Enter") {
                    if (searchInput !== "") {
                      setLoading(true);
                      setSearch(searchInput);
                    }
                  }
                }}
                rightSection={
                  (searchInput !== "" || search !== "") && (
                    <X
                      strokeWidth={1.4}
                      style={{ opacity: 0.5 }}
                      className="click"
                      onClick={() => {
                        if (search !== "") {
                          setLoading(true);
                          setSearch("");
                        }
                        setSearchInput("");
                      }}
                    />
                  )
                }
                onChange={(e: any) => {
                  setSearchInput(e.target.value);
                }}
              />
            </div>

            <div className="s-right">
              <Button
                onClick={() => {
                  if (searchInput !== "") {
                    setLoading(true);
                    setSearch(searchInput);
                  }
                }}
              >
                Search
              </Button>
            </div>
          </div>

          <Box sx={{ maxWidth: 800, minHeight: 173 }} className="d-p-main">
            {attendance && attendance.data && !loading ? (
              <>
                <Table striped verticalSpacing="md">
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                        className="large-only"
                      ></th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Class
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                        className="large-only"
                      >
                        Present
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          width: "1px",
                        }}
                        className="table-last head large-only"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance?.data.length > 0 &&
                      attendance?.data.map(
                        (item: GeneralAttendanceType, index: number) => (
                          <tr key={item.classroom_id}>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                              className="large-only"
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              {item.classroom_name}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                              className="large-only"
                            >
                              {item.total_present} / {item.total_student}{" "}
                              Students
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                width: "20px",
                              }}
                              className="table-last"
                            >
                              <Menu
                                position={deviceWidth < 576 ? "left" : "right"}
                                gutter={15}
                                withArrow
                                size="sm"
                              >
                                <Menu.Label>Menu</Menu.Label>

                                <Menu.Item
                                  icon={<ClipboardList size={14} />}
                                  onClick={() => {
                                    setClassAttendanceModal(true);
                                    setActiveClass(item);
                                  }}
                                >
                                  View Class
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>

                {attendance?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No Class found.
                    </Alert>
                  </Group>
                )}
              </>
            ) : (
              <>
                <Skeleton height={25} mt={30} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
              </>
            )}
          </Box>

          {attendance?.meta && attendance?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 800 }}
              position="left"
              mt={25}
              onChange={(value) => {
                if (value !== attendance.meta.current_page) {
                  setLoading(true);
                  setPage(value);
                }
              }}
              initialPage={attendance.meta.current_page}
              total={attendance.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Attendance;
