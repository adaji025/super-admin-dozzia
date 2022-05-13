import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Button,
  Input,
  Table,
  Box,
  Skeleton,
  Pagination,
  Menu,
  Group,
  Alert,
  Divider,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { Search, User, Filter, FilterOff, X, Trash } from "tabler-icons-react";
import useStaff from "../../hooks/useStaff";
import useAdmin from "../../hooks/useAdmin";
import Confirmation from "../../components/modals/Confirmation/Confirmation";

const Staff = () => {
  const { dark } = useTheme();
  const {
    staffList,
    handleGetStaffList,
    loading,
    handleDeleteStaff,
    username,
  } = useStaff();
  const { staffRoles, getStaffRoles } = useAdmin();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");
  const [confirmDeleteStaff, setConfirmDeleteStaff] = useState<boolean>(false);
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    handleGetStaffList(page, perPage, search, role);
    getStaffRoles();
    //eslint-disable-next-line
  }, [page, search, role]);

  return (
    <Fragment>
      <Helmet>
        <title>Staff</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Staff" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Confirmation
        isOpened={confirmDeleteStaff}
        closeModal={() => {
          setConfirmDeleteStaff(false);
        }}
        title="Are you sure you want to suspend staff?"
        confirmText="SUSPEND"
        submit={() => {
          setConfirmDeleteStaff(false);
          handleDeleteStaff(staffId);
        }}
        hasInput
      />

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left">Staff</div>

            <div className="d-p-h-right">
              <Button component={Link} to="/add-staff">
                Add Staff
              </Button>
            </div>
          </div>

          <div
            className="d-p-search with-btns"
            style={{
              background: dark ? "#121212" : "#f8f9fa",
            }}
          >
            <div className="s-left">
              <Input
                sx={{
                  maxWidth: "706px",
                }}
                icon={<Search size={16} />}
                placeholder="Search staff"
                value={searchInput}
                onKeyUp={(e: any) => {
                  if (e.code === "Enter") {
                    setSearch(searchInput);
                  }
                }}
                rightSection={
                  searchInput !== "" && (
                    <X
                      strokeWidth={1.4}
                      style={{ opacity: 0.5 }}
                      className="click"
                      onClick={() => {
                        setSearchInput("");
                        setSearch("");
                      }}
                    />
                  )
                }
                onChange={(e: any) => {
                  setSearchInput(e.target.value);
                }}
              />
            </div>

            <div className="s-right">
              <Button
                onClick={() => {
                  setSearch(searchInput);
                }}
              >
                Search
              </Button>

              <Menu
                size="sm"
                control={
                  <Button
                    leftIcon={<Filter size={14} />}
                    ml="sm"
                    variant="default"
                  >
                    Filter
                  </Button>
                }
              >
                <Menu.Label>Filter Menu</Menu.Label>
                {staffRoles.map(
                  (item: { role_id: string; role_name: string }) => (
                    <Menu.Item
                      onClick={() => {
                        setRole(item.role_name);
                      }}
                      disabled={role === item.role_name}
                      key={item.role_id}
                    >
                      {item.role_name}
                    </Menu.Item>
                  )
                )}

                <Divider />

                <Menu.Item
                  onClick={() => {
                    setRole("");
                  }}
                  color="red"
                  icon={<FilterOff size={14} />}
                >
                  Clear filter
                </Menu.Item>
              </Menu>
            </div>
          </div>

          <Box sx={{ maxWidth: 900, minHeight: 173 }} className="d-p-main">
            {staffList && staffList.data && !loading ? (
              <>
                <Table striped>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                        className="large-only"
                      ></th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                      >
                        Name
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                        className="large-only"
                      >
                        Phone No.
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          color: dark ? "#b3b7cb" : "#898989",
                        }}
                      >
                        {role === "" ? "Staff Role" : `${role}s only`}
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                          width: "1px",
                        }}
                        className="table-last head large-only"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList?.data.length > 0 &&
                      staffList?.data.map(
                        (
                          item: {
                            staff_id: string;
                            first_name: number;
                            last_name: string;
                            phone_number: string;
                            title: string;
                            username: string;
                            role: string;
                          },
                          index: number
                        ) => (
                          <tr key={item.staff_id}>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                color: dark ? "#b3b7cb" : "#898989",
                              }}
                              className="large-only"
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              {`${item.title ?? ""} ${item.first_name} ${
                                item.last_name
                              }`}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                              className="large-only"
                            >
                              {item.phone_number}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {item.role}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                width: "20px",
                              }}
                              className="table-last"
                            >
                              <Menu
                                position={deviceWidth < 576 ? "left" : "right"}
                                gutter={15}
                                withArrow
                                size="sm"
                              >
                                <Menu.Label>Menu</Menu.Label>

                                <Menu.Item icon={<User size={14} />}>
                                  View Staff
                                </Menu.Item>

                                <Divider />

                                <Menu.Item
                                  color="red"
                                  icon={<Trash size={14} />}
                                  onClick={() => {
                                    setConfirmDeleteStaff(true);
                                    setStaffId(item.staff_id);
                                  }}
                                  disabled={username === item.username}
                                >
                                  Suspend Staff
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>

                {staffList?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No {role === "" ? "Staff" : `${role}`} found.
                    </Alert>
                  </Group>
                )}
              </>
            ) : (
              <>
                <Skeleton height={25} mt={30} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
                <Skeleton height={25} mt={12} radius="sm" />
              </>
            )}
          </Box>

          {staffList?.meta && staffList?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setPage(value);
              }}
              initialPage={staffList.meta.current_page}
              total={staffList.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Staff;
