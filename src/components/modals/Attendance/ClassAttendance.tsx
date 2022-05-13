import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Group,
  Skeleton,
  Table,
  Box,
  Alert,
  Switch,
} from "@mantine/core";
import useAttendance from "../../../hooks/useAttendance";
import useTheme from "../../../hooks/useTheme";
import moment from "moment";

const ClassAttendance = ({
  closeModal,
  selectedClass,
  modalActive,
  date,
}: any) => {
  const { dark } = useTheme();
  const [page] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const { handleGetClassAttendance } = useAttendance();
  const [classAttendance, setClassAttendance] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      handleGetClassAttendance(
        page,
        perPage,
        moment(date).format("YYYY-MM-DD"),
        selectedClass.classroom_id
      ).then((res: any) => {
        console.log(res?.data);
        setClassAttendance(res?.data);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <Box sx={{ minHeight: 450 }} className="d-p-main">
        {classAttendance ? (
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
                      color: dark ? "#b3b7cb" : "#898989",
                    }}
                  >
                    Student Name
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                      color: dark ? "#b3b7cb" : "#898989",
                    }}
                    className="large-only"
                  >
                    Gender
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                      color: dark ? "#b3b7cb" : "#898989",
                    }}
                  >
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {classAttendance.map(
                  (
                    item: {
                      first_name: string;
                      last_name: string;
                      gender: string;
                    },
                    index: number
                  ) => (
                    <tr key={index}>
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
                        {item.first_name} {item.last_name}
                      </td>
                      <td
                        style={{
                          borderBottom: `1px solid #0000`,
                          fontWeight: "600",
                        }}
                        className="large-only"
                      >
                        {item?.gender}
                      </td>
                      <td
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                      >
                        <Switch label="Present" />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            {classAttendance && classAttendance.length === 0 && (
              <Group grow position="center" mt={80} mb={60}>
                <Alert
                  title="Bummer!"
                  color="red"
                  style={{ maxWidth: "300px" }}
                >
                  No student found.
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
        <Button variant="default" onClick={closeModal}>
          Go back
        </Button>
        <Button onClick={closeModal}>Submit</Button>
      </Group>
    </div>
  );
};

export default ClassAttendance;
