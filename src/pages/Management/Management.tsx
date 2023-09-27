import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LoadingOverlay, Text, Table, Button } from "@mantine/core";

import Mountain from "../../assets/svg/mountains.svg";
import CloudIcon from "../../assets/svg/cloud.svg";

import "./management.scss";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const [loading] = useState<boolean>(false);

  const navigate = useNavigate()

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

 

  const analyticsData = [
    {
      title: "Total Schools",
      value: 1000,
      desc: "3.5% increase this month",
    },
    {
      title: "Active Schools",
      value: 900,
      desc: "5% increase this month",
    },
    {
      title: "Total Parents",
      value: 300,
      desc: "6% increase this month",
    },
    {
      title: "Total Staff",
      value: 1000,
      desc: "3.5% decrease this month",
    },
  ];

  const tableData = [
    {
      name: "Grace field school",
      address: "14, Kunle street Lagos",
      date_onboarded: "Jun 13, 2023",
      onboarded_by: "Kunle Remi"
    },
    {
      name: "Grace field school",
      address: "14, Kunle street Lagos",
      date_onboarded: "Jun 13, 2023",
      onboarded_by: "Kunle Remi"
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Management</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>

      <LoadingOverlay visible={loading} />

      <div className="analytics">
        {analyticsData.map((item, index) => (
          <AnalyticsCard item={item} index={index} key={index} />
        ))}
      </div>

      <div className="dashboard">
        <Text size="xl" weight={600}>
          Schools
        </Text>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>School name</th>
                <th>Address</th>
                <th>Date Onboarded</th>
                <th>Onboarded by</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((element, index) => (
                <tr key={element.name}>
                  <td>{element.address}</td>
                  <td>{element.date_onboarded}</td>
                  <td>{element.onboarded_by}</td>
                  <td><Button color="dark" variant="outline"
                  onClick={() => navigate("/school-details/1")}>Details</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
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

export default Management;
