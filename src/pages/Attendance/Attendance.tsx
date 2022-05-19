import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
import { Calendar } from "@mantine/dates";
import {
  AdjustmentsHorizontal,
  Search,
  ClipboardList,
} from "tabler-icons-react";
import useTheme from "../../hooks/useTheme";
import moment from "moment";
import useAttendance from "../../hooks/useAttendance";
import ClassAttendance from "../../components/modals/Attendance/ClassAttendance";

const Attendance = () => {
  const [page, setPage] = useState<number>(1);
  const [date, setDate] = useState<any>(new Date());
  const [calenderPopover, setCalenderPopover] = useState<boolean>(false);
  const [perPage] = useState<number>(10);
  const { dark } = useTheme();
  const [classAttendanceModal, setClassAttendanceModal] =
    useState<boolean>(false);
  const [activeClass, setActiveClass] = useState<any>(null);
  const deviceWidth = window.innerWidth;
  const {
    handleGetGeneralAttendance,
    loading,
    setLoading,
    attendance,
    handleGetClassAttendance,
    handleMarkAttendance,
  } = useAttendance();

  useEffect(() => {
    handleGetGeneralAttendance(
      page,
      perPage,
      moment(date).format("YYYY-MM-DD")
    );
    //eslint-disable-next-line
  }, [page, date]);

  const onSubmit = (data: any) => {
    handleMarkAttendance(data).then((res: any) => {
      setLoading(true);
      handleGetGeneralAttendance(
        page,
        perPage,
        moment(date).format("YYYY-MM-DD")
      );
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
          handleGetClassAttendance={handleGetClassAttendance}
          onSubmit={onSubmit}
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
            <div className="d-p-h-left">Attendance</div>

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
            className="d-p-search"
            style={{
              background: dark ? "#121212" : "#f8f9fa",
            }}
          >
            <Input
              sx={{
                maxWidth: "800px",
              }}
              icon={<Search size={16} />}
              placeholder="Search by class"
              rightSection={
                <AdjustmentsHorizontal
                  strokeWidth={1.4}
                  style={{ opacity: 0.5 }}
                  className="click"
                />
              }
            />
          </div>

          <Box sx={{ maxWidth: 800, minHeight: 173 }} className="d-p-main">
            {attendance && attendance.data && !loading ? (
              <>
                <Table striped>
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
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                      >
                        Class
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
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
                        (
                          item: {
                            classroom_id: string;
                            classroom_name: number;
                            total_present: string;
                            total_student: string;
                          },
                          index: number
                        ) => (
                          <tr key={item.classroom_id}>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                color: dark ? "#b3b7cb" : "#898989",
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
              position="center"
              mt={25}
              onChange={(value) => {
                if (value !== attendance.meta.current_page) {
                  setLoading(true);
                  setPage(value);
                }
              }}
              initialPage={attendance.meta.current_page}
              total={attendance.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Attendance;
