import React from "react";
import { Drawer, Text, Divider, Button, Group } from "@mantine/core";
import { ReactComponent as MannualIcon } from "../../assets/svg/mannual-icon.svg";
import { ReactComponent as BeneFiciaryIcon } from "../../assets/svg/beneficiary-icon.svg";
import Frame from "../../assets/images/frame.png";
import MannualSendMoney from "./MannualSendMoney";
import BeneficiarySendMoney from "./BeneficiarySendMoney";

interface SendMoneyProps {
  drawerOpen: boolean;
  close: () => void;
  callback: () => void;
}

const SendMoney = ({ drawerOpen, callback, close }: SendMoneyProps) => {
  const [activeView, setActiveView] = React.useState<
    "select-type" | "manual" | "beneficiary"
  >("select-type");
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
          Send Money
        </Text>
      }
    >
      {drawerOpen && (
        <div className="send-money">
          <Divider my={20} />

          {activeView === "manual" && (
            <MannualSendMoney goBack={() => setActiveView("select-type")} />
          )}

          {activeView === "beneficiary" && (
            <BeneficiarySendMoney goBack={() => setActiveView("select-type")} />
          )}

          {activeView === "select-type" && (
            <>
              <div
                className="send-money-grid"
                onClick={() => setActiveView("manual")}
              >
                <MannualIcon />
                <div className="title">Send manually</div>
                <img src={Frame} alt="" className="frame" />
              </div>
              <div
                className="send-money-grid mt-24"
                onClick={() => setActiveView("beneficiary")}
              >
                <BeneFiciaryIcon />
                <div className="title">Select from beneficiaries</div>
                <img src={Frame} alt="" className="frame" />
              </div>

              <Group mt={24} position="right">
                <Button variant="default">Close</Button>
              </Group>
            </>
          )}
        </div>
      )}
    </Drawer>
  );
};

export default SendMoney;
