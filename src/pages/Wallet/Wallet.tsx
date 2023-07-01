import React from "react";
import { Button, Group, Table } from "@mantine/core";
import { HiChevronRight } from "react-icons/hi";
import SetupWallet from "./SetupWallet";
import AccountSuccessModal from "./SuccessModal";
import SendMoney from "./SendMoney";

import { ReactComponent as WalletIcon } from "../../assets/svg/navigation/wallet.svg";
import Purse from "../../assets/images/purse.png";
import Mascot from "../../assets/svg/smile-mascot.svg";
import Tick from "../../assets/svg/tick.svg";

import Mountain from "../../assets/svg/mountains.svg";
import Frame from "../../assets/images/frame.png";
import FundWallet from "./FundWallet";
import CreateBill from "./CreateBill";
import "./wallet.scss";

const tableData = [
  {
    transaction_id: "DOZ123456778",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Success",
  },
  {
    transaction_id: "DOZ123456778",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Success",
  },
  {
    transaction_id: "DOZ123456778",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Pending",
  },
  {
    transaction_id: "DOZ123456778",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Failed",
  },
  {
    transaction_id: "DOZ123456778",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Failed",
  },
];

const Wallet = () => {
  const [successOpen, setSuccessOpen] = React.useState<boolean>(false);
  const [setupWalletDrawer, setSetupWalletDrawer] =
    React.useState<boolean>(true);
  const [sendMoneyDrawer, setSendMoneyDrawer] = React.useState<boolean>(false);
  const [fundWallet, setFundWallet] = React.useState<boolean>(false);
  const [createBill, setCreateBill] = React.useState<boolean>(false);

  const features = [
    "Send money to teachers",
    "Receive funds from parents",
    "Create Bill/Ticket",
    "View wallet history ",
  ];

  const actions = [
    {
      title: "You have 3 events",
      text: "Send money to teachers seamlessly",
      btnText: "Send Money",
      variant: "dark",
    },
    {
      title: "Go to class wall",
      text: "Fund your wallet or receive funds from parents, others",
      btnText: "Fund Wallet",
      variant: "green",
    },
    {
      title: "Staff",
      text: "Generate payment invoice and send to parents",
      btnText: "Create Bill ",
      variant: "yellow",
    },
  ];

  const actionHandler = (btnText: string) => {
    btnText === "Send Money"
      ? setSendMoneyDrawer(true)
      : btnText === "Fund Wallet"
      ? setFundWallet(true)
      : setCreateBill(true);
  };

  return (
    <>
      <AccountSuccessModal
        modalOpen={successOpen}
        close={() => setSuccessOpen(false)}
      />

      <SetupWallet
        drawerOpen={setupWalletDrawer}
        close={() => setSetupWalletDrawer(false)}
        callback={() => {}}
        openSuccessModal={setSuccessOpen}
      />

      <SendMoney
        drawerOpen={sendMoneyDrawer}
        callback={() => {}}
        close={() => setSendMoneyDrawer(false)}
      />

      <FundWallet
        callback={() => {}}
        close={() => setFundWallet(false)}
        drawerOpen={fundWallet}
        openSuccessModal={setSuccessOpen}
      />

      <CreateBill
        callback={() => {}}
        close={() => setCreateBill(false)}
        drawerOpen={createBill}
        openSuccessModal={setSuccessOpen}
      />

      {tableData.length === 0 ? (
        <div className="wallet">
          <div className="purse-on-mobile">
            <img src={Purse} alt="purse" className="purse-2" />
          </div>

          <div className="wallet-empty-state">
            <div className="wallet-features">
              {features.map((feature, index) => (
                <div className="feature" key={index}>
                  <div className="feature-box">
                    <img src={Tick} alt="small tick" />
                  </div>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mascot-wallet">
              <img src={Purse} alt="purse" className="purse" />
              <img src={Mascot} alt="mascot" className="mascot" />
            </div>
          </div>

          <Group mt={24} position="center">
            <Button
              size="md"
              mt={42}
              onClick={() => setSetupWalletDrawer(true)}
            >
              Setup Wallet
            </Button>
          </Group>
        </div>
      ) : (
        <div className="wallet-container">
          <div className="wallet-header">
            <div className="wallet-header-box balance">
              <div className="title">Wallet Balance</div>
              <div className="balance-box">
                <WalletIcon />
                <h2>NGN 1,000,000</h2>
                <img src={Frame} alt="" className="frame" />
              </div>
            </div>
            <div className="wallet-header-box actions">
              {actions.map((action) => (
                <ActionCard {...{ action }} handleAction={actionHandler} />
              ))}
            </div>
          </div>
          <div className="wallet-table-desc">
            <div className="title">Recent Transactions</div>
            <div className="view-all-btn">
              View All <HiChevronRight />
            </div>
          </div>
          <div className="table-container">
            <Table horizontalSpacing="sm">
              <thead>
                <tr>
                  <th>TRANSACTION ID</th>
                  <th>DATE</th>
                  <th>TRANSACTION TYPE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

// interface TableDataProps {
//   data: {
//     transaction_id: string;
//     date: string;
//     transaction_type: string;
//     amount: string;
//     status: string;
//   };
// }

const rows = tableData.map((data) => (
  <tr className="wallet-table-row">
    <td className="start">{data.transaction_id}</td>
    <td>{data.date}</td>
    <td>{data.transaction_type}</td>
    <td>NGN {data.amount}</td>
    <td>
      <div
        className={`status ${
          data.status === "Success"
            ? "success"
            : data.status === "Pending"
            ? "pending"
            : "failed"
        }`}
      >
        {data.status}
      </div>
    </td>
    <td className="end">
      <Button variant="default" size="xs">
        Details
      </Button>
    </td>
  </tr>
));

interface ActionProps {
  handleAction: (title: string) => void;
  action: {
    title: string;
    btnText: string;
    text: string;
    variant: string;
  };
}

const ActionCard = ({ action, handleAction }: ActionProps) => {
  return (
    <div className={`wallet-action card-${action.variant}`}>
      <div className={`wallet-action-text card-${action.variant}`}>
        {action.title}
      </div>
      <div className={`wallet-action-desc card-${action.variant}`}>
        {action.text}
      </div>
      <Button
        className={`card-${action.variant}`}
        onClick={() => handleAction(action.btnText)}
      >
        {action.btnText}
      </Button>
      <img src={Mountain} alt="mountains" />
    </div>
  );
};

export default Wallet;
