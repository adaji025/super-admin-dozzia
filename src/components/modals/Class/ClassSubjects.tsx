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
import { useEffect, useState } from "react";
import { SubjectType } from "../../../types/subjectsTypes";

interface ClassSubjectsProps {
  closeModal: () => void;
  classId: string;
  modalActive: boolean;
}

const ClassSubjects = ({
  closeModal,
  classId,
  modalActive,
}: ClassSubjectsProps) => {
  const { getSubjectList, allSubjects, loading } = useSubject();
  const [page] = useState<number>(1);
  const [perPage] = useState<number>(50);

  useEffect(() => {
    if (modalActive) {
      getSubjectList(page, perPage, "", true, "", classId);
    }
    //eslint-disable-next-line
  }, [classId, modalActive]);

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <LoadingOverlay visible={loading} />

      <Box sx={{ minHeight: 350 }} className="d-p-main">
        {allSubjects ? (
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
                </tr>
              </thead>

              <tbody>
                {allSubjects.map((item: SubjectType, index: number) => (
                  <tr key={item?.subject_id}>
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
                    >
                      {item.name}
                    </td>

                    <td
                      style={{
                        borderBottom: `1px solid #0000`,
                      }}
                    >
                      {item.category}
                    </td>
                  </tr>
                ))}
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
