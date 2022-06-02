import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { format } from "timeago.js";
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
  Avatar,
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
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import "./broadcast.scss";

const Events = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const { dark } = useTheme();
  const [createBroadcastModal, setBroadcastEventModal] =
    useState<boolean>(false);
  const [event, setEvent] = useState<any>(null);
  const [broadcastId, setBroadcastId] = useState<string>("");
  const {
    handleGetBroadcastList,
    handleCreateBroadcast,
    broadcasts,
    loading,
    setLoading,
    handleDeleteBroadcast,
  } = useBroadcast();
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
        title="Are you sure you want to delete this broadcast?"
        confirmText="delete"
        submit={() => {
          setConfirmDeleteEvent(false);
          handleDeleteBroadcast(broadcastId);
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
            <div className="d-p-h-left">Broadcast</div>

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

          <div className="broadcasts-main">
            {broadcasts && broadcasts.data ? (
              <>
                {broadcasts.data.map(
                  (item: {
                    broadcast_id: string;
                    created_at: string;
                    image_url: string;
                    plublished_at: string;
                    title: string;
                    summary: string;
                  }) => (
                    <div className="broadcast-item" key={item.broadcast_id}>
                      <div
                        className="b-i-wrapper"
                        style={{
                          background: dark ? "#121212" : "#f8f9fa",
                          color: dark ? "white" : "black",
                        }}
                      >
                        <div className="b-i-top">
                          {item?.image_url ? (
                            <a
                              href={item?.image_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Avatar
                                radius="xs"
                                size="lg"
                                src={item?.image_url}
                              />
                            </a>
                          ) : (
                            <Avatar
                              src={null}
                              alt="Vitaly Rtishchev"
                              radius="xs"
                              size="lg"
                              color="green"
                            >
                              {item.title[0].toUpperCase()}
                            </Avatar>
                          )}

                          <div className="i-t-right">
                            {format(item.plublished_at)}
                          </div>
                        </div>

                        <div className="b-i-middle">
                          <div className="m-title">{item.title}</div>
                          <div className="m-desc">{item.summary}</div>
                        </div>

                        <div className="b-i-bottom">
                          <div className="b-left"></div>

                          <div className="b-right">
                            <Menu
                              position="bottom"
                              placement="end"
                              withArrow
                              size="md"
                            >
                              <Menu.Label>Event Menu</Menu.Label>

                              <Menu.Item
                                icon={<CalendarEvent size={14} />}
                                onClick={() => {
                                  setBroadcastEventModal(true);
                                  // setEvent({
                                  //   id: item.event_id,
                                  //   title: item.title,
                                  //   description: item.description,
                                  //   startDate: moment(item.start_date).toDate(),
                                  //   startTime: moment(item.start_date).toDate(),
                                  //   endDate: moment(item.end_date).toDate(),
                                  //   endTime: moment(item.end_date).toDate(),
                                  //   visibility:
                                  //     item.visibility === "Staff" ? "1" : "2",
                                  // });
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
                                  setBroadcastId(item.broadcast_id);
                                }}
                              >
                                Delete Broadcast
                              </Menu.Item>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {broadcasts?.data.length === 0 && (
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
              </>
            )}
          </div>

          {broadcasts?.meta && broadcasts?.data.length > 0 && (
            <Pagination
              sx={{ maxWidth: 900 }}
              position="center"
              mt={25}
              onChange={(value) => {
                setPage(value);
              }}
              initialPage={broadcasts.meta.current_page}
              total={broadcasts.meta.last_page}
              color="green"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
