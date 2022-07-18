import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Group,
  Skeleton,
  Table,
  Box,
  Alert,
} from "@mantine/core";
import useSubject from "../../../hooks/useSubject";

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
  const { handleGetSubjectClasses } = useSubject();
  const [classes, setClasses] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      handleGetSubjectClasses(subject?.subject_id).then((res: any) => {
        setClasses(res?.data);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <Box sx={{ minHeight: 350 }} className="d-p-main">
        {classes ? (
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
                    Class Name
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                    className="large-only"
                  >
                    Class Level
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                  >
                    Subject Teacher
                  </th>
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
                      subjects_and_teachers: any;
                    },
                    index: number
                  ) => (
                    <tr key={item?.classroom_id}>
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
                        {item?.classroom_name}
                      </td>
                      <td
                        style={{
                          borderBottom: `1px solid #0000`,
                          fontWeight: "600",
                        }}
                        className="large-only"
                      >
                        {item?.classroom_level}
                      </td>
                      <td
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        {item?.subjects_and_teachers.map(
                          (item: {
                            subject: {
                              subject_id: string;
                            };
                            teacher: {
                              title: string;
                              first_name: string;
                              last_name: string;
                              staff_id: string;
                            };
                          }) =>
                            item?.subject?.subject_id === subject?.subject_id &&
                            `${item?.teacher?.title} ${item?.teacher?.first_name} ${item?.teacher?.last_name}`
                        )}
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
                  No Class found.
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
