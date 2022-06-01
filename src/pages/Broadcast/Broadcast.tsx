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
} from "@mantine/core";
import {
  AdjustmentsHorizontal,
  Search,
  Trash,
  CalendarEvent,
} from "tabler-icons-react";
import useTheme from "../../hooks/useTheme";
import useBroadcast from "../../hooks/useBroadcast";
import CreateBroadcast from "../../components/modals/Broadcast/CreateBroadcast";
import moment from "moment";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import "./broadcast.scss";

const Events = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const { dark } = useTheme();
  const [createBroadcastModal, setBroadcastEventModal] =
    useState<boolean>(false);
  const [event, setEvent] = useState<any>(null);
  const [eventId, setEventId] = useState<string>("");
  const { handleGetBroadcastList, handleCreateBroadcast } = useBroadcast();
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState<boolean>(false);

  useEffect(() => {
    handleGetBroadcastList(page, perPage);
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Braodcast</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Braodcast" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={createBroadcastModal}
        onClose={() => {
          setBroadcastEventModal(false);
          setEvent(null);
        }}
        title={
          <Text weight={600}>
            {event ? "Broadcast Details" : "Create Broadcast"}
          </Text>
        }
        size="lg"
      >
        <CreateBroadcast
          closeModal={() => {
            setBroadcastEventModal(false);
            setEvent(null);
          }}
          edit={event}
          submit={event ? handleCreateBroadcast : handleCreateBroadcast}
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
          // handleDeleteEvent(eventId);
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
            <div className="d-p-h-left">Braodcast</div>

            <div className="d-p-h-right">
              <Button
                onClick={() => {
                  setBroadcastEventModal(true);
                }}
              >
                Create Braodcast
              </Button>
            </div>
          </div>

          {/* <div className="events-main">
            {events && events.data ? (
              <>
                {events.data.map(
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
                                  setBroadcastEventModal(true);
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
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {events?.data.length === 0 && (
                  <Group
                    grow
                    sx={{ width: "100%", maxWidth: "900px" }}
                    position="center"
                    my={80}
                  >
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No event found.
                    </Alert>
                  </Group>
                )}
              </>
            ) : (
              <>
                <Skeleton
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
                <Skeleton
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
                <Skeleton
                  width={320}
                  height={205}
                  mx={10}
                  mt={20}
                  radius="sm"
                />
                <Skeleton
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
                <Skeleton
                  width={320}
                  height={205}
                  mt={20}
                  mx={10}
                  radius="sm"
                />
              </>
            )}
          </div> */}

          {/* {events?.meta && events?.data.length > 0 && (
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
          )} */}
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
