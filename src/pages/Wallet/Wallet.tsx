import React from "react";
import "./wallet.scss";
import {
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import Purse from "../../assets/images/purse.png";
import Success from "../../assets/images/Smile.png";
import Mascot from "../../assets/svg/smile-mascot.svg";
import Tick from "../../assets/svg/tick.svg";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  const navigate = useNavigate()
  const features = [
    "Send money to teachers",
    "Receive funds from parents",
    "Create Bill/Ticket",
    "View wallet history ",
  ];
  return (
    <>
      <Modal
        size={490}
        opened={isOpened}
        onClose={() => setIsOpened(false)}
        centered
      >
        <div className="modal-content">
          <img src={Success} alt="" />
          <span className="title">Transaction successful</span>
          <span className="modal-desc">Virtual account created successfully</span>
          <Button className="download-btn"
          onClick={() => navigate("/settings")}>Go to settings</Button>
        </div>
      </Modal>
      <div className="wallet">
        <div className="left">
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
            <img src={Mascot} alt="mascot" />
          </div>
        </div>
        <div className="right">
          <span className="title">Set up your Dozzia wallet</span>
          <Divider className="divider" />
          <span className="title">Primary bank account</span>
          <span className="acc-title">
            Add your school’s primary bank account details
          </span>
          <form className="form">
            <Select
              size="md"
              label={<Text className="label">Select bank</Text>}
              placeholder="Select receiver’s bank"
              data={[
                { value: "gtb", label: "GTB" },
                { value: "keystone", label: "Keytone" },
                { value: "first bank", label: "First Bank" },
                { value: "wema", label: "Wema" },
              ]}
            />
            <NumberInput
              size="md"
              mt="sm"
              hideControls
              label={<Text className="label">Account number</Text>}
            />
            <TextInput
              size="md"
              mt="sm"
              label={<Text className="label">Account name</Text>}
              placeholder="Enter BVN"
            />
            <span className="title">Card details</span>
            <span className="card-details-desc">
              Add your school’s primary bank account details
            </span>
            <NumberInput
              size="md"
              hideControls
              label={<Text className="label">Card number</Text>}
              placeholder="0000 0000 0000 0000"
            />
            <div className="card-details-inputs">
              <NumberInput
                size="md"
                mt="sm"
                hideControls
                label={<Text className="label">Exp date name</Text>}
                placeholder="MM /  YY"
              />
              <NumberInput
                size="md"
                mt="sm"
                hideControls
                label={<Text className="label">Account name</Text>}
                placeholder="Security code"
              />
            </div>
            <div className="btn">
              <Button size="md" mt="lg"
              onClick={() => setIsOpened(true)}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Wallet;
