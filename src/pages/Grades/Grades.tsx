import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Modal,
  Text,
  Table,
  Box,
  Skeleton,
  Menu,
  Divider,
  Group,
  Alert,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { Trash } from "tabler-icons-react";
import AddGrade from "../../components/modals/Grades/AddGrade";
import useGrades from "../../hooks/useGrades";

const Grades = () => {
  const { dark } = useTheme();
  const { loading, grades, handleAddGrade, handleGetGrades } = useGrades();

  const [addGradeModal, setAddGradeModal] = useState<boolean>(false);
  const [gradeId, setGradeId] = useState<string>("");

  const deviceWidth = window.innerWidth;

  useEffect(() => {
    handleGetGrades();
    //eslint-disable-next-line
  }, []);

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
                      >
                        Grade
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Score Range
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Remark
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
                      (item: {
                        id: string;
                        name: string;
                        remark: string;
                        min_score: number;
                        max_score: number;
                      }) => (
                        <tr key={item?.id}>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                              fontWeight: "600",
                            }}
                          >
                            {item?.name}
                          </td>

                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                            }}
                          >
                            {item?.min_score} - {item?.max_score}
                          </td>

                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                            }}
                          >
                            {item?.remark}
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
                                color="red"
                                icon={<Trash size={14} />}
                                onClick={() => {
                                  setGradeId(item?.id);
                                }}
                              >
                                Delete Grade
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
        </div>
      </div>
    </Fragment>
  );
};

export default Grades;
