import { useEffect, Fragment, useState } from "react";
import {
  Button,
  Group,
  Divider,
  Box,
  Table,
  Skeleton,
  Menu,
  Avatar,
  Pagination,
  Alert,
  Tabs,
  TextInput,
  ActionIcon,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Trash, Users, UserPlus, User } from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";
import useClass from "../../../hooks/useClass";
import useStudent from "../../../hooks/useStudent";
import "../modals.scss";
import { StudentType, StudentsState } from "../../../types/studentTypes";
import useNotification from "../../../hooks/useNotification";

const ClassStudents = ({
  classId,
  closeModal,
  modalActive,
}: {
  classId: string;
  closeModal: () => void;
  modalActive: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(50);
  const {
    handleGetClassStudents,
    classStudents,
    loading,
    addMultipleStudents,
  } = useClass();

  useEffect(() => {
    if (modalActive) {
      handleGetClassStudents(classId, page, perPage);
    }
    //eslint-disable-next-line
  }, [page]);

  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active);
  };

  return (
    <Tabs active={activeTab} onTabChange={onChange} variant="outline">
      <Tabs.Tab icon={<Users size={14} />} label="View Students" tabKey="View">
        <ViewStudents
          {...{
            classId,
            closeModal,
            modalActive,
            classStudents,
            loading,
            setPage,
          }}
        />
      </Tabs.Tab>
      <Tabs.Tab
        icon={<UserPlus size={14} />}
        label="Add Student(s)"
        tabKey="Add"
      >
        <AddStudentsToClass {...{ classId, closeModal, addMultipleStudents }} />
      </Tabs.Tab>
    </Tabs>
  );
};

