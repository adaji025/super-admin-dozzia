import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import {
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
  Avatar,
} from "@mantine/core";
import { ArrowLeft, FileText } from "tabler-icons-react";
import { useSelector } from "react-redux";
import ViewBehaviouralLog from "../../components/modals/ClassWall/ViewBehaviouralLog";
import useClass from "../../hooks/useClass";
import { StudentType } from "../../types/studentTypes";

const BehaviouralLog = () => {
  const { dark } = useTheme();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(50);
  const [viewLogModal, setViewLogModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const deviceWidth = window.innerWidth;
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });
  const [student, setStudent] = useState<StudentType | null>(null);
  const { handleGetClassStudents, classStudents, loading } = useClass();

  useEffect(() => {
    if (classWall?.activeClassId) {
      handleGetClassStudents(classWall?.activeClassId, page, perPage);
    }

    //eslint-disable-next-line
  }, [page]);

  return (
    <Fragment>
      <Helmet>
        <title>{classWall?.activeClassName} Behavioural Log</title>
        <meta name="description" content="" />
        <meta
          property="og:title"
          content={`${classWall?.activeClassName} Behavioural Log`}
        />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={viewLogModal}
        onClose={() => {
          setViewLogModal(false);
          setTimeout(() => {
            setStudent(null);
          }, 500);
        }}
        title={
          <Text weight={600}>
            {student?.first_name} {student?.last_name}
          </Text>
        }
        size="xl"
      >
        <ViewBehaviouralLog
          closeModal={() => {
            setViewLogModal(false);
            setTimeout(() => {
              setStudent(null);
            }, 500);
          }}
          studentId={student?.student_id ?? ""}
          modalActive={viewLogModal}
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
              Behavioural Log
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
              sx={{ maxWidth: 900, minHeight: 173 }}
              className="d-p-main"
            >
              {classStudents.dataFetched && !loading ? (
                <ScrollArea>
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
                          className="large-only"
                        >
                          Picture
                        </th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          Reg No.
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
                      {classStudents?.data.length > 0 &&
                        classStudents?.data.map(
                          (item: StudentType, index: number) => (
                            <tr key={item.student_id}>
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
                                }}
                                className="large-only"
                              >
                                <Avatar
                                  className="avatar"
                                  src={item?.picture ? item?.picture : null}
                                  radius="xl"
                                />
                              </td>
                              <td
                                style={{
                                  borderBottom: `1px solid #0000`,
                                  fontWeight: "500",
                                }}
                              >
                                {`${item.first_name} ${item.last_name}`}
                              </td>
                              <td
                                style={{
                                  borderBottom: `1px solid #0000`,
                                }}
                              >
                                {item.reg_no}
                              </td>
                              <td
                                style={{
                                  borderBottom: `1px solid #0000`,
                                  width: "20px",
                                }}
                                className="table-last"
                              >
                                <Menu
                                  position={
                                    deviceWidth < 576 ? "left" : "right"
                                  }
                                  gutter={15}
                                  withArrow
                                  size="sm"
                                >
                                  <Menu.Label>Menu</Menu.Label>

                                  <Menu.Item
                                    icon={<FileText size={14} />}
                                    onClick={() => {
                                      setViewLogModal(true);
                                      setStudent(item);
                                    }}
                                  >
                                    Open Log
                                  </Menu.Item>
                                </Menu>
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </Table>

                  {classStudents?.data.length === 0 && (
                    <Group grow position="center" mt={80}>
                      <Alert
                        title="Bummer!"
                        color="red"
                        style={{ maxWidth: "300px" }}
                      >
                        Class is empty.
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

          {classStudents?.meta && classStudents?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="left"
              mt={25}
              onChange={(value) => {
                if (value !== classStudents.meta.current_page) {
                  setPage(value);
                }
              }}
              initialPage={classStudents.meta.current_page}
              total={classStudents.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BehaviouralLog;
