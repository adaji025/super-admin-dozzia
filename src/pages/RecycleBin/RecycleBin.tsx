import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Table,
  Box,
  Skeleton,
  Menu,
  Group,
  Alert,
  Divider,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import useStaff from "../../hooks/useStaff";
import Confirmation from "../../components/modals/Confirmation/Confirmation";

const RecycleBin = () => {
  const { dark } = useTheme();
  const { loading, handleRestoreStaff, handleGetSuspendedStaff, username } =
    useStaff();
  const [suspendedStaff, setSuspendedStaff] = useState<any>(null);
  const [staffId, setStaffId] = useState<string>("");
  const [confirmRestoreStaff, setConfirmRestoreStaff] =
    useState<boolean>(false);
  const deviceWidth = window.innerWidth;

  useEffect(() => {
    getSuspendedStaff();
    //eslint-disable-next-line
  }, []);

  const getSuspendedStaff = () => {
    handleGetSuspendedStaff().then((res: any) => {
      setSuspendedStaff(res);
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
        isOpened={confirmRestoreStaff}
        closeModal={() => {
          setConfirmRestoreStaff(false);
        }}
        title="Are you sure you want to restore staff account?"
        confirmText="RESTORE"
        submit={() => {
          setConfirmRestoreStaff(false);
          handleRestoreStaff(staffId).then(() => {
            getSuspendedStaff();
          });
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
            <div className="d-p-h-left">Suspended Staff</div>
          </div>

          <Box
            mt={40}
            sx={{ maxWidth: 900, minHeight: 173 }}
            className="d-p-main"
          >
            {suspendedStaff && suspendedStaff.data && !loading ? (
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
                        Staff Role
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
                    {suspendedStaff?.data.length > 0 &&
                      suspendedStaff?.data.map(
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

                                <Divider />

                                <Menu.Item
                                  onClick={() => {
                                    setConfirmRestoreStaff(true);
                                    setStaffId(item.staff_id);
                                  }}
                                  disabled={username === item.username}
                                >
                                  Restore Staff
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>

                {suspendedStaff?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No suspended staff found.
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
        </div>
      </div>
    </Fragment>
  );
};

export default RecycleBin;
