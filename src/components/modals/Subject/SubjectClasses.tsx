import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Group,
  Skeleton,
  Table,
  Box,
  Alert,
  LoadingOverlay,
} from "@mantine/core";
import useSubject from "../../../hooks/useSubject";
import { SubjectType } from "../../../types/subjectsTypes";
import { ClassroomType } from "../../../types/classTypes";

interface SubjectClassesProps {
  closeModal: () => void;
  subject: SubjectType | null;
  modalActive: boolean;
}

const SubjectClasses = ({
  closeModal,
  subject,
  modalActive,
}: SubjectClassesProps) => {
  const { handleGetSubjectClasses } = useSubject();
  const [classes, setClasses] = useState<ClassroomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modalActive) {
      setLoading(true);

      handleGetSubjectClasses(subject?.subject_id ?? "")
        .then((res: ClassroomType[]) => {
          setClasses(res);
        })
        .finally(() => setLoading(false));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <LoadingOverlay visible={loading} />

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
                {classes.map((item: ClassroomType, index: number) => (
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
                      {item.name}
                    </td>
                    <td
                      style={{
                        borderBottom: `1px solid #0000`,
                        fontWeight: "600",
                      }}
                      className="large-only"
                    >
                      {item.level}
                    </td>
                    <td
                      style={{
                        borderBottom: `1px solid #0000`,
                      }}
                    >
                      {item.class_teacher.title ?? ""}{" "}
                      {item.class_teacher.first_name ?? ""}{" "}
                      {item.class_teacher.last_name ?? ""}
                    </td>
                  </tr>
                ))}
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
