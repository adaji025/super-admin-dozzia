import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import {
  Button,
  Divider,
  Group,
  Skeleton,
  Table,
  Box,
  Alert,
  Checkbox,
  Pagination,
  LoadingOverlay,
} from "@mantine/core";
import moment from "moment";
import useNotification from "../../../hooks/useNotification";
import {
  getClassAttendance,
  markAttendance,
} from "../../../services/attendance/attendance";
import { showNotification } from "@mantine/notifications";
import {
  ClassAttendanceType,
  GeneralAttendanceType,
} from "../../../types/attendanceTypes";

interface ClassAttendanceProps {
  closeModal: () => void;
  selectedClass: GeneralAttendanceType | null;
  modalActive: boolean;
  date: Date;
  callback: () => void;
}

const ClassAttendance = ({
  closeModal,
  selectedClass,
  modalActive,
  date,
  callback,
}: ClassAttendanceProps) => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [classAttendance, setClassAttendance] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [attendanceDataRaw, setAttendanceDataRaw] = useState<any>(null);
  const [attendanceTrigger, setAttendanceTrigger] = useState<any>({
    studentId: "",
    type: "",
  });
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modalActive) {
      handleGetClassAttendance();
    }
    //eslint-disable-next-line
  }, [page]);

  const handleGetClassAttendance = () => {
    getClassAttendance(
      page,
      perPage,
      moment(date).format("YYYY-MM-DD"),
      selectedClass?.classroom_id ?? ""
    )
      .then((res) => {
        setClassAttendance(res);
        createAttendanceData(res.data);
      })
      .catch((error: AxiosError) => {
        handleError(error);
      });
  };

  const createAttendanceData = (attendance: any) => {
    let data: any = {};
    let dataRaw: any = [];

    for (let i = 0; i < attendance.length; i++) {
      data[attendance[i].student_id] = {
        student_id: attendance[i]?.student_id,
        is_present: attendance[i]?.attendance
          ? attendance[i]?.attendance?.is_present
          : true,
      };
    }
    for (let i = 0; i < attendance.length; i++) {
      dataRaw.push({
        student_id: attendance[i]?.student_id,
        is_present: attendance[i]?.attendance
          ? attendance[i]?.attendance?.is_present
          : true,
      });
    }

    setAttendanceData(data);
    setAttendanceDataRaw(dataRaw);
  };

  useEffect(() => {
    handleAttendanceChange(attendanceTrigger.studentId, attendanceTrigger.type);

    //eslint-disable-next-line
  }, [attendanceTrigger]);

  const handleAttendanceChange = (studentId: string, type: string) => {
    let attendanceDataCopy = attendanceData;

    if (studentId) {
      let data: { student_id: string; is_present: boolean } =
        attendanceDataCopy[studentId];

      data.is_present = type === "present" ? true : false;

      attendanceDataCopy[studentId] = data;
      setAttendanceTrigger({ studentId: "", type: "" });
      setAttendanceData(attendanceDataCopy);
    }
  };

  const updateAttendanceRaw = (studentIndex: number, type: string) => {
    let data: { student_id: string; is_present: boolean } =
      attendanceDataRaw[studentIndex];

    data.is_present = type === "present" ? true : false;

    let attendanceDataCopy = attendanceDataRaw;
    attendanceDataCopy[studentIndex] = data;

    setAttendanceDataRaw(attendanceDataCopy);
  };

  const handleSubmit = () => {
    const reqData = {
      classroom_id: selectedClass?.classroom_id ?? "",
      register: attendanceDataRaw,
    };

    setLoading(true);

    markAttendance(reqData)
      .then(() => {
        showNotification({
          title: "Success",
          message: "Attendance marked successfully. ✅",
          color: "green",
        });

        callback();
        closeModal();
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <LoadingOverlay visible={loading} />

      <Box sx={{ minHeight: 450 }}>
        {classAttendance && attendanceData ? (
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
                    Student Name
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                    className="large-only"
                  >
                    Gender
                  </th>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                  >
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {classAttendance &&
                  classAttendance?.data.map(
                    (item: ClassAttendanceType, index: number) => (
                      <tr key={index}>
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
                          {item.first_name} {item.last_name}
                        </td>
                        <td
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                          className="large-only"
                        >
                          {item?.gender}
                        </td>
                        <td
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          <Group>
                            <Checkbox
                              checked={
                                attendanceData[item.student_id]?.is_present
                              }
                              label="Present"
                              onChange={() => {
                                setAttendanceTrigger({
                                  studentId: item?.student_id,
                                  type: "present",
                                });

                                updateAttendanceRaw(index, "present");
                              }}
                            />
                            <Checkbox
                              checked={
                                attendanceData[item.student_id]?.is_present ===
                                false
                              }
                              label="Absent"
                              onChange={() => {
                                setAttendanceTrigger({
                                  studentId: item?.student_id,
                                  type: "absent",
                                });
                                updateAttendanceRaw(index, "absent");
                              }}
                            />
                          </Group>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </Table>

            {classAttendance && classAttendance?.data.length === 0 && (
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
      {classAttendance?.meta && classAttendance?.data.length > 0 && (
        <Pagination
          sx={{ maxWidth: 800 }}
          position="left"
          mt={25}
          onChange={(value) => {
            if (value !== classAttendance.meta.current_page) {
              setClassAttendance(null);
              setPage(value);
            }
          }}
          initialPage={classAttendance.meta.current_page}
          total={classAttendance.meta.last_page}
        />
      )}

      <Divider mt="md" variant="dashed" />

      <Group position="right" mt="lg">
        <Button variant="default" onClick={closeModal}>
          Go back
        </Button>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </Group>
    </div>
  );
};

export default ClassAttendance;
