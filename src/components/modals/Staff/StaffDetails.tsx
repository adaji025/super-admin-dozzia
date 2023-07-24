import { useState, useEffect } from "react";
import { Button, Group, Divider, LoadingOverlay, Avatar } from "@mantine/core";
import useTheme from "../../../hooks/useTheme";
import useStaff from "../../../hooks/useStaff";
import { StaffType } from "../../../types/staffTypes";
import { ApiResponseType } from "../../../types/utilityTypes";

const StaffDetails = ({ closeModal, staff, modalActive }: any) => {
  const { dark } = useTheme();
  const { loading, handleGetStaffDetails } = useStaff();
  const [staffDetails, setStaffDetails] = useState<StaffType | null>(null);

  useEffect(() => {
    if (modalActive) {
      handleGetStaffDetails(staff?.staffId).then(
        (res: ApiResponseType<StaffType>) => {
          setStaffDetails(res.data);
        }
      );
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Divider mb="md" variant="dashed" />

      {staffDetails && (
        <div className="view-details no-next">
          <Avatar
            mb={10}
            src={staffDetails.picture ? staffDetails.picture : null}
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
              {`${staffDetails.title ?? ""} ${staffDetails.first_name ?? ""} ${
                staffDetails.last_name ?? ""
              }`}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Staff Role:</div>
            <div className="d-r-right">{staffDetails.role.name ?? ""}</div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Username:</div>
            <div className="d-r-right">{staffDetails.username ?? ""}</div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Date of Birth:</div>
            <div className="d-r-right">{staffDetails.meta.dob ?? ""} </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Years of Experience:</div>
            <div className="d-r-right">
              {staffDetails.meta.years_of_experience}{" "}
              {staffDetails.meta.years_of_experience && "year(s)"}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Email:</div>
            <div className="d-r-right">{staffDetails.email} </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Phone Number:</div>
            {/* <div className="d-r-right">{staffDetails.phone_number} </div> */}
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Blood Group:</div>
            <div className="d-r-right">
              {staffDetails.meta.blood_group ?? ""}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Genotype:</div>
            <div className="d-r-right">{staffDetails.meta.genotype ?? ""}</div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Guarantor:</div>
            <div className="d-r-right">
              {staffDetails.guarantor.full_name ?? ""}
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
              {staffDetails.guarantor.employment_role ?? ""}
            </div>
          </div>

          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Marital Status:</div>
            <div className="d-r-right">{/* {staffDetails.meta.} */}</div>
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
              {staffDetails.relative.full_name ?? ""}
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
              {staffDetails.relative.email ?? ""}{" "}
              {staffDetails.relative.email && ","}
              {staffDetails.relative.phone_number ?? ""}
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
              {staffDetails.meta.height} {staffDetails.meta.height && "cm"}
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
              {staffDetails.meta.weight} {staffDetails.meta.weight && "kg"}
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

export default StaffDetails;
