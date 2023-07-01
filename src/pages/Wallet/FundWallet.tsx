import { Button, Text, Drawer, Divider, Group } from "@mantine/core";
import { BiCopy } from "react-icons/bi";

interface FundWalletProps {
  drawerOpen: boolean;
  close: () => void;
  openSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
}

const FundWallet = ({
  drawerOpen,
  callback,
  close,
  openSuccessModal,
}: FundWalletProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="wallet-drawer"
      title={<Text className="title">Fund Wallet</Text>}
    >
      {drawerOpen && (
        <>
          <Divider mb={20} />
          <div className="title">
            Copy the account details below to send funds to your wallet
          </div>

          <form className="wallet-form">
            <div className="fund-wallet-container">
              <div className="label">Account details</div>
              <div className="fund-wallet-acc">
                <div>3109876543</div>
                <div className="fund-wallet-copy">
                  <BiCopy />
                </div>
              </div>
            </div>

            <div className="fund-wallet-container">
              <div className="label">Bank</div>
              <div className="fund-wallet-acc">
                <div>First bank of Nigeria</div>
              </div>
            </div>

            <div className="fund-wallet-container">
              <div className="label">Account name</div>
              <div className="fund-wallet-acc">
                <div>Gracefield Highschool International</div>
              </div>
            </div>

            <Group position="right">
              <Button variant="default" mt="lg" onClick={close}>
                Cancel
              </Button>
            </Group>
          </form>
        </>
      )}
    </Drawer>
  );
};

export default FundWallet;
