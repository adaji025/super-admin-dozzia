import { useState, useEffect } from "react";
import { Button, Group, Divider, LoadingOverlay, Avatar } from "@mantine/core";
import useTheme from "../../../hooks/useTheme";
import useStudent from "../../../hooks/useStudent";
import { StudentType } from "../../../types/studentTypes";
import { ApiResponseType } from "../../../types/utilityTypes";
import { getAgeFromDOB } from "../../../lib/util";

interface StudentDetailsProps {
  closeModal: () => void;
  student: {
    fullName: string;
    studentId: string;
    username: string;
  } | null;
  modalActive: boolean;
}

const StudentDetails = ({
  closeModal,
  student,
  modalActive,
}: StudentDetailsProps) => {
  const { dark } = useTheme();
  const { loading, handleGetStudentDetails } = useStudent();
  const [studentDetails, setStudentDetails] = useState<StudentType | null>(
    null
  );

  useEffect(() => {
    if (modalActive && student) {
      handleGetStudentDetails(student?.studentId).then(
        (res: ApiResponseType<StudentType>) => {
          setStudentDetails(res.data);
        }
      );
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Divider mb="md" variant="dashed" />

      {studentDetails && (
        <div className="view-details no-next">
          <Avatar
            mb={10}
            src={studentDetails?.picture ? studentDetails.picture : null}
            className="avatar"
            size={100}
          />

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Full Name:</div>
            <div className="d-r-right">
              {studentDetails.first_name} {studentDetails.middle_name}{" "}
              {studentDetails.last_name}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Class:</div>
            <div className="d-r-right">
              {studentDetails?.current_class &&
                (studentDetails?.current_class?.classroom?.name ?? "")}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Date of Birth:</div>
            <div className="d-r-right">{studentDetails.meta.dob} </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Age:</div>
            <div className="d-r-right">
              {getAgeFromDOB(studentDetails.meta.dob)} year(s)
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Blood Group:</div>
            <div className="d-r-right">{studentDetails.meta.blood_group}</div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Genotype:</div>
            <div className="d-r-right">{studentDetails.meta.genotype}</div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Guardian:</div>
            <div className="d-r-right">
              {studentDetails.guardian.first_name}{" "}
              {studentDetails.guardian.last_name}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Guardian's Phone:</div>
            <div className="d-r-right">
              {studentDetails.guardian.phone_number || "N/A"}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Guardian Email:</div>
            <div className="d-r-right">
              {studentDetails.guardian.email || "N/A"}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Height:</div>
            <div className="d-r-right">
              {studentDetails.meta.height} {studentDetails.meta.height && "cm"}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Weight:</div>
            <div className="d-r-right">
              {studentDetails.meta.weight} {studentDetails.meta.weight && "kg"}
            </div>
          </div>

          <Group position="right" mt="lg">
            <Button onClick={closeModal}>Close</Button>
          </Group>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
