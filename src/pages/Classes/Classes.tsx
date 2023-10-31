import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Divider,
  Group,
  Alert,
  ScrollArea,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import {
  X,
  Search,
  ClipboardList,
  Users,
  Book,
  Edit,
  Filter,
} from "tabler-icons-react";
import AddClass from "../../components/modals/Class/AddClass";
import ClassStudents from "../../components/modals/Class/ClassStudents";
import useClass from "../../hooks/useClass";
import { setClassWall } from "../../redux/data/data.actions";
import ClassSubjects from "../../components/modals/Class/ClassSubjects";
import "./classes.scss";
import { UserState } from "../../redux/user/user.reducer";
import { Roles } from "../../types/authTypes";
import { ClassroomType, CreateClassData } from "../../types/classTypes";

const Classes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const [addClassModal, setAddClassModal] = useState<boolean>(false);
  const [classStudentsModal, setClassStudentsModal] = useState<boolean>(false);
  const [classSubjectsModal, setClassSubjectsModal] = useState<boolean>(false);
  const [editClass, setEditClass] = useState<null | ClassroomType>(null);
  const {
    getClassList,
    loading,
    setLoading,
    handleAddClass,
    handleUpdateClass,
    classes,
    classLevels,
  } = useClass();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [classId, setClassId] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const deviceWidth = window.innerWidth;
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });
  const userdata = useSelector((state: { user: UserState }) => {
    return state.user.userdata;
  });
  useEffect(() => {
    if (userdata?.role?.name === Roles.Teacher) {
      getClassList(page, perPage, level, search, false, userdata.staff_id);
    } else {
      getClassList(page, perPage, level, search);
    }
    //eslint-disable-next-line
  }, [page, level, search]);


  return (
    <Fragment>
      <Helmet>
        <title>Classes</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Classes" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addClassModal}
        onClose={() => {
          setAddClassModal(false);
          setTimeout(() => {
            setEditClass(null);
          }, 500);
        }}
        title={<Text weight={600}>{editClass ? "Edit" : "Add"} Class</Text>}
        size="lg"
      >
        <AddClass
          closeModal={() => {
            setAddClassModal(false);
            setTimeout(() => {
              setEditClass(null);
            }, 500);
          }}
          edit={editClass}
          submit={(values: CreateClassData, classId?: string) => {
            if (classId) {
              handleUpdateClass(values, classId);
            } else {
              handleAddClass(values);
            }
          }}
          modalActive={addClassModal}
        />
      </Modal>

      <Modal
        opened={classStudentsModal}
        onClose={() => {
          setClassStudentsModal(false);
          setClassId("");
        }}
        title={<Text weight={600}>{className ?? "Class"}</Text>}
        size="xl"
      >
        <ClassStudents
          closeModal={() => {
            setClassStudentsModal(false);
            setClassId("");
          }}
          classId={classId}
          modalActive={classStudentsModal}
        />
      </Modal>

      <Modal
        opened={classSubjectsModal}
        onClose={() => {
          setClassSubjectsModal(false);
          setClassId("");
        }}
        title={<Text weight={600}>{className ?? "Class"} Subjects</Text>}
        size="xl"
      >
        <ClassSubjects
          closeModal={() => {
            setClassSubjectsModal(false);
            setClassId("");
          }}
          classId={classId}
          modalActive={classSubjectsModal}
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
            <div className="d-p-h-left no-select">Classes</div>

            <div className="d-p-h-right">
              <Button
                onClick={() => {
                  setAddClassModal(true);
                }}
                disabled={
                  userdata?.role?.name !== Roles.SchoolAdmin &&
                  userdata?.role?.name !== Roles.Principal
                }
              >
                Add Class
              </Button>
            </div>
          </div>

          <div
            className="d-p-search with-btns next"
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
                placeholder="Search class, class teacher"
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

            <div className="s-right next">
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

              <Menu
                size="sm"
                sx={{ maxHeight: 400 }}
                placement="end"
                control={
                  <Button
                    leftIcon={<Filter size={14} />}
                    ml="sm"
                    variant="default"
                  >
                    Level
                  </Button>
                }
              >
                <Fragment>
                  <Menu.Label>Level Menu</Menu.Label>

                  <ScrollArea style={{ height: 200 }}>
                    <Menu.Item
                      onClick={() => {
                        setLoading(true);
                        setLevel("");
                      }}
                      disabled={level === ""}
                    >
                      All Levels
                    </Menu.Item>

                    {classLevels.map((item: string) => (
                      <Menu.Item
                        onClick={() => {
                          setLoading(true);
                          setLevel(item);
                        }}
                        disabled={level === item}
                        key={item}
                      >
                        {item}
                      </Menu.Item>
                    ))}
                  </ScrollArea>
                </Fragment>
              </Menu>
            </div>
          </div>
          <Box sx={{ maxWidth: 900, minHeight: 173 }} className="d-p-main">
            {classes.dataFetched && !loading ? (
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
                        Class Name
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Class Teacher
                      </th>
                      <th
                        className="large-only"
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Class Level
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
                    {classes?.data.map((item: ClassroomType, index: number) => (
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
                            fontWeight: "600",
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          {`${item.class_teacher?.title ?? ""} ${
                            item.class_teacher?.first_name ?? ""
                          } ${item?.class_teacher?.last_name ?? ""}`}
                        </td>
                        <td
                          className="large-only"
                          style={{
                            borderBottom: `1px solid #0000`,
                            paddingLeft: "30px",

                            fontWeight: "500",
                          }}
                        >
                          {item.level}
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
                            <Menu.Label>Class Menu</Menu.Label>
                            <Menu.Item
                              icon={<Users size={14} />}
                              onClick={() => {
                                setClassName(item.name);
                                setClassId(item.classroom_id);
                                setClassStudentsModal(true);
                              }}
                            >
                              Students
                            </Menu.Item>
                            <Menu.Item
                              icon={<Book size={14} />}
                              onClick={() => {
                                setClassName(item.name);
                                setClassId(item.classroom_id);
                                setClassSubjectsModal(true);
                              }}
                            >
                              Subjects
                            </Menu.Item>
                            <Menu.Item
                              icon={<ClipboardList size={14} />}
                              onClick={() => {
                                dispatch(
                                  setClassWall({
                                    ...classWall,
                                    activeClassName: item.name,
                                    activeClassId: item?.classroom_id,
                                    classTeacherId:
                                      item.class_teacher?.staff_id,
                                  })
                                );
                                navigate("/class-wall");
                              }}
                            >
                              Class Wall
                            </Menu.Item>

                            {(userdata?.role?.name === Roles.SchoolAdmin ||
                              userdata?.role?.name === Roles.Principal) && (
                              <>
                                <Divider />

                                <Menu.Item
                                  icon={<Edit size={14} />}
                                  onClick={() => {
                                    setEditClass(item);
                                    setAddClassModal(true);
                                  }}
                                >
                                  Edit Class
                                </Menu.Item>
                              </>
                            )}
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {classes?.data.length === 0 && (
                  <Group grow position="center" my={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No class found.
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

          {classes?.meta && classes?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="left"
              mt={25}
              onChange={(value) => {
                if (value !== classes.meta.current_page) {
                  setPage(value);
                }
              }}
              initialPage={classes.meta.current_page}
              total={classes.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Classes;
