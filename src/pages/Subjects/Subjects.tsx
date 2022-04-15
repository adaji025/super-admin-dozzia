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
  CheckupList,
  Users,
  Book,
  Edit,
} from "tabler-icons-react";
import AddSubject from "../../components/modals/Subject/AddSubject";
import useSubject from "../../hooks/useSubject";

const Subjects = () => {
  const { dark } = useTheme();
  const [addSubjectModal, setAddSubjectModal] = useState<boolean>(false);
  const [editSubject, setEditSubject] = useState<null | {
    subject_id: string;
    subject_name: string;
    subject_category: string;
    subject_description: string;
  }>(null);
  const {
    handleAddSubject,
    subjects,
    getSubjectList,
    loading,
    handleUpdateSubject,
  } = useSubject();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    getSubjectList(page, perPage);

    //eslint-disable-next-line
  }, [page]);

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
          setEditSubject(null);
        }}
        title={<Text weight={600}>{editSubject ? "Edit" : "Add"} Subject</Text>}
        size="lg"
      >
        <AddSubject
          closeModal={() => {
            setAddSubjectModal(false);
            setEditSubject(null);
          }}
          edit={editSubject}
          submit={editSubject ? handleUpdateSubject : handleAddSubject}
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
            <div className="d-p-h-left">Subjects</div>

            <div className="d-p-h-right">
              <Button
                variant="light"
                onClick={() => {
                  setAddSubjectModal(true);
                }}
              >
                Add Subject
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
              placeholder="Search subject (not working yet)"
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
            {subjects.data && !loading ? (
              <>
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
                        Subject Name
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
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
                            {item.subject_name}
                          </td>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                              color: dark ? "#b3b7cb" : "#898989",
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
                              <Menu.Item icon={<Users size={14} />}>
                                Teachers
                              </Menu.Item>
                              <Menu.Item icon={<Book size={14} />}>
                                Classes
                              </Menu.Item>
                              <Menu.Item icon={<CheckupList size={14} />}>
                                Assign to class
                              </Menu.Item>
                              <Divider />
                              <Menu.Item
                                icon={<Edit size={14} />}
                                onClick={() => {
                                  setEditSubject({
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
                      No subject found 📗.
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
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Subjects;
