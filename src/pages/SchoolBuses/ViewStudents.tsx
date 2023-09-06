import { Button, Group, Menu, Table, Avatar, Divider } from "@mantine/core";
import React, { useState } from "react";
import StudentDetails from "./StudentDetails";
import AddStudentToBus from "./AddStudentToBus";

const ViewStudents = () => {
  const [openViewStudent, setOpenViewStudent] = useState<boolean>(false);
  const [openAddStudent, setOpenAddStudent] = useState<boolean>(false);

  const tableData = [
    {
      picture: "",
      name: "Tonia James",
      reg_number: "2RU736IW",
      class: "js 1",
    },
    {
      picture: "",
      name: "Tonia James",
      reg_number: "2RU736IW",
      class: "js 1",
    },
    {
      picture: "",
      name: "Tonia James",
      reg_number: "2RU736IW",
      class: "js 1",
    },
  ];
  return (
    <>
      <StudentDetails
        drawerOpen={openViewStudent}
        close={() => setOpenViewStudent(false)}
        callback={() => {}}
      />
      <AddStudentToBus
        drawerOpen={openAddStudent}
        close={() => setOpenAddStudent(false)}
        callback={() => {}}
      />
      <div className="bus">
        <Group position="apart">
          <div className="title">School Vehicles</div>

          <Button color="dark" onClick={() => setOpenAddStudent(true)}>
            Add Student
          </Button>
        </Group>
        <div className="bus-content">
          <div className="table-container">
            <Table horizontalSpacing="sm">
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Reg Number</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index: number) => (
                  <tr className="" key={index}>
                    <td>
                      <Avatar radius="xl" src={null} />
                    </td>
                    <td className="start">{data.name}</td>
                    <td>{data.reg_number}</td>
                    <td>{data.class}</td>
                    <td className="end">
                      <Menu>
                        <Menu.Label>Menu</Menu.Label>
                        <Divider />
                        <Menu.Item onClick={() => setOpenViewStudent(true)}>
                          View student details
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                          color="red"
                          onClick={() => console.log("object")}
                        >
                          Remove from vehicle
                        </Menu.Item>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* <div className="mascot-container relative">
            <img src={RelaxedMascot} alt="" />
            <div className="tool-tip">
              Relax, monitor and track your school buses 🚌 all on Dozzia
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ViewStudents;
