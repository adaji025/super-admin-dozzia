import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Table,
  Box,
  Skeleton,
  Pagination,
  Menu,
  ScrollArea,
  Group,
  Alert,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { ClipboardList, Users, Book, Edit } from "tabler-icons-react";
import useReports from "../../hooks/useReports";

const Reports = () => {
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
  const { handleGetReports, reports, loading, setLoading } = useReports();

  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [classId, setClassId] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [classSubjects, setClassSubjects] = useState<any>(null);
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    handleGetReports(page, perPage);

    //eslint-disable-next-line
  }, [page]);

  return (
    <Fragment>
      <Helmet>
        <title>Reports & Complaints</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Reports & Complaints" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      {/* <Modal
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
        </Modal> */}

      {/* <Modal
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
        </Modal> */}

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left">Reports and Complaints</div>

            <div className="d-p-h-right"></div>
          </div>

          <Box
            mt={40}
            sx={{ maxWidth: 1300, minHeight: 173 }}
            className="d-p-main"
          >
            {reports && reports?.data && !loading ? (
              <>
                <ScrollArea>
                  <Table striped verticalSpacing="md" sx={{ minWidth: 900 }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        ></th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Issue Number
                        </th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Title
                        </th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Created By
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Date
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Status
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Comment
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
                      {reports?.data.map(
                        (
                          item: {
                            comment: string;
                            date: string;
                            id: string;
                            status: string;
                            student: {
                              id: string;
                              first_name: string;
                              last_name: string;
                            };
                            parent: {
                              id: string;
                              first_name: string;
                              last_name: string;
                            };
                            title: string;
                            tracking_code: string;
                          },
                          index: number
                        ) => (
                          <tr key={item.id}>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                color: dark ? "#b3b7cb" : "#898989",
                              }}
                            >
                              {index + 1}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "600",
                              }}
                            >
                              {item?.tracking_code}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {item?.title}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {`${item?.parent?.first_name} ${item?.parent?.last_name}`}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              {item.date}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.status}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.comment}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                width: "20px",
                              }}
                              className="table-last"
                            >
                              <Menu
                                position="bottom"
                                gutter={15}
                                withArrow
                                size="sm"
                              >
                                <Menu.Label>Class Menu</Menu.Label>
                                <Menu.Item
                                  icon={<Users size={14} />}
                                  onClick={() => {
                                    setClassStudentsModal(true);
                                  }}
                                >
                                  Students
                                </Menu.Item>

                                <Menu.Item icon={<ClipboardList size={14} />}>
                                  Class Wall
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </ScrollArea>
                {reports?.data.length === 0 && (
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

          {reports?.meta && reports?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 1100 }}
              position="center"
              mt={25}
              onChange={(value) => {
                if (value !== reports.meta.current_page) {
                  setLoading(true);
                  setPage(value);
                }
              }}
              initialPage={reports.meta.current_page}
              total={reports.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Reports;
