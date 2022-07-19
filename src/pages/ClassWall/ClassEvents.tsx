import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Modal,
  Text,
  Input,
  Menu,
  Divider,
  Pagination,
  Skeleton,
  Alert,
  Group,
  Box,
  Table,
} from "@mantine/core";
import { X, Search, Trash, CalendarEvent } from "tabler-icons-react";
import useTheme from "../../hooks/useTheme";
import useEvent from "../../hooks/useEvent";
import CreateEvent from "../../components/modals/Events/CreateEvent";
import moment from "moment";
import { useSelector } from "react-redux";
import Confirmation from "../../components/modals/Confirmation/Confirmation";

const ClassEvents = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const { dark } = useTheme();
  const [createEventModal, setCreateEventModal] = useState<boolean>(false);
  const [event, setEvent] = useState<any>(null);
  const [eventId, setEventId] = useState<string>("");
  const deviceWidth = window.innerWidth;
  const {
    handleCreateEvent,
    handleGetEvents,
    handleDeleteEvent,
    handleUpdateEvent,
    setLoading,
    loading,
    events,
  } = useEvent();
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState<boolean>(false);
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });

  useEffect(() => {
    handleGetEvents(page, perPage, search, classWall?.activeClassId);

    //eslint-disable-next-line
  }, [page, search]);

  const createEvent = (values: {
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    visibility: string;
    time: string;
  }) => {
    handleCreateEvent({ ...values, classId: classWall?.activeClassId });
  };

  return (
    <Fragment>
      <Helmet>
        <title>{classWall?.activeClassName} Events</title>
        <meta name="description" content="" />
        <meta
          property="og:title"
          content={`${classWall?.activeClassName} Events`}
        />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={createEventModal}
        onClose={() => {
          setCreateEventModal(false);
          setEvent(null);
        }}
        title={
          <Text weight={600}>{event ? "Event Details" : "Create Event"}</Text>
        }
        size="lg"
      >
        <CreateEvent
          closeModal={() => {
            setCreateEventModal(false);
            setEvent(null);
          }}
          edit={event}
          submit={event ? handleUpdateEvent : createEvent}
        />
      </Modal>

      <Confirmation
        isOpened={confirmDeleteEvent}
        closeModal={() => {
          setConfirmDeleteEvent(false);
        }}
        title="Are you sure you want to delete this event?"
        confirmText="delete"
        submit={() => {
          setConfirmDeleteEvent(false);
          handleDeleteEvent(eventId);
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
            <div className="d-p-h-left no-select">
              {classWall?.activeClassName} Events
            </div>

            <div className="d-p-h-right">
              <Button
                onClick={() => {
                  setCreateEventModal(true);
                }}
              >
                Create Event
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
                placeholder="Search event"
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

            <div className="s-right">
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
            </div>
          </div>

          <Box sx={{ maxWidth: 1000, minHeight: 173 }} className="d-p-main">
            {events && events.data && !loading ? (
              <>
                <Table striped verticalSpacing="md">
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Event
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
                        className="large-only"
                      >
                        End Date
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                        className="large-only"
                      >
                        Time
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
                    {events?.data.length > 0 &&
                      events?.data.map(
                        (item: {
                          event_id: string;
                          description: string;
                          end_date: string;
                          start_date: string;
                          title: string;
                          visibility: string;
                        }) => (
                          <tr key={item.event_id}>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                                fontWeight: "500",
                              }}
                            >
                              {item.title}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                            >
                              {moment(item.start_date).format("DD/MM/YYYY")}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                              className="large-only"
                            >
                              {moment(item.end_date).format("DD/MM/YYYY")}
                            </td>
                            <td
                              style={{
                                borderBottom: `1px solid #0000`,
                              }}
                              className="large-only"
                            >
                              {moment(item.start_date).format("LT")} -{" "}
                              {moment(item.end_date).format("LT")}
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
                                <Menu.Label>Event Menu</Menu.Label>

                                <Menu.Item
                                  icon={<CalendarEvent size={14} />}
                                  onClick={() => {
                                    setCreateEventModal(true);
                                    setEvent({
                                      id: item.event_id,
                                      title: item.title,
                                      description: item.description,
                                      startDate: moment(
                                        item.start_date
                                      ).toDate(),
                                      startTime: moment(
                                        item.start_date
                                      ).toDate(),
                                      endDate: moment(item.end_date).toDate(),
                                      endTime: moment(item.end_date).toDate(),
                                      visibility:
                                        item.visibility === "Staff" ? "1" : "2",
                                    });
                                  }}
                                >
                                  View Details
                                </Menu.Item>

                                <Divider />

                                <Menu.Item
                                  color="red"
                                  icon={<Trash size={14} />}
                                  onClick={() => {
                                    setConfirmDeleteEvent(true);
                                    setEventId(item.event_id);
                                  }}
                                >
                                  Delete Event
                                </Menu.Item>
                              </Menu>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>

                {events?.data.length === 0 && (
                  <Group grow position="center" mt={80}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No class event found.
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

          {events?.meta && events?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 1000 }}
              position="center"
              mt={25}
              onChange={(value) => {
                if (value !== events.meta.current_page) {
                  setLoading(true);
                  setPage(value);
                }
              }}
              initialPage={events.meta.current_page}
              total={events.meta.last_page}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ClassEvents;
