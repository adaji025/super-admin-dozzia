import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Text,
  Input,
  Menu,
  Divider,
  Pagination,
  Skeleton,
  Alert,
  Group,
  Box,
  Table,
} from "@mantine/core";
import { CirclePlus, ArrowBackUp, ChevronDown } from "tabler-icons-react";
import AddStudyResource from "../../components/modals/ClassWall/AddStudyResource";
import useStudyResources from "../../hooks/useStudyResources";
import useSubject from "../../hooks/useSubject";
import { useSelector } from "react-redux";

const StudyResources = () => {
  const { dark } = useTheme();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [studyResources, setStudyResources] = useState<any>(null);
  const [activeSubjectId, setActiveSubjectId] = useState<string>("");
  const [activeSubjectName, setActiveSubjectName] = useState<string>("");
  const [addResourceModal, setAddResourceModal] = useState<boolean>(false);
  const {
    handlePostStudyResource,
    setLoading,
    loading,
    handleGetStudyResources,
  } = useStudyResources();
  const navigate = useNavigate();
  const { getSubjectList, allSubjects } = useSubject();
  const deviceWidth = window.innerWidth;
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });

  useEffect(() => {
    getSubjectList(1, 300, true);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (classWall?.activeClassId) {
      handleGetStudyResources(
        page,
        perPage,
        classWall?.activeClassId,
        activeSubjectId
      ).then((res: any) => {
        console.log(res);

        setStudyResources(res);
      });
    }

    //eslint-disable-next-line
  }, [activeSubjectId, page]);

  return (
    <Fragment>
      <Helmet>
        <title>{classWall?.activeClassName} Study Resources</title>
        <meta name="description" content="" />
        <meta
          property="og:title"
          content={`${classWall?.activeClassName} Study Resources`}
        />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addResourceModal}
        onClose={() => {
          setAddResourceModal(false);
        }}
        title={<Text weight={600}>Add Study Resource</Text>}
        size="lg"
      >
        <AddStudyResource
          closeModal={() => {
            setAddResourceModal(false);
          }}
          submit={handlePostStudyResource}
          modalActive={addResourceModal}
        />
      </Modal>

      <div
        className="data-page-container study-resources"
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
                <ArrowBackUp size={18} />
              </span>
              {classWall?.activeClassName && (
                <span style={{ opacity: "0.4" }}>
                  {classWall?.activeClassName}/{" "}
                </span>
              )}
              Study Resources
            </div>

            <div className="d-p-h-right">
              <Menu
                size="sm"
                control={
                  <Button
                    size={deviceWidth < 768 ? "xs" : "sm"}
                    variant="default"
                    disabled={!classWall?.activeClassId}
                    rightIcon={<ChevronDown size={14} />}
                  >
                    <span style={{ textTransform: "capitalize" }}>
                      {activeSubjectId === ""
                        ? "All Subjects"
                        : activeSubjectName}
                    </span>
                  </Button>
                }
              >
                <Menu.Label>Subject List</Menu.Label>

                <Menu.Item
                  onClick={() => {
                    setLoading(true);
                    setActiveSubjectId("");
                    setActiveSubjectName("");
                  }}
                  disabled={activeSubjectId === ""}
                >
                  All Subjects
                </Menu.Item>
                {allSubjects.map(
                  (item: { subject_id: string; subject_name: string }) => (
                    <Menu.Item
                      key={item.subject_id}
                      onClick={() => {
                        setLoading(true);
                        setActiveSubjectId(item.subject_id);
                        setActiveSubjectName(item.subject_name);
                      }}
                      disabled={activeSubjectId === item.subject_id}
                    >
                      {item.subject_name.length > 18
                        ? `${item.subject_name.substring(0, 18)}...`
                        : item.subject_name}
                    </Menu.Item>
                  )
                )}
              </Menu>

              <Button
                size={deviceWidth < 768 ? "xs" : "sm"}
                ml="sm"
                leftIcon={<CirclePlus size={14} />}
                onClick={() => {
                  setAddResourceModal(true);
                }}
              >
                Add Resource
              </Button>
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

          <Box
            mt={40}
            sx={{ maxWidth: 900, minHeight: 173 }}
            className="d-p-main"
          >
            {studyResources && studyResources.data && !loading ? (
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
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                      >
                        Resource Name
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                      >
                        Subject
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
                    {studyResources?.data.map(
                      (
                        item: {
                          id: string;
                          title: string;
                          subject: {
                            subject_name: string;
                          };
                        },
                        index: number
                      ) => (
                        <tr key={item.id}>
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
                            {item?.title}
                          </td>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                              color: dark ? "#b3b7cb" : "#898989",
                            }}
                          >
                            {item?.subject?.subject_name}
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
                              <Menu.Label>Resource Menu</Menu.Label>
                              <Menu.Item onClick={() => {}}>Students</Menu.Item>
                            </Menu>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>

                {studyResources?.data.length === 0 && (
                  <Group grow position="center" my={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "350px" }}
                    >
                      No study resource found.
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

          {studyResources?.meta && studyResources?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                if (value !== studyResources.meta.current_page) {
                  setPage(value);
                }
              }}
              initialPage={studyResources.meta.current_page}
              total={studyResources.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default StudyResources;
