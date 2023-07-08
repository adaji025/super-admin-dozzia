import { Button, Divider, Menu, Tabs } from "@mantine/core";
import React, { Fragment } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { ChevronDown } from "tabler-icons-react";
import TransactionTable from "./Table";
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

const TransactionHistory = () => {
  const [selectedDateRange, setSelectedDateRange] =
    React.useState<DateRangeTypes>(DateRangeTypes.THIS_WEEK);
  const [empty] = React.useState([]);

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
          <div>Transaction History</div>
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
            <Fragment key={index}>
              <Menu.Item
                style={{ fontSize: 12 }}
                className="menu-item"
                onClick={() => setSelectedDateRange(item)}
              >
                {item}
              </Menu.Item>
              <Divider className="divider" />
            </Fragment>
          ))}
        </Menu>
      </div>
      {empty.length === 0 && (
        <div className="empty-state">
          <img src={EmptyImg} alt="" />
          <div className="title">No recent transactions</div>
          <div className="desc">Start carrying out transactions on Dozzia</div>
        </div>
      )}
      {empty.length !== 0 && (
        <Tabs className="tabs">
          <Tabs.Tab label="All">
            <TransactionTable />
          </Tabs.Tab>
          <Tabs.Tab label="Deposits">
            <TransactionTable />
          </Tabs.Tab>
          <Tabs.Tab label="Transfer">
            <TransactionTable />
          </Tabs.Tab>
        </Tabs>
      )}
    </div>
  );
};

export default TransactionHistory;
