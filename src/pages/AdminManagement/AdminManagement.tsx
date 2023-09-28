import { Button, Group, Text, Table, Menu, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import ViewAdmin from "./ViewAdmin";

const AdminManagement = () => {
  const [viewAdmin, setViewAdmin] = useState(true);
  const navigate = useNavigate();
  const tableData = [
    {
      name: "Adaji Mukhtar",
      email_address: "m@gmail.com",
      phone_no: "09099889988",
      role: "admin",
      date_registered: "Jun 13, 2023",
      status: 0,
    },
    {
      name: "Adaji Mukhtar",
      email_address: "m@gmail.com",
      phone_no: "09099889988",
      role: "admin",
      date_registered: "Jun 13, 2023",
      status: 1,
    },
  ];
  return (
    <Fragment>
      <Helmet>
        <title>Admin Management</title>
        <meta property="og:title" content="adamin" />
      </Helmet>
      {viewAdmin && (
        <ViewAdmin drawerOpen={viewAdmin} close={() => setViewAdmin(false)} />
      )}
      <div className="dashboard">
        <Group position="apart">
          <Text weight={600} size="lg">
            Administrators
          </Text>
          <Button color="dark">Add Admin</Button>
        </Group>

        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>School name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <thead>Role</thead>
                <th>Date Registered</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((element, index) => (
                <tr key={index}>
                  <td>{element.name}</td>
                  <td className="email">{element.email_address}</td>
                  <td>{element.phone_no}</td>
                  <td>{element.role}</td>
                  <td>{element.date_registered}</td>
                  <td>
                    {element.status === 0 ? (
                      <Button className="status failed">Inactive</Button>
                    ) : (
                      <Button className="status success">Active</Button>
                    )}
                  </td>
                  <td>
                    <Menu>
                      <Menu.Item>
                        <Text weight={300} color="#495057">
                          Menu
                        </Text>
                      </Menu.Item>

                      <Divider />

                      <Menu.Item onClick={() => navigate("/onboard-student")}>
                        View Admin
                      </Menu.Item>

                      <Divider />

                      <Menu.Item onClick={() => navigate("/onboard-student")}>
                        Edit admin
                      </Menu.Item>

                      <Divider />

                      <Divider />
                      <Menu.Item color="red">Deactivate Admin</Menu.Item>
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

export default AdminManagement;
