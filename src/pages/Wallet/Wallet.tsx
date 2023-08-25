import React from "react";
import { Button, Group, Table, Text } from "@mantine/core";
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
import { useNavigate } from "react-router-dom";
import EmptyImg from "../../assets/svg/EmptyState-2.svg";
import TransactionDetails from "./TransactionDetails";

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
  const [showSuccessModal, setShowSuccessModal] =
    React.useState<boolean>(false);
  const [setupWalletDrawer, setSetupWalletDrawer] =
    React.useState<boolean>(false);
  const [sendMoneyDrawer, setSendMoneyDrawer] = React.useState<boolean>(false);
  const [fundWallet, setFundWallet] = React.useState<boolean>(false);
  const [createBill, setCreateBill] = React.useState<boolean>(false);
  const [openDetails, setOpenDetails] = React.useState<boolean>(false);

  const navigate = useNavigate();

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
        modalOpen={showSuccessModal}
        close={() => setShowSuccessModal(false)}
      />

      <SetupWallet
        drawerOpen={setupWalletDrawer}
        close={() => setSetupWalletDrawer(false)}
        callback={() => {}}
        openSuccessModal={setShowSuccessModal}
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
        openSuccessModal={() => setShowSuccessModal(true)}
      />

      <CreateBill
        callback={() => {}}
        close={() => setCreateBill(false)}
        drawerOpen={createBill}
        edit={null}
      />

      <TransactionDetails
        callback={() => {}}
        close={() => setOpenDetails(false)}
        drawerOpen={openDetails}
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
              <Text weight={500}>Wallet Balance</Text>
              <div className="balance-box">
                <WalletIcon />
                <h2>NGN 1,000,000</h2>
                <img src={Frame} alt="" className="frame" />
              </div>
            </div>
            <div className="wallet-header-box actions">
              {actions.map((action, index: number) => (
                <ActionCard
                  key={index}
                  {...{ action }}
                  handleAction={actionHandler}
                />
              ))}
            </div>
          </div>

          <Group position="apart" mb={18}>
            <Text weight={500}>Recent Transactions</Text>

            <Group>
              <Button
                compact
                variant="subtle"
                onClick={() => navigate("/wallet/bill-ticket-history")}
              >
                View bills
              </Button>

              <Button
                compact
                variant="subtle"
                rightIcon={<HiChevronRight />}
                onClick={() => navigate("/wallet/transaction-history")}
              >
                View all
              </Button>
            </Group>
          </Group>

          {tableData.length === 0 && (
            <div className="empty-state">
              <img src={EmptyImg} alt="" />
              <div className="title">No recent transactions</div>
              <div className="desc">
                Start carrying out transactions on Dozzia
              </div>
            </div>
          )}

          {tableData.length !== 0 && (
            <div className="table-container">
              <Table horizontalSpacing="sm" verticalSpacing="md">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index: number) => (
                    <tr className="wallet-table-row" key={index}>
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
                        <Button
                          variant="default"
                          size="xs"
                          onClick={() => setOpenDetails(true)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
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
