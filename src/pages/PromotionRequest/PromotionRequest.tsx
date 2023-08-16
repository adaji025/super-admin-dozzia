import React, { Fragment, useState } from "react";
import { Group, Text, Table, Menu } from "@mantine/core";
import { Helmet } from "react-helmet";
import { ChevronLeft } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";

const PromotionRequest = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const datas = [
    {
      student_name: "Tonia James",
      score: 80,
      grade: "A",
      status: "rejected",
    },
    {
      student_name: "Tonia James",
      score: 80,
      grade: "A",
      status: "pending",
    },
    {
      student_name: "Tonia James",
      score: 80,
      grade: "A",
      status: "approved",
    },
  ];
  return (
    <Fragment>
      <Confirmation
        isOpened={confirmDelete}
        closeModal={() => setConfirmDelete(false)}
      />
      <Helmet>
        <title>Promotion Request</title>
        <meta property="og:title" content="Promotion Request" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>
      <div className="bus">
        <Group spacing="xs">
          <ChevronLeft
            size={24}
            strokeWidth={2}
            color={"black"}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <Text size="lg" weight={500}>
            Jss1 A
          </Text>
        </Group>

        <div className="table-container">
          <Table horizontalSpacing="sm">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((element, index) => (
                <tr key={index}>
                  <td>{element.student_name}</td>
                  <td>{element.score}</td>
                  <td>{element.grade}</td>
                  <td
                    className={`${element.status === "rejected" && "rejected"}`}
                  >
                    {element.status}
                  </td>
                  <td>
                    <Menu>
                      <Menu.Label>Menu</Menu.Label>
                      <Menu.Item>View report card</Menu.Item>
                      <Menu.Item onClick={() => setConfirmDelete(true)}>Promote</Menu.Item>
                      <Menu.Item>Repeat SS2</Menu.Item>
                      <Menu.Item>Demote to SS1</Menu.Item>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

export default PromotionRequest;
