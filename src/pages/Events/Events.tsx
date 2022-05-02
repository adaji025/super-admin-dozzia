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
} from "@mantine/core";
import {
  AdjustmentsHorizontal,
  Search,
  Trash,
  CalendarEvent,
} from "tabler-icons-react";
import useTheme from "../../hooks/useTheme";
import useEvent from "../../hooks/useEvent";
import CreateEvent from "../../components/modals/Events/CreateEvent";
import moment from "moment";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import "./events.scss";

const Events = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const { dark } = useTheme();
  const [createEventModal, setCreateEventModal] = useState<boolean>(false);
  const [event, setEvent] = useState<any>(null);
  const [eventId, setEventId] = useState<string>("");
  const {
    handleCreateEvent,
    handleGetEvents,
    events,
    handleDeleteEvent,
    handleUpdateEvent,
  } = useEvent();
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState<boolean>(false);

  useEffect(() => {
    handleGetEvents(page, perPage);
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Events</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Events" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={createEventModal}
        onClose={() => {
          setCreateEventModal(false);
          setEvent(null);
        }}
        title={<Text weight={600}>{event ? "Edit" : "Create"} Event</Text>}
        size="lg"
      >
        <CreateEvent
          closeModal={() => {
            setCreateEventModal(false);
            setEvent(null);
          }}
          edit={event}
          submit={event ? handleUpdateEvent : handleCreateEvent}
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
            <div className="d-p-h-left">Events</div>

            <div className="d-p-h-right">
              <Button
                variant="light"
                onClick={() => {
                  setCreateEventModal(true);
                }}
              >
                Create Event
              </Button>
            </div>
          </div>

          <div
            className="d-p-search"
            style={{
              background: dark ? "#121212" : "#f8f9fa",
            }}
          >
            <Input
              sx={{
                maxWidth: "900px",
              }}
              icon={<Search size={16} />}
              placeholder="Search events"
              rightSection={
                <AdjustmentsHorizontal
                  strokeWidth={1.4}
                  style={{ opacity: 0.5 }}
                  className="click"
                />
              }
            />
          </div>

          <div className="events-main">
            {events && events.data ? (
              events.data.map(
                (item: {
                  event_id: string;
                  description: string;
                  end_date: string;
                  start_date: string;
                  title: string;
                  visibility: string;
                }) => (
                  <div className="event-item" key={item.event_id}>
                    <div
                      className="e-i-wrapper"
                      style={{
                        background: dark ? "#121212" : "#f8f9fa",
                        color: dark ? "white" : "black",
                      }}
                    >
                      <div className="e-i-top">
                        <div className="t-itemd">
                          <div>{moment(item.start_date).format("MMM")}</div>
                          <div className="day">
                            {moment(item.start_date).format("DD")}
                          </div>
                        </div>

                        {moment(item.start_date).format("YYYY-MM-DD") !==
                          moment(item.end_date).format("YYYY-MM-DD") && (
                          <Fragment>
                            <div className="t-btw">-</div>
                            <div className="t-itemd">
                              <div>{moment(item.end_date).format("MMM")}</div>
                              <div className="day">
                                {moment(item.end_date).format("DD")}
                              </div>
                            </div>
                          </Fragment>
                        )}
                      </div>

                      <div className="e-i-middle">{item.title}</div>

                      <div className="e-i-bottom">
                        <div className="b-left">
                          <div className="b-time">
                            {moment(item.start_date).format("LT")} -{" "}
                            {moment(item.end_date).format("LT")}
                          </div>
                          <div className="b-location">Online</div>
                        </div>

                        <div className="b-right">
                          <Menu
                            position="bottom"
                            placement="end"
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
                                  startDate: moment(item.start_date).toDate(),
                                  startTime: moment(item.start_date).toDate(),
                                  endDate: moment(item.end_date).toDate(),
                                  endTime: moment(item.end_date).toDate(),
                                  visibility:
                                    item.visibility === "Staff" ? "1" : "2",
                                });
                              }}
                            >
                              Edit Event
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
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <>
                <Skeleton
                  className="e-i-wrapper"
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
                <Skeleton
                  className="e-i-wrapper"
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
                <Skeleton
                  className="e-i-wrapper"
                  width={320}
                  height={205}
                  mx={10}
                  mt={20}
                  radius="sm"
                />
                <Skeleton
                  className="e-i-wrapper"
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
                <Skeleton
                  className="e-i-wrapper"
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
              </>
            )}
          </div>

          {events?.meta && events?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setPage(value);
              }}
              initialPage={events.meta.current_page}
              total={events.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
