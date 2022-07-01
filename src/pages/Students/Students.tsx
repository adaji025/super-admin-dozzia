import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Button,
  Input,
  Modal,
  Text,
  Table,
  Box,
  Skeleton,
  Pagination,
  Menu,
  Avatar,
  Group,
  Alert,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import {
  AdjustmentsHorizontal,
  Search,
  PlaylistAdd,
  User,
} from "tabler-icons-react";
import AddStudentToClass from "../../components/modals/Student/AddStudentToClass";
import useStudent from "../../hooks/useStudent";
import useClass from "../../hooks/useClass";

const Students = () => {
  const { dark } = useTheme();
  const [addToClassModal, setAddToClassModal] = useState<boolean>(false);
  const { students, handleGetStudents, loading } = useStudent();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [studentInfo, setStudentInfo] = useState<{
    fullName: string;
    studentId: string;
    username: string;
  } | null>(null);
  const deviceWidth = window.innerWidth;
  const { allClasses, getClassList } = useClass();

  useEffect(() => {
    handleGetStudents(page, perPage);
    getClassList(1, 200, true);
    //eslint-disable-next-line
  }, [page]);

  return (
    <Fragment>
      <Helmet>
        <title>Students</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Students" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addToClassModal}
        onClose={() => {
          setAddToClassModal(false);
          setStudentInfo(null);
        }}
        title={<Text weight={600}>Add to Class</Text>}
        size="lg"
      >
        <AddStudentToClass
          closeModal={() => {
            setAddToClassModal(false);
            setStudentInfo(null);
          }}
          student={studentInfo}
          modalActive={addToClassModal}
          allClasses={allClasses}
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
            <div className="d-p-h-left no-select">Students</div>

            <div className="d-p-h-right">
              <Button component={Link} to="/add-student">
                Add Student
              </Button>
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
                maxWidth: "900px",
              }}
              icon={<Search size={16} />}
              placeholder="Search student (not working yet)"
              rightSection={
                <AdjustmentsHorizontal
                  strokeWidth={1.4}
                  style={{ opacity: 0.5 }}
                  className="click"
                />
              }
            />
          </div>

          <Box sx={{ maxWidth: 900, minHeight: 173 }} className="d-p-main">
            {students && students.data && !loading ? (
              <>
                <Table striped verticalSpacing="sm">
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
                    {students?.data.length > 0 &&
                      students?.data.map(
                        (
                          item: {
                            student_id: string;
                            first_name: number;
                            last_name: string;
                            picture: string;
                            username: string;
                          },
                          index: number
                        ) => (
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
                              {item.username}
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
                                  icon={<PlaylistAdd size={14} />}
                                  onClick={() => {
                                    setStudentInfo({
                                      fullName: `${item.first_name} ${item.last_name}`,
                                      studentId: item.student_id,
                                      username: item.username,
                                    });
                                    setAddToClassModal(true);
                                  }}
                                >
                                  Add to Class
                                </Menu.Item>
                                <Menu.Item icon={<User size={14} />}>
                                  View Student
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>

                {students?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No student found.
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

          {students?.meta && students?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setPage(value);
              }}
              initialPage={students.meta.current_page}
              total={students.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Students;
