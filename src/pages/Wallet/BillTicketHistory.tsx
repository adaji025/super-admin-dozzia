import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Menu,
  Table,
  LoadingOverlay,
  Tabs,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { ChevronDown, Edit, Trash } from "tabler-icons-react";
import useNotification from "../../hooks/useNotification";
import EmptyImg from "../../assets/svg/EmptyState-2.svg";
import { deleteBill, getBills } from "../../services/bills/bills";
import { AxiosError } from "axios";
import { BillType } from "../../types/billsTypes";
import CreateBill from "./CreateBill";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import { showNotification } from "@mantine/notifications";

enum DateRangeTypes {
  THIS_WEEK = "This Week",
  LAST_WEEK = "Last Week",
  LAST_MONTH = "Last Month",
  THIS_MONTH = "This Month",
  CHOOSE_MONTH = "Choose month",
  ALL_TIME = "All time",
  CUSTOM = "Custom",
}

const BillTicketHistory = () => {
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateRangeTypes>(DateRangeTypes.THIS_WEEK);
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState<BillType[]>([]);
  const [activeBill, setActiveBill] = useState<BillType | null>(null);
  const [activebillId, setActiveBillId] = useState<string>("");
  const [page] = useState<number>(1);
  const [perPage] = useState<number>(100);
  const [createBill, setCreateBill] = React.useState<boolean>(false);
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState<boolean>(false);

  const navigate = useNavigate();
  const { handleError } = useNotification();

  const dates = [
    DateRangeTypes.THIS_WEEK,
    DateRangeTypes.LAST_WEEK,
    DateRangeTypes.LAST_MONTH,
    DateRangeTypes.THIS_MONTH,
    DateRangeTypes.CHOOSE_MONTH,
    DateRangeTypes.ALL_TIME,
    DateRangeTypes.CUSTOM,
  ];

  useEffect(() => {
    handleGetBills();
    //eslint-disable-next-line
  }, []);

  const handleGetBills = () => {
    setLoading(true);

    getBills(page, perPage)
      .then((res: any) => {
        setBills(res.data.data);
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteBill = () => {
    setLoading(true);

    deleteBill(activebillId)
      .then(() => {
        showNotification({
          title: "Delete Bill",
          message: "Are you sure you want to delete",
          color: "green",
        });
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <CreateBill
        callback={() => {}}
        close={() => setCreateBill(false)}
        drawerOpen={createBill}
        edit={activeBill}
      />

      <Confirmation
        isOpened={confirmDeleteEvent}
        closeModal={() => {
          setConfirmDeleteEvent(false);
        }}
        title="Are you sure you want to delete this broadcast?"
        confirmText="delete"
        submit={() => {
          setConfirmDeleteEvent(false);
          handleDeleteBill();
        }}
        hasInput={false}
      />

      <LoadingOverlay visible={loading} />
      <div className="transaction-history">
        <div className="header">
          <div className="title" onClick={() => navigate(-1)}>
            <div className="mt-4">
              <HiChevronLeft color="#292D32" size={24} />
            </div>
            <div>Bill/Ticket History</div>
          </div>
          <Menu
            withinPortal={true}
            size="xs"
            control={
              <Button
                rightIcon={<ChevronDown size={14} />}
                className="target-dropdown"
                size="xs"
              >
                {selectedDateRange}
              </Button>
            }
          >
            {dates.map((item, index) => (
              <>
                <Menu.Item
                  style={{ fontSize: 12 }}
                  key={index}
                  className="menu-item"
                  onClick={() => setSelectedDateRange(item)}
                >
                  {item}
                </Menu.Item>
                <Divider className="divider" />
              </>
            ))}
          </Menu>
        </div>

        {bills.length === 0 && (
          <div className="empty-state">
            <img src={EmptyImg} alt="" />
            <div className="title">No recent transactions</div>
            <div className="desc">
              Start carrying out transactions on Dozzia
            </div>
          </div>
        )}

        {bills.length !== 0 && (
          <div className="tabs">
            <div className="table-container">
              <Table horizontalSpacing="sm">
                <thead>
                  <tr>
                    <th>Payment Type</th>
                    <th>Payment Deadline</th>
                    <th>Payment Parties</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bills?.map((bill) => (
                    <tr className="wallet-table-row" key={bill.id}>
                      <td className="start">{bill.title}</td>
                      <td>{bill.deadline_date}</td>
                      <td>{bill.classroom.name}</td>
                      <td className="end">NGN 5666</td>
                      <td>
                        <Menu gutter={15} withArrow size="sm">
                          <Menu.Label>Menu</Menu.Label>

                          <Menu.Item
                            icon={<Edit size={14} />}
                            onClick={() => {
                              setActiveBill(bill);
                              setCreateBill(true);
                            }}
                          >
                            Update Bill
                          </Menu.Item>

                          <Menu.Item
                            color="red"
                            icon={<Trash size={14} />}
                            onClick={() => {
                              setConfirmDeleteEvent(true);
                              setActiveBillId(bill.id);
                            }}
                          >
                            Delete Event
                          </Menu.Item>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BillTicketHistory;
