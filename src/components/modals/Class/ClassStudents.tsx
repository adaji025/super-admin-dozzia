import { useEffect, Fragment } from "react";
import useClass from "../../../hooks/useClass";
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
} from "@mantine/core";
import useTheme from "../../../hooks/useTheme";
import { Trash } from "tabler-icons-react";
import "../modals.scss";

const ClassStudents = ({
  classId,
  closeModal,
  modalActive,
}: {
  classId: string;
  closeModal: () => void;
  modalActive: boolean;
}) => {
  const { handleGetClassStudents, classStudents, loading, setLoading } =
    useClass();
  const { dark } = useTheme();
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    if (modalActive) {
      handleGetClassStudents(classId);
    }

    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Divider mb="md" variant="dashed" />

      <Box sx={{ maxWidth: 900, minHeight: 173 }} className="list-modal">
        {classStudents.data && !loading ? (
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
                    className="large-only"
                  >
                    Picture
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                      color: dark ? "#b3b7cb" : "#898989",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                      color: dark ? "#b3b7cb" : "#898989",
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
                    (
                      item: {
                        student_id: string;
                        first_name: number;
                        last_name: string;
                        picture: string;
                        username: string;
                      },
                      index: number
                    ) => (
                      <tr key={item.student_id}>
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
                          {item.username}
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

      {classStudents?.meta && (
        <Pagination
          sx={{ maxWidth: 900 }}
          position="center"
          mt={25}
          onChange={(value) => {
            setLoading(true);
          }}
          initialPage={classStudents.meta.current_page}
          total={classStudents.meta.last_page}
          color="green"
        />
      )}
      <Divider mt="md" variant="dashed" />

      <Group position="right" mt="lg">
        <Button onClick={closeModal}>Close</Button>
      </Group>
    </Fragment>
  );
};

export default ClassStudents;
