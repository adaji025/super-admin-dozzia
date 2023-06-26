import React from "react";
import "./wallet.scss";
import {
  Button,
  Modal,
} from "@mantine/core";
import Purse from "../../assets/images/purse.png";

import Mascot from "../../assets/svg/smile-mascot.svg";
import Tick from "../../assets/svg/tick.svg";
import { useNavigate } from "react-router-dom";

import SetupWallet from "./SetupWallet";
import AccountSuccessModal from "./SuccessModal";

const Wallet = () => {
  const [successOpen, setSuccessOpen] = React.useState<boolean>(false);
  const [setupWalletDrawer, setSetupWalletDrawer] = React.useState<boolean>(false);
 


  const features = [
    "Send money to teachers",
    "Receive funds from parents",
    "Create Bill/Ticket",
    "View wallet history ",
  ];

  return (
    <>
      <AccountSuccessModal successOpen={successOpen} close={() => setSuccessOpen(false)} />

      <SetupWallet drawerOpen={setupWalletDrawer} close={() => setSetupWalletDrawer(false)} callback={() => { }} openSuccessModal={setSuccessOpen}/>

      <div className="wallet">
        <div className="purse-on-mobile" >
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

        <div className="setup-wallet-btn-container">
          <Button size="md" mt={42} className="setup-btn"
            onClick={() => setSetupWalletDrawer(true)}>Setup Wallet</Button>
        </div>
      </div>
    </>
  );
};

export default Wallet;
