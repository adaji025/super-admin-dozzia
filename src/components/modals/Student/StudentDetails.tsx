import { useState, useEffect } from "react";
import { Button, Group, Divider, LoadingOverlay, Avatar } from "@mantine/core";
import useTheme from "../../../hooks/useTheme";
import useStudent from "../../../hooks/useStudent";

const StudentDetails = ({ closeModal, student, modalActive }: any) => {
  const { dark } = useTheme();
  const { loading, handleGetStudentDetails } = useStudent();
  const [studentDetails, setStudentDetails] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      handleGetStudentDetails(student?.studentId).then((res: any) => {
        setStudentDetails(res);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Divider mb="md" variant="dashed" />

      <div className="view-details no-next">
        <Avatar
          mb={10}
          src={
            studentDetails?.data?.picture ? studentDetails?.data?.picture : null
          }
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
            {studentDetails?.data?.first_name}{" "}
            {studentDetails?.data?.middle_name}{" "}
            {studentDetails?.data?.last_name}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Class:</div>
          <div className="d-r-right"></div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Date of Birth:</div>
          <div className="d-r-right">{studentDetails?.data?.dob} </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Age:</div>
          <div className="d-r-right">{studentDetails?.data?.age} </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Blood Group:</div>
          <div className="d-r-right">{studentDetails?.data?.blood_group}</div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Genotype:</div>
          <div className="d-r-right">{studentDetails?.data?.genotype}</div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Guardian:</div>
          <div className="d-r-right">
            {studentDetails?.data?.guardian[0]?.first_name}{" "}
            {studentDetails?.data?.guardian[0]?.last_name}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Guardian's Phone:</div>
          <div className="d-r-right"></div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Guardian Email:</div>
          <div className="d-r-right"></div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Disability:</div>
          <div className="d-r-right">{studentDetails?.data?.disability}</div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Height:</div>
          <div className="d-r-right">
            {studentDetails?.data?.height}{" "}
            {studentDetails?.data?.height && "cm"}
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
            {studentDetails?.data?.weight}{" "}
            {studentDetails?.data?.weight && "kg"}
          </div>
        </div>

        <Group position="right" mt="lg">
          <Button onClick={closeModal}>Close</Button>
        </Group>
      </div>
    </div>
  );
};

export default StudentDetails;
