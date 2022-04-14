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
  Divider,
  Avatar,
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
import ClassStudents from "../../components/modals/Class/ClassStudents";
import useStudent from "../../hooks/useStudent";

const Classes = () => {
  const { dark } = useTheme();
  const [classStudentsModal, setClassStudentsModal] = useState<boolean>(false);

  const { students, handleGetStudents, loading, setLoading } = useStudent();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [classId, setClassId] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    handleGetStudents(page, perPage);
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
        opened={classStudentsModal}
        onClose={() => {
          setClassStudentsModal(false);
          setClassId("");
        }}
        title={<Text weight={600}>{className ?? "Class"} Students</Text>}
        size="lg"
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

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left">Students</div>

            <div className="d-p-h-right">
              <Button variant="light" component={Link} to="/add-student">
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
            {students.data && !loading ? (
              <Table highlightOnHover striped>
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
                      className="large-only"
                    >
                      Picture
                    </th>
                    <th
                      style={{
                        borderBottom: `1px solid #0000`,
                        color: dark ? "#b3b7cb" : "#898989",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        borderBottom: `1px solid #0000`,
                        color: dark ? "#b3b7cb" : "#898989",
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
                  {students?.data.map(
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
                            color: dark ? "#b3b7cb" : "#898989",
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
                            <Menu.Label>Class Menu</Menu.Label>
                            <Menu.Item
                              icon={<Users size={14} />}
                              // onClick={() => {
                              //   setClassName(item.classroom_name);
                              //   setClassId(item.classroom_id);
                              //   setClassStudentsModal(true);
                              // }}
                            >
                              Students
                            </Menu.Item>
                            <Menu.Item icon={<Book size={14} />}>
                              Subjects
                            </Menu.Item>
                            <Menu.Item icon={<ClipboardList size={14} />}>
                              Class Wall
                            </Menu.Item>
                            <Divider />
                            <Menu.Item icon={<Edit size={14} />}>
                              Edit Class
                            </Menu.Item>
                          </Menu>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
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

          {students?.meta && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setLoading(true);
                setPage(value);
              }}
              initialPage={students.meta.current_page}
              total={students.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Classes;

// eslint-disable-next-line no-lone-blocks
{
  /* <Button
  variant="subtle"
  component={Link}
  to={`/classes/${item.classroom_id}`}
  state={{ classId: item.classroom_id }}
>
  View Class
</Button>; */
}
