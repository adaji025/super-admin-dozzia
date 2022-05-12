import { Fragment, useState, useEffect } from "react";
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
  Divider,
  Group,
  Alert,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import {
  AdjustmentsHorizontal,
  Search,
  ClipboardList,
  Users,
  Book,
  Edit,
} from "tabler-icons-react";
import AddClass from "../../components/modals/Class/AddClass";
import ClassStudents from "../../components/modals/Class/ClassStudents";
import useClass from "../../hooks/useClass";
import ClassSubjects from "../../components/modals/Class/ClassSubjects";
import "./classes.scss";

const Classes = () => {
  const { dark } = useTheme();
  const [addClassModal, setAddClassModal] = useState<boolean>(false);
  const [classStudentsModal, setClassStudentsModal] = useState<boolean>(false);
  const [classSubjectsModal, setClassSubjectsModal] = useState<boolean>(false);
  const [editClass, setEditClass] = useState<null | {
    classroom_id: string;
    classroom_level: string;
    classroom_name: string;
    classroom_teacher: string;
    classroom_description: string;
  }>(null);
  const { getClassList, loading, handleAddClass, handleUpdateClass, classes } =
    useClass();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [classId, setClassId] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [classSubjects, setClassSubjects] = useState<any>(null);
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    getClassList(page, perPage);
    //eslint-disable-next-line
  }, [page]);

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
          setEditClass(null);
        }}
        title={<Text weight={600}>{editClass ? "Edit" : "Add"} Class</Text>}
        size="lg"
      >
        <AddClass
          closeModal={() => {
            setAddClassModal(false);
            setEditClass(null);
          }}
          edit={editClass}
          submit={editClass ? handleUpdateClass : handleAddClass}
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
          setClassSubjects([]);
        }}
        title={<Text weight={600}>{className ?? "Class"} Subjects</Text>}
        size="xl"
      >
        <ClassSubjects
          closeModal={() => {
            setClassSubjectsModal(false);
            setClassSubjects([]);
          }}
          subjects={classSubjects}
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
            <div className="d-p-h-left">Classes</div>

            <div className="d-p-h-right">
              <Button
                variant="light"
                onClick={() => {
                  setAddClassModal(true);
                }}
              >
                Add Class
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
              placeholder="Search class (not working yet)"
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
            {classes && classes.data && !loading ? (
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
                        Class Name
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                      >
                        Class Teacher
                      </th>
                      <th
                        className="large-only"
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
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
                    {classes?.data.map(
                      (
                        item: {
                          classroom_id: string;
                          classroom_level: number;
                          classroom_name: string;
                          classroom_description: string;
                          classroom_teacher: {
                            title: string;
                            first_name: string;
                            last_name: string;
                            staff_id: string;
                          };
                          subjects_and_teachers: any;
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
                              fontWeight: "600",
                            }}
                          >
                            {item.classroom_name}
                          </td>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                              color: dark ? "#b3b7cb" : "#898989",
                            }}
                          >
                            {`${item.classroom_teacher.title} ${item.classroom_teacher.first_name} ${item.classroom_teacher.last_name}`}
                          </td>
                          <td
                            className="large-only"
                            style={{
                              borderBottom: `1px solid #0000`,
                              paddingLeft: "30px",
                              color: dark ? "#b3b7cb" : "#898989",
                              fontWeight: "500",
                            }}
                          >
                            {item.classroom_level}
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
                                  setClassName(item.classroom_name);
                                  setClassId(item.classroom_id);
                                  setClassStudentsModal(true);
                                }}
                              >
                                Students
                              </Menu.Item>
                              <Menu.Item
                                icon={<Book size={14} />}
                                onClick={() => {
                                  setClassName(item.classroom_name);
                                  setClassSubjects(item.subjects_and_teachers);
                                  setClassSubjectsModal(true);
                                }}
                              >
                                Subjects
                              </Menu.Item>
                              <Menu.Item icon={<ClipboardList size={14} />}>
                                Class Wall
                              </Menu.Item>
                              <Divider />
                              <Menu.Item
                                icon={<Edit size={14} />}
                                onClick={() => {
                                  setEditClass({
                                    classroom_id: item.classroom_id,
                                    classroom_name: item.classroom_name,
                                    classroom_level:
                                      item.classroom_level.toString(),
                                    classroom_description:
                                      item.classroom_description,
                                    classroom_teacher:
                                      item.classroom_teacher.staff_id,
                                  });
                                  setAddClassModal(true);
                                }}
                              >
                                Edit Class
                              </Menu.Item>
                            </Menu>
                          </td>
                        </tr>
                      )
                    )}
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
              position="center"
              mt={25}
              onChange={(value) => {
                setPage(value);
              }}
              initialPage={classes.meta.current_page}
              total={classes.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Classes;
