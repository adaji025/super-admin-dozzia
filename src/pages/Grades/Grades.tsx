import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
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
import { X, Search, CheckupList, Book, Edit } from "tabler-icons-react";
import AddGrade from "../../components/modals/Grades/AddGrade";
import AssignToClass from "../../components/modals/Subject/AssignToClass";
import SubjectClasses from "../../components/modals/Subject/SubjectClasses";
import useGrades from "../../hooks/useGrades";

const Grades = () => {
  const { dark } = useTheme();
  const { loading, grades, setLoading, handleAddGrade } = useGrades();

  const [addGradeModal, setAddGradeModal] = useState<boolean>(false);
  const [activeSubject, setActiveSubject] = useState<
    | any
    | {
        subject_id: string;
        subject_name: string;
        subject_category: string;
        subject_description: string;
      }
  >(null);

  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    //eslint-disable-next-line
  }, [page, search]);

  return (
    <Fragment>
      <Helmet>
        <title>Grades</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Grades" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>
      <Modal
        opened={addGradeModal}
        onClose={() => {
          setAddGradeModal(false);
          setActiveSubject(null);
        }}
        title={<Text weight={600}>Add Grade</Text>}
        size="lg"
      >
        <AddGrade
          closeModal={() => {
            setAddGradeModal(false);
          }}
          submit={handleAddGrade}
          loading={loading}
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
            <div className="d-p-h-left no-select">School Grades</div>

            <div className="d-p-h-right">
              <Button
                onClick={() => {
                  setAddGradeModal(true);
                }}
              >
                Add Grade
              </Button>
            </div>
          </div>

          <Box
            mt={40}
            sx={{ maxWidth: 900, minHeight: 173 }}
            className="d-p-main"
          >
            {grades && grades.data && !loading ? (
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
                        Subject Name
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Category
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
                    {grades?.data.map(
                      (
                        item: {
                          subject_id: string;
                          subject_name: string;
                          subject_category: string;
                          subject_description: string;
                        },
                        index: number
                      ) => (
                        <tr key={item.subject_id}>
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
                            {item.subject_name}
                          </td>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                            }}
                          >
                            {item.subject_category}
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
                              <Menu.Label>Grade Menu</Menu.Label>

                              <Divider />
                              <Menu.Item
                                icon={<Edit size={14} />}
                                onClick={() => {
                                  setActiveSubject({
                                    subject_id: item.subject_id,
                                    subject_name: item.subject_name,
                                    subject_category: item.subject_category,
                                    subject_description:
                                      item.subject_description,
                                  });
                                  setAddGradeModal(true);
                                }}
                              >
                                Edit Subject
                              </Menu.Item>
                            </Menu>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>

                {grades?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No subject found.
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

          {grades?.meta && grades?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setPage(value);
              }}
              initialPage={grades.meta.current_page}
              total={grades.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Grades;
