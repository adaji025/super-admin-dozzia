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
  Badge,
  Menu,
  Divider,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import {
  AdjustmentsHorizontal,
  Search,
  ClipboardList,
  Users,
  Book,
  Trash,
} from "tabler-icons-react";
import AddClass from "../../components/modals/AddClass";
import useClass from "../../hooks/useClass";
import "./classes.scss";

const Classes = () => {
  const { dark } = useTheme();
  const [addClassModal, setAddClassModal] = useState<boolean>(false);
  const { getClassList, classes, loading, setLoading, handleAddClass } =
    useClass();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);

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
        onClose={() => setAddClassModal(false)}
        title={<Text weight={600}>Add Class</Text>}
        size="lg"
      >
        <AddClass
          closeModal={() => {
            setAddClassModal(false);
          }}
          submit={handleAddClass}
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
            {classes.data && !loading ? (
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
                        classroom_teacher: {
                          title: string;
                          first_name: string;
                          last_name: string;
                        };
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
                          }}
                        >
                          <Badge size="lg" radius="xl" color="red">
                            {item.classroom_level}
                          </Badge>
                        </td>
                        <td
                          style={{
                            borderBottom: `1px solid #0000`,
                            width: "20px",
                          }}
                          className="table-last"
                        >
                          {/* <Button
                            variant="subtle"
                            component={Link}
                            to={`/classes/${item.classroom_id}`}
                            state={{ classId: item.classroom_id }}
                          >
                            View Class
                          </Button> */}
                          <Menu
                            position="right"
                            gutter={15}
                            withArrow
                            size="sm"
                          >
                            <Menu.Label>Class Menu</Menu.Label>
                            <Menu.Item icon={<Users size={14} />}>
                              Students
                            </Menu.Item>
                            <Menu.Item icon={<Book size={14} />}>
                              Subjects
                            </Menu.Item>
                            <Menu.Item icon={<Users size={14} />}>
                              Teachers
                            </Menu.Item>
                            <Menu.Item icon={<ClipboardList size={14} />}>
                              Class Wall
                            </Menu.Item>
                            <Divider />
                            <Menu.Item color="red" icon={<Trash size={14} />}>
                              Delete class
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

          {classes?.meta && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setLoading(true);
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
