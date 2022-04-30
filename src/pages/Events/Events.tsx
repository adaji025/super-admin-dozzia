import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Modal, Text, Input, Menu, Divider } from "@mantine/core";
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
import "./events.scss";

const Events = () => {
  const { dark } = useTheme();
  const [createEventModal, setCreateEventModal] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<any>(null);
  const { handleCreateEvent, handleGetEvents, events } = useEvent();

  useEffect(() => {
    handleGetEvents();
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
          setEditEvent(null);
        }}
        title={<Text weight={600}>{editEvent ? "Edit" : "Create"} Event</Text>}
        size="lg"
      >
        <CreateEvent
          closeModal={() => {
            setCreateEventModal(false);
            setEditEvent(null);
          }}
          edit={editEvent}
          submit={handleCreateEvent}
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
                  end_date: string;
                  start_date: string;
                  title: string;
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

                            <Menu.Item icon={<CalendarEvent size={14} />}>
                              View Event
                            </Menu.Item>

                            <Divider />

                            <Menu.Item
                              color="red"
                              icon={<Trash size={14} />}
                              onClick={() => {}}
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
              <div>ji</div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
