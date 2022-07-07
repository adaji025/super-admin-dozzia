import { useEffect } from "react";
import {
  Button,
  Divider,
  Group,
  Skeleton,
  Table,
  Menu,
  Box,
  Alert,
} from "@mantine/core";
import { User } from "tabler-icons-react";
import useSubject from "../../../hooks/useSubject";

const ClassSubjects = ({
  closeModal,
  classId,
  modalActive,
}: {
  closeModal: () => void;
  classId: string;
  modalActive: boolean;
}) => {
  const deviceWidth = window.innerWidth;
  const { getSubjectList, allSubjects, loading } = useSubject();

  useEffect(() => {
    if (modalActive) {
      getSubjectList(1, 100, "", true, "", classId);
    }

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <Box sx={{ minHeight: 350 }} className="d-p-main">
        {allSubjects && !loading ? (
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
                  >
                    Subject Name
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                    className="large-only"
                  >
                    Subject Category
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                  >
                    Teacher
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
                      subject_category: number;
                      teacher: {
                        title: string;
                        first_name: string;
                        last_name: string;
                        staff_id: string;
                      };
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
                        {item?.subject_name}
                      </td>
                      <td
                        style={{
                          borderBottom: `1px solid #0000`,
                          fontWeight: "600",
                        }}
                        className="large-only"
                      >
                        {item?.subject_category}
                      </td>
                      <td
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        {/* {`${item.teacher.title} ${item.teacher.first_name} ${item.teacher.last_name}`} */}
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
                          <Menu.Label>Subject Menu</Menu.Label>
                          <Menu.Item icon={<User size={14} />}>
                            View Teacher
                          </Menu.Item>
                        </Menu>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            {allSubjects && allSubjects.length === 0 && (
              <Group grow position="center" mt={80} mb={60}>
                <Alert
                  title="Bummer!"
                  color="red"
                  style={{ maxWidth: "300px" }}
                >
                  No Subject found.
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

      <Divider mt="md" variant="dashed" />

      <Group position="right" mt="lg">
        <Button onClick={closeModal}>Close</Button>
      </Group>
    </div>
  );
};

export default ClassSubjects;
