import React, { useState } from "react";
import { Button, Group, Text, Tabs } from "@mantine/core";
import SetupWallet from "./SetupWallet";
import SendMoney from "./SendMoney";

import { ReactComponent as WalletIcon } from "../../assets/svg/navigation/wallet.svg";
import Purse from "../../assets/images/purse.png";
import Mascot from "../../assets/svg/smile-mascot.svg";
import Tick from "../../assets/svg/tick.svg";

import Mountain from "../../assets/svg/mountains.svg";
import Frame from "../../assets/images/frame.png";
import FundWallet from "./FundWallet";
import "./wallet.scss";
import Bills from "./Bills";
import Transactions from "./Transactions";
import { Helmet } from "react-helmet";

const Wallet = () => {
  const [wallet] = useState<boolean>(true);

  return (
    <div>
      {!wallet && <WalletEmpty />}

      {wallet && <WalletNotEmpty />}
    </div>
  );
};

const WalletEmpty = () => {
  const [setupWalletDrawer, setSetupWalletDrawer] = useState<boolean>(false);

  const features = [
    "Send money to teachers",
    "Receive funds from parents",
    "Create Bill/Ticket",
    "View wallet history ",
  ];

  return (
    <>
      <SetupWallet
        drawerOpen={setupWalletDrawer}
        close={() => setSetupWalletDrawer(false)}
        callback={() => {}}
      />

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
          <Button size="md" mt={42} onClick={() => setSetupWalletDrawer(true)}>
            Setup Wallet
          </Button>
        </Group>
      </div>
    </>
  );
};

const WalletNotEmpty = () => {
  const [sendMoneyDrawer, setSendMoneyDrawer] = useState<boolean>(false);
  const [fundWallet, setFundWallet] = useState<boolean>(false);
  const [createBillDrawer, setCreateBillDrawer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);

  const actions = [
    {
      title: "Send money",
      text: "Send money to teachers seamlessly",
      btnText: "Send Money",
      variant: "dark",
    },
    {
      title: "Fund Wallet",
      text: "Fund your wallet or receive funds from parents, others",
      btnText: "Fund Wallet",
      variant: "green",
    },
    {
      title: "Create Bill/Ticket",
      text: "Generate payment invoice and send to parents",
      btnText: "Create Bill",
      variant: "yellow",
    },
  ];

  const actionHandler = (btnText: string) => {
    btnText === "Send Money"
      ? setSendMoneyDrawer(true)
      : btnText === "Fund Wallet"
      ? setFundWallet(true)
      : setCreateBillDrawer(true);
  };

  return (
    <div>
      <Helmet>
        <title>Wallet</title>
      </Helmet>

      <SendMoney
        drawerOpen={sendMoneyDrawer}
        callback={() => {}}
        close={() => setSendMoneyDrawer(false)}
      />

      <FundWallet
        callback={() => {}}
        close={() => setFundWallet(false)}
        drawerOpen={fundWallet}
      />

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

        <Tabs active={activeTab} onTabChange={setActiveTab} variant="outline">
          <Tabs.Tab label="Bills"></Tabs.Tab>
          <Tabs.Tab label="Transactions"></Tabs.Tab>
        </Tabs>

        <div className={`table-content ${activeTab === 0 ? "active" : ""}`}>
          <Bills
            createBillDrawer={createBillDrawer}
            setCreateBillDrawer={setCreateBillDrawer}
          />
        </div>

        <div className={`table-content ${activeTab === 1 ? "active" : ""}`}>
          <Transactions />
        </div>
      </div>
    </div>
  );
};

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
