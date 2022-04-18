import { useEffect, useState } from "react";
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
import { User, Clipboard } from "tabler-icons-react";
import useSubject from "../../../hooks/useSubject";
import useTheme from "../../../hooks/useTheme";

const SubjectClasses = ({
  closeModal,
  subject,
  modalActive,
}: {
  closeModal: () => void;
  subject: {
    subject_id: string;
    subject_name: string;
    subject_category: string;
    subject_description: string;
  };
  modalActive: boolean;
}) => {
  const { dark } = useTheme();
  const { handleGetSubjectClasses } = useSubject();
  const [classes, setClasses] = useState<any>(null);
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    if (modalActive) {
      handleGetSubjectClasses(subject.subject_id).then((res: any) => {
        setClasses(res?.data);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <Box sx={{ maxWidth: 900, minHeight: 173 }} className="d-p-main">
        {classes ? (
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
                    Class Name
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                      color: dark ? "#b3b7cb" : "#898989",
                    }}
                    className="large-only"
                  >
                    Class Level
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                      color: dark ? "#b3b7cb" : "#898989",
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
                {classes.map(
                  (
                    item: {
                      classroom_id: string;
                      classroom_name: string;
                      classroom_level: number;
                      classroom_teacher: {
                        title: string;
                        first_name: string;
                        last_name: string;
                        staff_id: string;
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
                          fontWeight: "600",
                        }}
                        className="large-only"
                      >
                        {item.classroom_level}
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
                          <Menu.Item icon={<Clipboard size={14} />}>
                            View Class
                          </Menu.Item>
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

            {classes && classes.length === 0 && (
              <Group grow position="center" mt={80} mb={60}>
                <Alert
                  title="Bummer!"
                  color="red"
                  style={{ maxWidth: "300px" }}
                >
                  No Class found 😑.
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

export default SubjectClasses;
