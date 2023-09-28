import React, { Fragment, useState } from "react";
import {
  Text,
  Tabs,
  Group,
  Button,
  Menu,
  Box,
  Table,
  Avatar,
  Divider,
} from "@mantine/core";
import { Helmet } from "react-helmet";
import { ChevronDown, Filter } from "tabler-icons-react";

import Mountain from "../../assets/svg/mountains.svg";
import CloudIcon from "../../assets/svg/cloud.svg";
import StudentDetails from "./StudentDetails";
import { useNavigate } from "react-router-dom";
import StafftDetails from "./StaffDetails";

const SchoolDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openStudentDetails, setOpenStudentDetails] = useState(false);
  const [openStaffDetails, setOpenStaffDetails] = useState(false);

  const navigate = useNavigate();
  const analyticsData = [
    {
      title: "School name",
      value: "Grace field school",
    },
    {
      title: "Address",
      value: "14 Kunle street",
    },
    {
      title: "Total Students",
      value: 500,
    },
    {
      title: "Total Staff",
      value: 100,
    },
    {
      title: "Payment deadline",
      value: "August 13, 2023",
    },
    {
      title: "Official phone number",
      value: "+234 8187654321",
    },
    {
      title: "Official email address",
      value: "example@gracefieldschool.com",
    },
    {
      title: "Principal’s name",
      value: "Mr Shola Oni",
    },
    {
      title: "Principal’s phone number",
      value: "+234 90876543212",
    },
    {
      title: "Principal’s email address",
      value: "test@gradefieldschool.com",
    },
  ];

  const studentData = [
    {
      title: "Total Schools",
      value: 1000,
      desc: "3.5% increase this month",
    },
  ];

  const tableData = [
    {
      image: null,
      name: "Tonia James",
      reg_no: "2RU736IW",
      class: "JSS 1 A",
      guardian_name: "Kunle Remi",
    },
    {
      image: null,
      name: "Toyosi Ade",
      reg_no: "2RU736IW",
      class: "JSS 1 A",
      guardian_name: "Kunle Remi",
    },
  ];

  const staffTableData = [
    {
      name: "Tonia James",
      phone_no: "090887776655",
      staff_role: "School Admin",
      date_onboarded: "Jun 13, 2023",
      onboarded_by: "Kunle Remi",
    },
    {
      name: "Toyosi Ade",
      phone_no: "090887776655",
      staff_role: "Teacher",
      date_onboarded: "Jun 13, 2023",
      onboarded_by: "Kunle Remi",
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Student Details</title>
        <meta property="og:title" content="Student" />
      </Helmet>

      <StudentDetails
        drawerOpen={openStudentDetails}
        close={() => setOpenStudentDetails(false)}
      />

      <StafftDetails
        drawerOpen={openStaffDetails}
        close={() => setOpenStaffDetails(false)}
      />

      <div className="details-analytics">
        <Text weight={600} size="lg">
          Gracefield School
        </Text>
        <div className="d-analytics">
          {analyticsData.map((analytics, index) => (
            <div className="d-card" key={index}>
              <Text size="xs">{analytics.title}</Text>
              <Text mt={6} weight={500} size="sm">
                {analytics.value}
              </Text>
            </div>
          ))}
        </div>

        <Tabs mt={44} active={activeTab} onTabChange={setActiveTab}>
          <Tabs.Tab label={<Text weight={500}>Students</Text>}></Tabs.Tab>
          <Tabs.Tab label={<Text weight={500}>Staff</Text>}></Tabs.Tab>
        </Tabs>

        <Group mt={32} position="right">
          {activeTab === 0 && (
            <Menu
              gutter={15}
              withArrow
              size="md"
              control={
                <Button
                  rightIcon={<ChevronDown />}
                  size="md"
                  color="dark"
                  variant="outline"
                >
                  Select Class
                </Button>
              }
            >
              <Menu.Item>Jss 1</Menu.Item>
              <Menu.Item>Jss 2</Menu.Item>
            </Menu>
          )}

          {activeTab === 1 && (
            <Menu
              gutter={15}
              withArrow
              size="md"
              control={
                <Button
                  rightIcon={<Filter />}
                  size="md"
                  color="dark"
                  variant="outline"
                >
                  Role
                </Button>
              }
            >
              <Menu.Item>Teacher</Menu.Item>
              <Menu.Item>School Admin</Menu.Item>
              <Menu.Item>Principal</Menu.Item>
            </Menu>
          )}

          <Button
            size="md"
            color="dark"
            onClick={() => {
              activeTab === 0 && navigate("/onboard-student");
              activeTab === 1 && navigate("/onboard-staff");
            }}
          >
            Onboard {activeTab === 0 ? "Student" : "Staff"}
          </Button>
        </Group>

        <Box mt={32}>
          {studentData.map((item, index) => (
            <AnalyticsCard item={item} index={index} key={index} />
          ))}
        </Box>

        <Box
          mt={32}
          className={`table-content ${activeTab === 0 ? "active" : ""}`}
        >
          <Text size="lg" weight={600}>
            Students
          </Text>
          <div className="table-container">
            <Table>
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Reg Number</th>
                  <th>Class</th>
                  <th>Guardian Name</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((element, index) => (
                  <tr key={index}>
                    <td>
                      <Avatar src="avatar.png" alt="it's me" />
                    </td>
                    <td>{element.name}</td>
                    <td>{element.reg_no}</td>
                    <td>{element.class}</td>
                    <td>{element.guardian_name}</td>
                    <td>
                      <Menu>
                        <Menu.Item>
                          <Text weight={300} color="#495057">
                            Menu
                          </Text>
                        </Menu.Item>

                        <Divider />
                        <Menu.Item onClick={() => navigate("/onboard-student")}>
                          Edit student
                        </Menu.Item>
                        <Divider />
                        <Menu.Item onClick={() => setOpenStudentDetails(true)}>
                          View student details
                        </Menu.Item>
                        <Divider />
                        <Menu.Item color="red">Delete student</Menu.Item>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Box>

        <Box
          mt={32}
          className={`table-content ${activeTab === 1 ? "active" : ""}`}
        >
          <Text size="lg" weight={600}>
            Staff/Gracefield high school
          </Text>
          <div className="table-container">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Staff Role</th>
                  <th>Date Onboarded</th>
                  <th> Onboarded By</th>
                </tr>
              </thead>
              <tbody>
                {staffTableData.map((element, index) => (
                  <tr key={index}>
                    <td>
                      <Avatar src="avatar.png" alt="it's me" />
                    </td>
                    <td>{element.name}</td>
                    <td>{element.phone_no}</td>
                    <td>{element.staff_role}</td>
                    <td>{element.date_onboarded}</td>
                    <td>{element.onboarded_by}</td>
                    <td>
                      <Menu>
                        <Menu.Item onClick={() => setOpenStaffDetails(true)}>
                          View staff
                        </Menu.Item>
                        <Divider />
                        <Menu.Item onClick={() => navigate("/onboard-staff")}>
                          Edit staff
                        </Menu.Item>
                        <Divider />
                        <Menu.Item>Suspend staff</Menu.Item>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Box>
      </div>
    </Fragment>
  );
};

type AnalyticsProps = {
  index: number;
  item: {
    title: string;
    value: number;
    desc: string;
  };
};

const AnalyticsCard = ({ item, index }: AnalyticsProps) => {
  return (
    <div className={`analytic-card c-${index}`}>
      <div className="a-title">{item.title}</div>
      <div className="a-total">{item.value}</div>
      <div className="a-desc">
        <img src={CloudIcon} alt="dozzia" />
        {item.desc}
      </div>
      <img src={Mountain} alt="mountains" className="mountains" />
    </div>
  );
};

export default SchoolDetails;
