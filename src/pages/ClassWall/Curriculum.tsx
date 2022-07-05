import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Text,
  Table,
  Box,
  Skeleton,
  Menu,
  Group,
  Alert,
} from "@mantine/core";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import { Book, ArrowLeft } from "tabler-icons-react";
import useSubject from "../../hooks/useSubject";
import ViewCurriculum from "../../components/modals/ClassWall/ViewCurriculum";

const Curriculum = () => {
  const { dark } = useTheme();
  const { allSubjects, getSubjectList, loading } = useSubject();

  const [curriculumModal, setCurriculumModal] = useState<boolean>(false);
  const [activeSubject, setActiveSubject] = useState<
    | any
    | {
        subject_id: string;
        subject_name: string;
        subject_category: string;
      }
  >(null);

  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });

  const [page] = useState<number>(1);
  const [perPage] = useState<number>(300);
  const deviceWidth = window.innerWidth;
  const navigate = useNavigate();

  useEffect(() => {
    if (classWall?.activeClassId) {
      if (
        userdata?.user_id === classWall?.classes?.classroom_teacher?.staff_id
      ) {
        getSubjectList(1, perPage, "", true, "", classWall?.activeClassId);
      } else if (
        userdata?.user_id !== classWall?.classes?.classroom_teacher?.staff_id
      ) {
        getSubjectList(
          1,
          perPage,
          "",
          true,
          userdata?.user_id,
          classWall?.activeClassId
        );
      } else {
        getSubjectList(1, perPage, "", true, "");
      }
    }

    //eslint-disable-next-line
  }, [page]);

  return (
    <Fragment>
      <Helmet>
        <title>{classWall?.activeClassName} Curriculum</title>
        <meta name="description" content="" />
        <meta
          property="og:title"
          content={`${classWall?.activeClassName} Curriculum`}
        />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={curriculumModal}
        onClose={() => {
          setCurriculumModal(false);
          setTimeout(() => {
            setActiveSubject(null);
          }, 500);
        }}
        title={
          <Text weight={600}>{activeSubject?.subject_name} Curriculum</Text>
        }
        size={900}
      >
        <ViewCurriculum
          closeModal={() => {
            setCurriculumModal(false);
            setTimeout(() => {
              setActiveSubject(null);
            }, 500);
          }}
          subjectId={activeSubject?.subject_id}
          classId={classWall?.activeClassId}
          modalActive={curriculumModal}
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
              Curriculum
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
              {allSubjects && !loading ? (
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
                      {allSubjects.map(
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
                                <Menu.Label>Curriculum Menu</Menu.Label>

                                <Menu.Item
                                  icon={<Book size={14} />}
                                  onClick={() => {
                                    setActiveSubject({
                                      subject_id: item.subject_id,
                                      subject_name: item.subject_name,
                                      subject_category: item.subject_category,
                                    });
                                    setCurriculumModal(true);
                                  }}
                                >
                                  View Curriculum
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>

                  {allSubjects.length === 0 && !loading && (
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
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Curriculum;
