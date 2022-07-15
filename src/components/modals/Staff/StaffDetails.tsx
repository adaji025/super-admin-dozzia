import { useState, useEffect } from "react";
import { Button, Group, Divider, LoadingOverlay, Avatar } from "@mantine/core";
import useTheme from "../../../hooks/useTheme";
import useStaff from "../../../hooks/useStaff";

const StudentDetails = ({ closeModal, staff, modalActive }: any) => {
  const { dark } = useTheme();
  const { loading, handleGetStaffDetails } = useStaff();
  const [staffDetails, setStaffDetails] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      handleGetStaffDetails(staff?.staffId).then((res: any) => {
        setStaffDetails(res);
        console.log(res);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Divider mb="md" variant="dashed" />

      <div className="view-details no-next">
        <Avatar mb={10} src={null} className="avatar" size={100} />

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Full Name:</div>
          <div className="d-r-right">
            {staffDetails?.data?.title} {staffDetails?.data?.first_name}{" "}
            {staffDetails?.data?.middle_name} {staffDetails?.data?.last_name}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Staff Role:</div>
          <div className="d-r-right">{staffDetails?.data?.role}</div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Username:</div>
          <div className="d-r-right">{staffDetails?.data?.username}</div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Date of Birth:</div>
          <div className="d-r-right">{staffDetails?.data?.dob} </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Years of Experience:</div>
          <div className="d-r-right">
            {staffDetails?.data?.profile?.year_of_experience}{" "}
            {staffDetails?.data?.profile?.year_of_experience && "year(s)"}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Email:</div>
          <div className="d-r-right">{staffDetails?.data?.email} </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Phone Number:</div>
          <div className="d-r-right">{staffDetails?.data?.phone_number} </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Blood Group:</div>
          <div className="d-r-right">
            {staffDetails?.data?.profile?.blood_group}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Genotype:</div>
          <div className="d-r-right">
            {staffDetails?.data?.profile?.blood_type}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Guarantor:</div>
          <div className="d-r-right">
            {staffDetails?.data?.profile?.guarantor_name}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Guarantor's Profession:</div>
          <div className="d-r-right">
            {staffDetails?.data?.profile?.guarantor_employment_role}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Marital Status:</div>
          <div className="d-r-right">
            {" "}
            {staffDetails?.data?.profile?.marital_status}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Next of Kin:</div>
          <div className="d-r-right">
            {" "}
            {staffDetails?.data?.profile?.next_of_kin_name}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left"></div>
          <div className="d-r-right">
            {staffDetails?.data?.profile?.next_of_kin_email},{" "}
            {staffDetails?.data?.profile?.next_of_kin_phone_number}
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
            {staffDetails?.data?.height} {staffDetails?.data?.height && "cm"}
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
            {staffDetails?.data?.weight} {staffDetails?.data?.weight && "kg"}
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
