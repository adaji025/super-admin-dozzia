import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Table,
  Box,
  Skeleton,
  Pagination,
  Menu,
  ScrollArea,
  Group,
  Alert,
  Divider,
  Modal,
  Text,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { ClipboardList, Checks, BrandHipchat, X } from "tabler-icons-react";
import useReports from "../../hooks/useReports";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import ViewReport from "../../components/modals/Reports/ViewReport";

const Reports = () => {
  const { dark } = useTheme();
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [confirmResolve, setConfirmResolve] = useState<boolean>(false);
  const [reportId, setReportId] = useState<string>("");
  const [report, setReport] = useState<any>(null);
  const [statusChangeText, setStatusChangeText] = useState<{
    from: string;
    to: string;
  }>({ from: "", to: "" });

  const { handleGetReports, reports, loading, setLoading, handleUpdateStatus } =
    useReports();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);

  useEffect(() => {
    handleGetReports(page, perPage);

    //eslint-disable-next-line
  }, [page]);

  return (
    <Fragment>
      <Helmet>
        <title>Reports & Complaints</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Reports & Complaints" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={reportModal}
        onClose={() => {
          setReportModal(false);
          setTimeout(() => {
            setReport(null);
          }, 500);
        }}
        title={
          <Text weight={600}>
            Issue {report?.tracking_code} ({report?.status})
          </Text>
        }
        size="xl"
      >
        <ViewReport
          closeModal={() => {
            setReportModal(false);
            setTimeout(() => {
              setReport(null);
            }, 500);
          }}
          report={report}
        />
      </Modal>

      <Confirmation
        isOpened={confirmResolve}
        closeModal={() => {
          setConfirmResolve(false);
        }}
        title={`Are you sure you want to change ticket status from ${statusChangeText.from} to ${statusChangeText.to}?`}
        confirmText="Status Change"
        submit={() => {
          setConfirmResolve(false);
          handleUpdateStatus(reportId, statusChangeText.to);
        }}
        hasInput={false}
      />

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left">Reports and Complaints</div>

            <div className="d-p-h-right"></div>
          </div>

          <Box
            mt={40}
            sx={{ maxWidth: 1300, minHeight: 173 }}
            className="d-p-main"
          >
            {reports && reports?.data && !loading ? (
              <>
                <ScrollArea>
                  <Table striped verticalSpacing="md" sx={{ minWidth: 900 }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                          }}
                        ></th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Issue Number
                        </th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Title
                        </th>
                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Created By
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Date
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Status
                        </th>

                        <th
                          style={{
                            borderBottom: `1px solid #0000`,
                            color: dark ? "#b3b7cb" : "#898989",
                          }}
                        >
                          Comment
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
                      {reports?.data.map(
                        (
                          item: {
                            comment: string;
                            date: string;
                            id: string;
                            status: string;
                            student: {
                              id: string;
                              first_name: string;
                              last_name: string;
                            };
                            parent: {
                              id: string;
                              title: string;
                              first_name: string;
                              last_name: string;
                            };
                            title: string;
                            tracking_code: string;
                          },
                          index: number
                        ) => (
                          <tr key={item.id}>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                color: dark ? "#b3b7cb" : "#898989",
                              }}
                            >
                              {index + 1}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "600",
                              }}
                            >
                              {item?.tracking_code}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {item?.title}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {`${item?.parent?.title} ${item?.parent?.first_name} ${item?.parent?.last_name}`}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              {item.date}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.status}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.comment}
                            </td>

                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                width: "20px",
                              }}
                              className="table-last"
                            >
                              <Menu position="left" withArrow size="md">
                                <Menu.Label>Menu</Menu.Label>
                                <Menu.Item
                                  icon={<ClipboardList size={14} />}
                                  onClick={() => {
                                    setReport(item);
                                    setReportModal(true);
                                  }}
                                >
                                  View Report
                                </Menu.Item>

                                <Divider />

                                <Menu.Item
                                  icon={<Checks size={14} />}
                                  onClick={() => {
                                    setReportId(item?.id);
                                    setStatusChangeText({
                                      from: item.status,
                                      to: "resolved",
                                    });
                                    setConfirmResolve(true);
                                  }}
                                  disabled={item.status === "resolved"}
                                >
                                  Set as Resolved
                                </Menu.Item>
                                <Menu.Item
                                  icon={<BrandHipchat size={14} />}
                                  onClick={() => {
                                    setStatusChangeText({
                                      from: item.status,
                                      to: "in-progress",
                                    });
                                    setConfirmResolve(true);
                                    setReportId(item?.id);
                                  }}
                                  disabled={item.status === "in-progress"}
                                >
                                  Set as In-progress
                                </Menu.Item>
                                <Menu.Item
                                  icon={<X size={14} />}
                                  onClick={() => {
                                    setStatusChangeText({
                                      from: item.status,
                                      to: "unresolved",
                                    });
                                    setConfirmResolve(true);
                                    setReportId(item?.id);
                                  }}
                                  disabled={item.status === "unresolved"}
                                >
                                  Set as Unresolved
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </ScrollArea>
                {reports?.data.length === 0 && (
                  <Group grow position="center" my={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No report found.
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

          {reports?.meta && reports?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 1100 }}
              position="center"
              mt={25}
              onChange={(value) => {
                if (value !== reports.meta.current_page) {
                  setLoading(true);
                  setPage(value);
                }
              }}
              initialPage={reports.meta.current_page}
              total={reports.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Reports;
