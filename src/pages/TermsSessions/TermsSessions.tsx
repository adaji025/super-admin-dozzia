import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Menu,
  Skeleton,
  Alert,
  Group,
  Box,
  Table,
  ScrollArea,
  Modal,
  Text,
} from "@mantine/core";
import { ClipboardList } from "tabler-icons-react";
import useTheme from "../../hooks/useTheme";
import useTermsSessions from "../../hooks/useTermsSessions";
import AddTerm from "../../components/modals/TermsSessions/AddTerm";
import AddSession from "../../components/modals/TermsSessions/AddSession";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import { SessionType } from "../../types/termSessionTypes";

const TermsSessions = () => {
  const { dark } = useTheme();
  const [addTermModal, setAddTermModal] = useState<boolean>(false);
  const [addSessionModal, setAddSessionModal] = useState<boolean>(false);
  const [confirmDeleteTerm, setConfirmDeleteTerm] = useState<boolean>(false);
  const [termId, setTermId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [confirmSetSession, setConfirmSetSession] = useState<boolean>(false);

  const deviceWidth = window.innerWidth;
  const {
    loading,
    handleGetSessions,
    handleSetActiveSession,
    sessions,
    terms,
    handleDeleteTerm,
  } = useTermsSessions();

  useEffect(() => {
    handleGetSessions();

    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Terms & Sessions</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Terms & Sessions" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addTermModal}
        onClose={() => {
          setAddTermModal(false);
        }}
        title={<Text sx={{ fontWeight: 600 }}>Add Term</Text>}
        size="md"
      >
        <AddTerm
          closeModal={() => {
            setAddTermModal(false);
          }}
        />
      </Modal>

      <Modal
        opened={addSessionModal}
        onClose={() => {
          setAddSessionModal(false);
        }}
        title={<Text sx={{ fontWeight: 600 }}>Add Session</Text>}
        size="md"
      >
        <AddSession
          closeModal={() => {
            setAddSessionModal(false);
          }}
        />
      </Modal>

      <Confirmation
        isOpened={confirmDeleteTerm}
        closeModal={() => {
          setConfirmDeleteTerm(false);
        }}
        title="Are you sure you want to delete this term?"
        confirmText="DELETE"
        submit={() => {
          setConfirmDeleteTerm(false);
          handleDeleteTerm(termId);
        }}
        hasInput
      />

      <Confirmation
        isOpened={confirmSetSession}
        closeModal={() => {
          setConfirmSetSession(false);
        }}
        title="Are you sure you want to set this session as active?"
        confirmText="Set Active Session"
        submit={() => {
          setConfirmSetSession(false);
          handleSetActiveSession(sessionId);
        }}
        hasInput={false}
        confirmButtonColor="dark"
      />

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left no-select">Sessions</div>

            <div className="d-p-h-right">
              <Button
                onClick={() => {
                  setAddSessionModal(true);
                }}
              >
                Add Session
              </Button>
            </div>
          </div>

          <Box
            mt={20}
            sx={{ maxWidth: 800, minHeight: 173 }}
            className="d-p-main"
          >
            {sessions && sessions.data && !loading ? (
              <>
                <Table striped verticalSpacing="md">
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Session
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Active Session
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
                    {sessions?.data.length > 0 &&
                      sessions?.data.map((item: SessionType) => (
                        <tr key={item.session_id}>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                              fontWeight: "500",
                            }}
                          >
                            {item.start_year}/{item?.end_year}
                          </td>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                            }}
                          >
                            {item?.is_current ? "Active" : ""}
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
                                icon={<ClipboardList size={14} />}
                                onClick={() => {
                                  setConfirmSetSession(true);
                                  setSessionId(item?.session_id);
                                }}
                                disabled={item.is_current}
                              >
                                Set as active
                              </Menu.Item>
                            </Menu>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>

                {sessions?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No session found.
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

        <div className="d-p-wrapper" style={{ marginTop: 30 }}>
          <div className="d-p-header">
            <div className="d-p-h-left no-select">
              {sessions?.data.length > 0 &&
                sessions?.data.map(
                  (item: {
                    id: string;
                    end_year: number;
                    start_year: number;
                    is_current: boolean;
                  }) =>
                    item?.is_current && (
                      <span>
                        {item.start_year}/{item?.end_year}
                      </span>
                    )
                )}{" "}
              Terms
            </div>

            <div className="d-p-h-right">
              <Button
                onClick={() => {
                  setAddTermModal(true);
                }}
              >
                Add Term
              </Button>
            </div>
          </div>

          <Box
            mt={20}
            sx={{ maxWidth: 800, minHeight: 173 }}
            className="d-p-main"
          >
            {terms && terms.data && !loading ? (
              <ScrollArea>
                <Table striped verticalSpacing="md" sx={{ minWidth: 600 }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Term
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Start Date
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        End Date
                      </th>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Active Term
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
                    {terms?.data.length > 0 &&
                      terms?.data.map(
                        (item: {
                          id: string;
                          start_date: number;
                          end_date: number;
                          is_current: boolean;
                          term: number;
                        }) => (
                          <tr key={item.id}>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              Term {item?.term}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              {item?.start_date}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              {item?.end_date}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {item?.is_current ? "Active" : ""}
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
                                  icon={<ClipboardList size={14} />}
                                  onClick={() => {
                                    setTermId(item?.id);
                                    setConfirmDeleteTerm(true);
                                  }}
                                  disabled={terms?.data.length < 2}
                                >
                                  Delete Term
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>

                {terms?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No term found.
                    </Alert>
                  </Group>
                )}
              </ScrollArea>
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

export default TermsSessions;
