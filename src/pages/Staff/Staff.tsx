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
  Modal,
  Text,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { Search, User, Filter, X, UserOff } from "tabler-icons-react";
import useStaff from "../../hooks/useStaff";
import useAdmin from "../../hooks/useAdmin";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import StaffDetails from "../../components/modals/Staff/StaffDetails";

const Staff = () => {
  const { dark } = useTheme();
  const {
    staffList,
    handleGetStaffList,
    loading,
    setLoading,
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
  const [staffDetailsModal, setStaffDetailsModal] = useState<boolean>(false);
  const [staffInfo, setStaffInfo] = useState<{
    fullName: string;
    staffId: string;
  } | null>(null);
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

      <Modal
        opened={staffDetailsModal}
        onClose={() => {
          setStaffDetailsModal(false);
          setTimeout(() => {
            setStaffInfo(null);
          }, 500);
        }}
        title={<Text weight={600}>{staffInfo?.fullName}</Text>}
        size="lg"
      >
        <StaffDetails
          closeModal={() => {
            setStaffDetailsModal(false);
            setTimeout(() => {
              setStaffInfo(null);
            }, 500);
          }}
          staff={staffInfo}
          modalActive={staffDetailsModal}
        />
      </Modal>

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left no-select">Staff</div>

            <div className="d-p-h-right">
              <Button component={Link} to="/add-staff">
                Add Staff
              </Button>
            </div>
          </div>

          <div
            className="d-p-search with-btns next"
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
                    if (searchInput !== "") {
                      setLoading(true);
                      setSearch(searchInput);
                    }
                  }
                }}
                rightSection={
                  (searchInput !== "" || search !== "") && (
                    <X
                      strokeWidth={1.4}
                      style={{ opacity: 0.5 }}
                      className="click"
                      onClick={() => {
                        if (search !== "") {
                          setLoading(true);
                          setSearch("");
                        }
                        setSearchInput("");
                      }}
                    />
                  )
                }
                onChange={(e: any) => {
                  setSearchInput(e.target.value);
                }}
              />
            </div>

            <div className="s-right next">
              <Button
                onClick={() => {
                  if (searchInput !== "") {
                    setLoading(true);
                    setSearch(searchInput);
                  }
                }}
              >
                Search
              </Button>

              <Menu
                size="sm"
                placement="end"
                control={
                  <Button
                    leftIcon={<Filter size={14} />}
                    ml="sm"
                    variant="default"
                  >
                    Role
                  </Button>
                }
              >
                <Menu.Label>Role Menu</Menu.Label>
                <Divider />

                <Menu.Item
                  onClick={() => {
                    setLoading(true);
                    setRole("");
                  }}
                  disabled={role === ""}
                >
                  All Staff
                </Menu.Item>

                {staffRoles.map(
                  (item: { role_id: string; role_name: string }) => (
                    <Menu.Item
                      onClick={() => {
                        setLoading(true);
                        setRole(item.role_name);
                      }}
                      disabled={role === item.role_name}
                      key={item.role_id}
                    >
                      {item.role_name}
                    </Menu.Item>
                  )
                )}
              </Menu>
            </div>
          </div>

          <Box sx={{ maxWidth: 900, minHeight: 173 }} className="d-p-main">
            {staffList && staffList.data && !loading ? (
              <>
                <Table striped verticalSpacing="md">
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
                        }}
                      >
                        Name
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                        className="large-only"
                      >
                        Phone No.
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
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

                                <Menu.Item
                                  icon={<User size={14} />}
                                  onClick={() => {
                                    setStaffDetailsModal(true);
                                    setStaffInfo({
                                      fullName: `${item?.title} ${item?.first_name} ${item?.last_name}`,
                                      staffId: item?.staff_id,
                                    });
                                  }}
                                >
                                  View Staff
                                </Menu.Item>

                                <Divider />

                                <Menu.Item
                                  color="red"
                                  icon={<UserOff size={14} />}
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
                if (value !== staffList.meta.current_page) {
                  setLoading(true);
                  setPage(value);
                }
              }}
              initialPage={staffList.meta.current_page}
              total={staffList.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Staff;
