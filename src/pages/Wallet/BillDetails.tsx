import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { getBill } from "../../services/wallet/bills";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import { BillType, SchoolTicket } from "../../types/billsTypes";
import { AxiosError } from "axios";
import {
  Button,
  Divider,
  Drawer,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { ReactComponent as ArrowLeft } from "../../assets/svg/arrow-left.svg";
import moment from "moment";
import Transactions from "./Transactions";

const BillDetails = () => {
  const navigate = useNavigate();
  const { billId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<BillType | null>(null);
  const { handleError } = useNotification();
  const [ticketsDrawer, setTicketsDrawer] = useState<boolean>(false);

  useEffect(() => {
    getBillDetails();
    //eslint-disable-next-line
  }, [billId]);

  const getBillDetails = () => {
    if (!billId) return;

    setLoading(true);

    getBill(billId)
      .then((res: BillType) => {
        setBill(res);
      })
      .catch((err: AxiosError) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bill-details">
      <BreakdownDrawer
        drawerOpen={ticketsDrawer}
        close={() => setTicketsDrawer(false)}
        tickets={bill?.school_tickets ?? []}
      />

      <Group spacing={8} align="center">
        <ArrowLeft className="click" onClick={() => navigate(-1)} />
        <Text size="lg" weight={500}>
          {bill?.title ?? "Bill Details"}
        </Text>
      </Group>

      <div className="bill-info relative">
        <LoadingOverlay visible={loading} />

        <DetailItem title="Description" value={bill?.description ?? "N/A"} />

        <DetailItem
          title="Date Created"
          value={moment(bill?.deadline_date).format("YYYY-MM-DD")}
        />

        <DetailItem
          title="Deadline Date"
          value={moment(bill?.deadline_date).format("YYYY-MM-DD")}
        />

        <DetailItem
          title="Created by"
          value={`${bill?.created_by_staff.first_name ?? "N/A"} ${
            bill?.created_by_staff.last_name ?? ""
          }`}
        />

        <DetailItem
          title="Number of installments"
          value={bill?.number_of_installments ?? "N/A"}
        />

        <DetailItem
          title="Status"
          value={bill?.status.toUpperCase() ?? "N/A"}
        />

        <DetailItem
          title="Classes"
          value={
            bill?.classrooms.map((classroom) => classroom.name).join(", ") ?? ""
          }
        />

        <DetailItem
          title="Tickets"
          value={
            <Button
              variant="default"
              compact
              size="sm"
              onClick={() => setTicketsDrawer(true)}
            >
              View Tickets
            </Button>
          }
        />
      </div>

      <Divider mt={24} mb={16} variant="dashed" />

      <Text size="lg" weight={500}>
        Recent Transactions
      </Text>

      <Transactions billId={billId} />
    </div>
  );
};

interface BreakdownDrawerProps {
  drawerOpen: boolean;
  close: () => void;
  tickets: SchoolTicket[];
}

const BreakdownDrawer = ({
  drawerOpen,
  close,
  tickets,
}: BreakdownDrawerProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="wallet-drawer"
      title={
        <Text weight={600} className="title">
          Tickets Breakdown
        </Text>
      }
    >
      {drawerOpen && (
        <div className="send-money">
          <Divider mb={24} />

          {tickets.map((ticket, index) => (
            <Fragment key={ticket.school_ticket_id}>
              <Group position="apart">
                <Text size="sm">{ticket.title}</Text>

                <Text weight={500}>₦{ticket.amount}</Text>
              </Group>

              {tickets.length !== index + 1 && (
                <Divider my={16} variant="dashed" />
              )}
            </Fragment>
          ))}

          <Group mt={24} position="right">
            <Button variant="default" size="xs" onClick={close}>
              Close
            </Button>
          </Group>
        </div>
      )}
    </Drawer>
  );
};

interface DetailItemProps {
  title: string;
  value: string | number | ReactElement;
}

const DetailItem = ({ title, value }: DetailItemProps) => {
  return (
    <div className="bill-info__item">
      <div className="item-title">{title}</div>
      <div className="item-value">{value}</div>
    </div>
  );
};

export default BillDetails;