const AddStudentsToClass = ({
  closeModal,
  classId,
  addMultipleStudents,
}: {
  closeModal: () => void;
  classId: string;
  addMultipleStudents: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<any>([]);
  const { getInfoWithUsername } = useStudent();
  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      students: formList([{ username: "" }]),
    },
  });

  const addStudent = async (values: any) => {
    const getUsername = values.students[values.students.length - 1].username;

    for (let i = 0; i < studentList.length; i++) {
      if (getUsername === studentList[i].username) {
        return showNotification({
          title: "Error",
          message: `${"Student already added."} 😕`,
          color: "red",
        });
      }
    }

    if (getUsername.length < 7) {
      return showNotification({
        title: "Error",
        message: `${"Please enter a valid Reg No."} 😕`,
        color: "red",
      });
    }

    setLoading(true);

    getInfoWithUsername(getUsername)
      .then((res: any) => {
        const student: {
          first_name: string;
          last_name: string;
          student_id: string;
        } = res.data;

        let ids = studentList;
        ids[values.students.length - 1] = {
          name: `${student.first_name} ${student.last_name}`,
          username: getUsername,
          id: student.student_id,
        };
        setStudentList(ids);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeStudent = (index: number) => {
    let filtered = [];

    for (let i = 0; i < studentList.length; i++) {
      if (form.values.students[index].username !== studentList[i].username) {
        filtered.push(studentList[i]);
      }
    }

    setStudentList(filtered);
    form.removeListItem("students", index);
  };

  const submit = () => {
    closeModal();

    let reqData = [];

    for (let i = 0; i < studentList.length; i++) {
      reqData.push(studentList[i].id);
    }
    addMultipleStudents(classId, { students: reqData });
  };

  const fields = form.values.students.map((_, index) => (
    <Group key={index} mt="xs">
      <TextInput
        placeholder="Student Reg No."
        required
        disabled={index !== form.values.students.length - 1}
        icon={<User size={14} />}
        className="el231"
        sx={{ flex: 1 }}
        {...form.getListInputProps("students", index, "username")}
      />

      {studentList.map((item: { name: string }, studentIndex: number) => (
        <Fragment key={studentIndex}>
          {studentIndex === index && (
            <>
              <Text sx={{ opacity: "0.8", fontSize: "14px" }} className="lg121">
                {item.name}
              </Text>
              <Text sx={{ opacity: "0.8", fontSize: "14px" }} className="sm121">
                {item.name.length > 14
                  ? `${item.name.substring(0, 14)}...`
                  : item.name}
              </Text>
            </>
          )}
        </Fragment>
      ))}

      {index === form.values.students.length - 1 && (
        <ActionIcon
          color="red"
          variant="hover"
          onClick={() => {
            removeStudent(index);
          }}
        >
          <Trash size={16} />
        </ActionIcon>
      )}
    </Group>
  ));

  return (
    <Fragment>
      <Box sx={{ maxWidth: 900, minHeight: 173 }} className="list-modal">
        <Box sx={{ maxWidth: 500 }}>
          {fields.length > 0 ? (
            <Group my="xs">
              <Text weight={500} size="sm" className="el231" sx={{ flex: 1 }}>
                Reg No.
              </Text>
              <Text weight={500} size="sm">
                Student Name
              </Text>
            </Group>
          ) : (
            <Text mt="sm">Click Add Student button to begin.</Text>
          )}
          {fields}

          <Group position="left" mt="md">
            <Button
              loading={loading}
              onClick={() => {
                if (form.values.students.length === 0) {
                  form.addListItem("students", { username: "" });
                } else {
                  addStudent(form.values);
                }
              }}
            >
              Add Student
            </Button>

            {form.values.students.length !== 0 && (
              <Button
                variant="subtle"
                onClick={() => {
                  form.addListItem("students", { username: "" });
                }}
              >
                Add Another
              </Button>
            )}
          </Group>
        </Box>
      </Box>

      <Divider mt="md" variant="dashed" />

      <Group position="right" mt="lg">
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>
        <Button onClick={submit} color="dark">
          Submit
        </Button>
      </Group>
    </Fragment>
  );
};

interface ViewStudentsProps {
  closeModal: () => void;
  classStudents: StudentsState;
  loading: boolean;
  setPage: (value: number) => void;
}

const ViewStudents = ({
  closeModal,
  classStudents,
  loading,
  setPage,
}: ViewStudentsProps) => {
  const deviceWidth = window.innerWidth;

  return (
    <Fragment>
      <Box sx={{ maxWidth: 900, minHeight: 173 }} className="list-modal">
        {classStudents.dataFetched && !loading ? (
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
                    }}
                    className="large-only"
                  >
                    Picture
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
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
                {classStudents?.data.length > 0 &&
                  classStudents?.data.map(
                    (item: StudentType, index: number) => (
                      <tr key={item.student_id}>
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
                            fontWeight: "500",
                          }}
                        >
                          {`${item.first_name} ${item.last_name}`}
                        </td>
                        <td
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          {item.reg_no}
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
                            <Menu.Label>Menu</Menu.Label>

                            <Menu.Item
                              color="red"
                              icon={<Trash size={14} />}
                              onClick={() => {}}
                            >
                              Remove from Class
                            </Menu.Item>
                          </Menu>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </Table>

            {classStudents?.data.length === 0 && (
              <Group grow position="center" mt={80}>
                <Alert
                  title="Bummer!"
                  color="red"
                  style={{ maxWidth: "300px" }}
                >
                  Class is empty.
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

      {classStudents?.meta && classStudents?.data.length > 0 && (
        <Pagination
          sx={{ maxWidth: 900 }}
          position="left"
          mt={25}
          onChange={(value) => {
            if (value !== classStudents.meta.current_page) {
              setPage(value);
            }
          }}
          initialPage={classStudents.meta.current_page}
          total={classStudents.meta.last_page}
        />
      )}
      <Divider mt="md" variant="dashed" />

      <Group position="right" mt="lg">
        <Button onClick={closeModal} variant="default">
          Close
        </Button>
      </Group>
    </Fragment>
  );
};

export default ClassStudents;
