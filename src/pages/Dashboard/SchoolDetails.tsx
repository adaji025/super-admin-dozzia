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
import { ChevronDown, ExternalLink } from "tabler-icons-react";

import Mountain from "../../assets/svg/mountains.svg";
import CloudIcon from "../../assets/svg/cloud.svg";

const SchoolDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
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

  return (
    <Fragment>
      <Helmet>
        <title>Management</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>

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
          <Menu
            gutter={15}
            withArrow
            size="xs"
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
          <Button size="md" color="dark">
            Onboard Student
          </Button>
        </Group>

        <Box mt={32}>
          {studentData.map((item, index) => (
            <AnalyticsCard item={item} index={index} key={index} />
          ))}
        </Box>

        <Box mt={32}>
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
                        <Menu.Item>Edit student</Menu.Item>
                        <Divider />
                        <Menu.Item>View student details</Menu.Item>
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
      </div>

      <div className="dashboard"></div>
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
