import { Button, Divider, Menu, Table } from "@mantine/core";
import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { ChevronDown } from "tabler-icons-react";
import EmptyImg from "../../assets/svg/EmptyState-2.svg";
import { useNavigate } from "react-router-dom";

enum DateRangeTypes {
  THIS_WEEK = "This Week",
  LAST_WEEK = "Last Week",
  LAST_MONTH = "Last Month",
  THIS_MONTH = "This Month",
  CHOOSE_MONTH = "Choose month",
  ALL_TIME = "All time",
  CUSTOM = "Custom",
}

const tableData = [
  {
    transaction_id: "Excursion",
    payment_deadline: "June 13, 2023",
    payment_parties: "Jss 1 Parents",
    amount: "25,000",
  },
  {
    transaction_id: "Excursion",
    payment_deadline: "June 13, 2023",
    payment_parties: "Jss 1 Parents",
    amount: "25,000",
  },
  {
    transaction_id: "Excursion",
    payment_deadline: "June 13, 2023",
    payment_parties: "Jss 1 Parents",
    amount: "25,000",
  },
  {
    transaction_id: "Excursion",
    payment_deadline: "June 13, 2023",
    payment_parties: "Jss 1 Parents",
    amount: "25,000",
  },
];

const BillTicketHistory = () => {
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateRangeTypes>(DateRangeTypes.THIS_WEEK);
  const navigate = useNavigate();

  const dates = [
    DateRangeTypes.THIS_WEEK,
    DateRangeTypes.LAST_WEEK,
    DateRangeTypes.LAST_MONTH,
    DateRangeTypes.THIS_MONTH,
    DateRangeTypes.CHOOSE_MONTH,
    DateRangeTypes.ALL_TIME,
    DateRangeTypes.CUSTOM,
  ];

  return (
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

      {tableData.length === 0 && (
        <div className="empty-state">
          <img src={EmptyImg} alt="" />
          <div className="title">No recent transactions</div>
          <div className="desc">Start carrying out transactions on Dozzia</div>
        </div>
      )}

      {tableData.length !== 0 && (
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
                {tableData.map((data) => (
                  <tr className="wallet-table-row">
                    <td className="start">{data.transaction_id}</td>
                    <td>{data.payment_deadline}</td>
                    <td>{data.payment_parties}</td>
                    <td className="end">NGN {data.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillTicketHistory;
