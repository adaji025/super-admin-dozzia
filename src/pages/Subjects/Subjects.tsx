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
import { X, Search, CheckupList, Book, Edit } from "tabler-icons-react";
import AddSubject from "../../components/modals/Subject/AddSubject";
import AssignToClass from "../../components/modals/Subject/AssignToClass";
import SubjectClasses from "../../components/modals/Subject/SubjectClasses";
import useSubject from "../../hooks/useSubject";

const Subjects = () => {
  const { dark } = useTheme();
  const {
    handleAddSubject,
    subjects,
    getSubjectList,
    loading,
    handleUpdateSubject,
    setLoading,
  } = useSubject();

  const [addSubjectModal, setAddSubjectModal] = useState<boolean>(false);
  const [assignToClassModal, setAssignToClassModal] = useState<boolean>(false);
  const [subjectClassesModal, setSubjectClassesModal] =
    useState<boolean>(false);
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
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    getSubjectList(page, perPage, search);

    //eslint-disable-next-line
  }, [page, search]);

  return (
    <Fragment>
      <Helmet>
        <title>Subjects</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Subjects" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addSubjectModal}
        onClose={() => {
          setAddSubjectModal(false);
          setActiveSubject(null);
        }}
        title={
          <Text weight={600}>{activeSubject ? "Edit" : "Add"} Subject</Text>
        }
        size="lg"
      >
        <AddSubject
          closeModal={() => {
            setAddSubjectModal(false);
            setActiveSubject(null);
          }}
          edit={activeSubject}
          submit={activeSubject ? handleUpdateSubject : handleAddSubject}
        />
      </Modal>

      <Modal
        opened={assignToClassModal}
        onClose={() => {
          setAssignToClassModal(false);
          setActiveSubject(null);
        }}
        title={<Text weight={600}>Add Subject to Class</Text>}
        size="lg"
      >
        <AssignToClass
          closeModal={() => {
            setAssignToClassModal(false);
            setActiveSubject(null);
          }}
          subject={activeSubject}
          modalActive={assignToClassModal}
        />
      </Modal>

      <Modal
        opened={subjectClassesModal}
        onClose={() => {
          setSubjectClassesModal(false);
          setActiveSubject(null);
        }}
        title={
          <Text weight={600}>
            Classes offering{" "}
            {(activeSubject && activeSubject.subject_name) ?? ""}
          </Text>
        }
        size="xl"
      >
        <SubjectClasses
          closeModal={() => {
            setSubjectClassesModal(false);
            setActiveSubject(null);
          }}
          subject={activeSubject}
          modalActive={subjectClassesModal}
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
            <div className="d-p-h-left no-select">Subjects</div>

            <div className="d-p-h-right">
              <Button
                onClick={() => {
                  setAddSubjectModal(true);
                }}
              >
                Add Subject
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
                placeholder="Search subject"
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
                  if (searchInput !== "") {
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
            {subjects && subjects.data && !loading ? (
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
                    {subjects?.data.map(
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
                              <Menu.Label>Subject Menu</Menu.Label>

                              <Menu.Item
                                icon={<Book size={14} />}
                                onClick={() => {
                                  setActiveSubject({
                                    subject_id: item.subject_id,
                                    subject_name: item.subject_name,
                                    subject_category: item.subject_category,
                                    subject_description:
                                      item.subject_description,
                                  });
                                  setSubjectClassesModal(true);
                                }}
                              >
                                Classes
                              </Menu.Item>
                              <Menu.Item
                                icon={<CheckupList size={14} />}
                                onClick={() => {
                                  setActiveSubject({
                                    subject_id: item.subject_id,
                                    subject_name: item.subject_name,
                                    subject_category: item.subject_category,
                                    subject_description:
                                      item.subject_description,
                                  });
                                  setAssignToClassModal(true);
                                }}
                              >
                                Add to class
                              </Menu.Item>
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
                                  setAddSubjectModal(true);
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

                {subjects?.data.length === 0 && (
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

          {subjects?.meta && subjects?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setPage(value);
              }}
              initialPage={subjects.meta.current_page}
              total={subjects.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Subjects;
