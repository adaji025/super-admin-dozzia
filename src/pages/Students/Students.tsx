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
import { X, Search, PlaylistAdd, User } from "tabler-icons-react";
import AddStudentToClass from "../../components/modals/Student/AddStudentToClass";
import StudentDetails from "../../components/modals/Student/StudentDetails";
import useStudent from "../../hooks/useStudent";
import useClass from "../../hooks/useClass";
import { StudentType } from "../../types/studentTypes";
import AddStudentPrompt from "../../components/modals/Student/AddStudentPrompt";
import UploadStudent from "../../components/modals/Student/UploadStudent";
import { importStudent } from "../../services/student/student";
import { showNotification } from "@mantine/notifications";
import useNotification from "../../hooks/useNotification";

const Students = () => {
  const { dark } = useTheme();
  const [addToClassModal, setAddToClassModal] = useState<boolean>(false);
  const [studentDetailsModal, setStudentDetailsModal] =
    useState<boolean>(false);
  const { students, handleGetStudents, loading, setLoading } = useStudent();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [studentInfo, setStudentInfo] = useState<{
    fullName: string;
    studentId: string;
    username: string;
  } | null>(null);
  const [opeExcelModal, setOpenExcelModal] = useState<boolean>(false);
  const [addStudentPrompt, setAddStudentPrompt] = useState<boolean>(false);
  const [excelFile, setExcelFile] = useState<any>(null);
  const deviceWidth = window.innerWidth;
  const { allClasses, getClassList } = useClass();

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetStudents(page, perPage, search);
    getClassList(1, 200, "", "", true);
    //eslint-disable-next-line
  }, [page, search]);

  const handleUploadExcelFile = () => {
    setLoading(true);

    let formData = new FormData();
    formData.append("file_import", excelFile);

    importStudent(formData)
      .then(() => {
        setOpenExcelModal(false);
        showNotification({
          title: "Success",
          message: "File uploaded Successfully",
          color: "green",
        });
        handleGetStudents(page, perPage, search);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        }}
        title={<Text weight={600}>Add to Class</Text>}
        size="lg"
      >
        <AddStudentToClass
          closeModal={() => {
            setAddToClassModal(false);
          }}
          student={studentInfo}
          allClasses={allClasses}
          callback={() => handleGetStudents(page, perPage, "")}
        />
      </Modal>

      <Modal
        opened={studentDetailsModal}
        onClose={() => {
          setStudentDetailsModal(false);
          setTimeout(() => {
            setStudentInfo(null);
          }, 500);
        }}
        title={<Text weight={600}>{studentInfo?.fullName}</Text>}
        size="lg"
      >
        <StudentDetails
          closeModal={() => {
            setStudentDetailsModal(false);
            setTimeout(() => {
              setStudentInfo(null);
            }, 500);
          }}
          student={studentInfo}
          modalActive={studentDetailsModal}
        />
      </Modal>

      <AddStudentPrompt
        opened={addStudentPrompt}
        close={() => setAddStudentPrompt(false)}
        openNext={() => setOpenExcelModal(true)}
      />
      <UploadStudent
        opened={opeExcelModal}
        close={() => setOpenExcelModal(false)}
        file={excelFile}
        setFile={setExcelFile}
        handleUploadExcelFile={handleUploadExcelFile}
      />

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
              <Button onClick={() => setAddStudentPrompt(true)}>
                Add Student
              </Button>
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
                placeholder="Search student"
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
                  if (searchInput !== "" && search !== searchInput) {
                    setLoading(true);
                    setSearch(searchInput);
                  }
                }}
              >
                Search
              </Button>
            </div>
          </div>

          <Box sx={{ maxWidth: 900, minHeight: 173 }} className="d-p-main">
            {!loading ? (
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
                        Class
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
                      students?.data.map((item: StudentType, index: number) => (
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
                            {item?.current_class?.classroom?.name ?? "--"}
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
                                    username: item.reg_no,
                                  });
                                  setAddToClassModal(true);
                                }}
                              >
                                Add to Class
                              </Menu.Item>
                              <Menu.Item
                                icon={<User size={14} />}
                                onClick={() => {
                                  setStudentDetailsModal(true);
                                  setStudentInfo({
                                    fullName: `${item?.first_name} ${item?.last_name}`,
                                    studentId: item.student_id,
                                    username: item.reg_no,
                                  });
                                }}
                              >
                                View Student
                              </Menu.Item>
                            </Menu>
                          </td>
                        </tr>
                      ))}
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
              mt={25}
              onChange={(value) => {
                if (value !== students.meta.current_page) {
                  setLoading(true);
                  setPage(value);
                }
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
