import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Text,
  Menu,
  Pagination,
  Skeleton,
  Alert,
  Group,
  Box,
  Table,
  ScrollArea,
} from "@mantine/core";
import {
  CirclePlus,
  ArrowLeft,
  ChevronDown,
  FileText,
} from "tabler-icons-react";
import AddAcademicTask from "../../components/modals/ClassWall/AddAcademicTask";
import useAcademicLog from "../../hooks/useAcademicLog";
import useSubject from "../../hooks/useSubject";
import { useSelector } from "react-redux";
import ViewAcademicTask from "../../components/modals/ClassWall/ViewAcademicTask";
import moment from "moment";

const AcdemicLog = () => {
  const { dark } = useTheme();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [academicLog, setAcademicLog] = useState<any>(null);
  const [activeSubjectId, setActiveSubjectId] = useState<string>("");
  const [activeSubjectName, setActiveSubjectName] = useState<string>("");
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);
  const [viewTaskModal, setViewTaskModal] = useState<boolean>(false);
  const { setLoading, loading, trigger, handleCreateTask, handleGetTasks } =
    useAcademicLog();
  const navigate = useNavigate();
  const { getSubjectList, allSubjects } = useSubject();
  const deviceWidth = window.innerWidth;
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (classWall?.activeClassId) {
      if (
        userdata?.role?.name === "Teacher" &&
        userdata?.user_id === classWall?.classes?.classroom_teacher?.staff_id
      ) {
        getSubjectList(1, 300, "", true, "", classWall?.activeClassId);
      } else if (
        userdata?.role?.name === "Teacher" &&
        userdata?.user_id !== classWall?.classes?.classroom_teacher?.staff_id
      ) {
        getSubjectList(
          1,
          300,
          "",
          true,
          userdata?.user_id,
          classWall?.activeClassId
        );
      } else {
        getSubjectList(1, 300, "", true, "");
      }
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (classWall?.activeClassId) {
      getResources();
    }

    //eslint-disable-next-line
  }, [activeSubjectId, page, trigger]);

  const getResources = () => {
    handleGetTasks(
      page,
      perPage,
      classWall?.activeClassId,
      activeSubjectId
    ).then((res: any) => {
      setAcademicLog(res);
    });
  };

  return (
    <Fragment>
      <Helmet>
        <title>{classWall?.activeClassName} Academic Log</title>
        <meta name="description" content="" />
        <meta
          property="og:title"
          content={`${classWall?.activeClassName} Acdemic Log`}
        />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addTaskModal}
        onClose={() => {
          setAddTaskModal(false);
        }}
        title={<Text weight={600}>Add Academic Task</Text>}
        size="lg"
      >
        <AddAcademicTask
          closeModal={() => {
            setAddTaskModal(false);
          }}
          submit={handleCreateTask}
          allSubjects={allSubjects}
        />
      </Modal>

      <Modal
        opened={viewTaskModal}
        onClose={() => {
          setViewTaskModal(false);
          setTimeout(() => {
            setTask(null);
          }, 500);
        }}
        title={
          <Text weight={600}>{task?.title ?? "Academic Task Details"}</Text>
        }
        size="xl"
      >
        <ViewAcademicTask
          closeModal={() => {
            setViewTaskModal(false);
            setTimeout(() => {
              setTask(null);
            }, 500);
          }}
          task={task}
          modalActive={viewTaskModal}
        />
      </Modal>

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header jump-line">
            <div className="d-p-h-left no-select">
              <span
                className="go-back click"
                onClick={() => {
                  navigate("/class-wall");
                }}
              >
                <ArrowLeft size={20} />
              </span>
              {classWall?.activeClassName && (
                <span style={{ opacity: "0.4" }}>
                  {classWall?.activeClassName}/{" "}
                </span>
              )}
              Academic Log
            </div>

            <div className="d-p-h-right">
              <Menu
                size="md"
                control={
                  <Button
                    size={deviceWidth < 768 ? "xs" : "sm"}
                    variant="default"
                    disabled={!classWall?.activeClassId}
                    rightIcon={<ChevronDown size={14} />}
                  >
                    <span style={{ textTransform: "capitalize" }}>
                      {activeSubjectId === ""
                        ? "All Subjects"
                        : activeSubjectName}
                    </span>
                  </Button>
                }
              >
                <Menu.Label>Subject List</Menu.Label>

                <Menu.Item
                  onClick={() => {
                    setLoading(true);
                    setActiveSubjectId("");
                    setActiveSubjectName("");
                  }}
                  disabled={activeSubjectId === ""}
                >
                  All Subjects
                </Menu.Item>

                {allSubjects.map(
                  (item: { subject_id: string; subject_name: string }) => (
                    <Menu.Item
                      key={item.subject_id}
                      onClick={() => {
                        setLoading(true);
                        setActiveSubjectId(item.subject_id);
                        setActiveSubjectName(item.subject_name);
                      }}
                      disabled={activeSubjectId === item.subject_id}
                    >
                      {item.subject_name.length > 21
                        ? `${item.subject_name.substring(0, 21)}...`
                        : item.subject_name}
                    </Menu.Item>
                  )
                )}
              </Menu>

              <Button
                size={deviceWidth < 768 ? "xs" : "sm"}
                ml="sm"
                leftIcon={<CirclePlus size={14} />}
                onClick={() => {
                  setAddTaskModal(true);
                }}
                disabled={userdata?.role?.name === "School Admin"}
              >
                Add Task
              </Button>
            </div>
          </div>

          {!classWall?.activeClassId && (
            <Group grow position="center" mt={120}>
              <Alert
                title="No classroom selected!"
                color="red"
                style={{ maxWidth: "360px" }}
              >
                Select a classroom from{" "}
                <span
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                  className="click no-select"
                  onClick={() => {
                    navigate("/class-wall");
                  }}
                >
                  Class Wall
                </span>{" "}
                to continue.
              </Alert>
            </Group>
          )}

          {classWall?.activeClassId && (
            <Box
              mt={40}
              sx={{ maxWidth: 1000, minHeight: 173 }}
              className="d-p-main"
            >
              {academicLog && academicLog.data && !loading ? (
                <ScrollArea>
                  <Table striped verticalSpacing="md" sx={{ minWidth: 900 }}>
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
                          Task Title
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          Subject
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          Date Created
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          Due Date
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
                      {academicLog?.data.map(
                        (
                          item: {
                            task_id: string;
                            title: string;
                            end_at: string;
                            created_at: string;
                            subject: {
                              name: string;
                              subject_id: string;
                            };
                          },
                          index: number
                        ) => (
                          <tr key={item.task_id}>
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
                                fontWeight: "600",
                              }}
                            >
                              {item?.title}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {item?.subject?.name}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {moment(item?.created_at).format("Do MMM, YYYY")}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {moment(item?.end_at).format("Do MMM, YYYY")}
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
                                size="md"
                              >
                                <Menu.Label>Resource Menu</Menu.Label>
                                <Menu.Item
                                  icon={<FileText size={14} />}
                                  onClick={() => {
                                    setViewTaskModal(true);
                                    setTask(item);
                                  }}
                                >
                                  View Task
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>

                  {academicLog?.data.length === 0 && (
                    <Group grow position="center" my={80}>
                      <Alert
                        title="Bummer!"
                        color="red"
                        style={{ maxWidth: "350px" }}
                      >
                        No task found.
                      </Alert>
                    </Group>
                  )}
                </ScrollArea>
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
          )}

          {academicLog?.meta && academicLog?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 1000 }}
              position="center"
              mt={25}
              onChange={(value) => {
                if (value !== academicLog.meta.current_page) {
                  setPage(value);
                }
              }}
              initialPage={academicLog.meta.current_page}
              total={academicLog.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AcdemicLog;
