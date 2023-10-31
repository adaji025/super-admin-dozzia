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
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import StaffDetails from "../../components/modals/Staff/StaffDetails";
import { ApiResponseType, StaffRoleType } from "../../types/utilityTypes";
import { getStaffRoleList, uploadStaff } from "../../services/staff/staff";
import { AxiosError } from "axios";
import useNotification from "../../hooks/useNotification";
import { StaffType } from "../../types/staffTypes";
// import UploadStaff from "../../components/modals/Staff/uploadStaff";
import AddStaffPrompt from "../../components/modals/Staff/AddStaffPrompt";
import UploadStaff from "../../components/modals/Staff/UploadStaff";
import { showNotification } from "@mantine/notifications";

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
  const { handleError } = useNotification();

  const [staffRoles, setStaffRoles] = useState<StaffRoleType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<StaffRoleType | null>(null);
  const [staffId, setStaffId] = useState<string>("");
  const [confirmDeleteStaff, setConfirmDeleteStaff] = useState<boolean>(false);
  const [staffDetailsModal, setStaffDetailsModal] = useState<boolean>(false);
  const [staffInfo, setStaffInfo] = useState<{
    fullName: string;
    staffId: string;
  } | null>(null);
  const [excelFile, setExcelFile] = useState<any>(null);
  const [addStaffPrompt, setAddStaffPrompt] = useState<boolean>(false);
  const [opeExcelModal, setOpenExcelModal] = useState<boolean>(false);
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    handleGetStaffList(page, perPage, search, role ? role.name : "");
    getStaffRoles();
    //eslint-disable-next-line
  }, [page, search, role]);

  const getStaffRoles = () => {
    getStaffRoleList()
      .then((res: ApiResponseType<StaffRoleType[]>) => {
        setStaffRoles(res.data);
      })
      .catch((err: AxiosError) => {
        handleError(err);
      });
  };

  const handleUploadExcelFile = () => {
    setLoading(true);

    let formData = new FormData();
    formData.append("file_import", excelFile);

    uploadStaff(formData)
      .then(() => {
        setOpenExcelModal(false);
        showNotification({
          title: "Success",
          message: "File uploaded Successfully",
          color: "green",
        });
        handleGetStaffList(page, perPage, search, role ? role.name : "");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

      <AddStaffPrompt
        opened={addStaffPrompt}
        close={() => setAddStaffPrompt(false)}
        openNext={() => setOpenExcelModal(true)}
      />
      <UploadStaff
        opened={opeExcelModal}
        close={() => setOpenExcelModal(false)}
        file={excelFile}
        setFile={setExcelFile}
        handleUploadExcelFile={handleUploadExcelFile}
      />
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
              <Button onClick={() => setAddStaffPrompt(true)}>Add Staff</Button>
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
                    setRole(null);
                  }}
                  disabled={!role}
                >
                  All Staff
                </Menu.Item>

                {staffRoles.map((item: StaffRoleType) => (
                  <Menu.Item
                    onClick={() => {
                      setLoading(true);
                      setRole(item);
                    }}
                    disabled={role?.role_id === item.role_id}
                    key={item.role_id}
                  >
                    {item.name}
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </div>

          <Box sx={{ maxWidth: 900, minHeight: 173 }} className="d-p-main">
            {!loading && staffList.dataFetched ? (
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
                        {role ? `${role.name}s only` : "Staff Role"}
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
                    {staffList.data.map((item: StaffType, index: number) => (
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
                          {item.phone_number ?? "N/A"}
                        </td>
                        <td
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        >
                          {item.role.name}
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
                    ))}
                  </tbody>
                </Table>

                {staffList?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No {role ? `${role.name}` : "Staff"} found.
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

          {staffList.meta && staffList.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="left"
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
