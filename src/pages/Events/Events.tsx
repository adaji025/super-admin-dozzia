import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Input,
  Modal,
  Text,
  Table,
  Box,
  Skeleton,
  Pagination,
  Menu,
  Divider,
  Group,
  Alert,
} from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import useEvent from "../../hooks/useEvent";
import CreateEvent from "../../components/modals/Events/CreateEvent";
import "./events.scss";

const Events = () => {
  const { dark } = useTheme();
  const [createEventModal, setCreateEventModal] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<any>(null);
  const { handleCreateEvent, handleGetEvents } = useEvent();

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
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
