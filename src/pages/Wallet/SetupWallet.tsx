import {
  Button,
  Drawer,
  Group,
  NumberInput,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from "@mantine/core";

interface SetupWalletProps {
  drawerOpen: boolean;
  close: () => void;
  openSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
}

const SetupWallet = ({
  drawerOpen,
  callback,
  close,
  openSuccessModal,
}: SetupWalletProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="wallet-drawer"
      title={<Text className="title">Set up your Dozzia wallet</Text>}
    >
      {drawerOpen && (
        <ScrollArea className="drawer-scroll-container" type="auto">
          <div className="title">Primary bank account</div>

          <div className="acc-title">
            Add your school’s primary bank account details
          </div>

          <form className="wallet-form">
            <Select
              size="sm"
              label="Select bank"
              placeholder="Select receiver’s bank"
              data={[
                { value: "gtb", label: "GTB" },
                { value: "keystone", label: "Keytone" },
                { value: "first bank", label: "First Bank" },
                { value: "wema", label: "Wema" },
              ]}
            />

            <NumberInput
              size="sm"
              mt="sm"
              hideControls
              label="Account number"
            />

            <TextInput
              size="md"
              mt="sm"
              label="Account name"
              placeholder="Enter BVN"
            />

            <div className="title with-mt">Card details</div>
            <div className="acc-title">
              Add your school’s primary bank account details
            </div>

            <NumberInput
              size="sm"
              mt={24}
              hideControls
              label="Card number"
              placeholder="0000 0000 0000 0000"
            />

            <div className="card-details-inputs">
              <NumberInput
                size="sm"
                mt="sm"
                hideControls
                label="Exp date name"
                placeholder="MM /  YY"
              />

              <NumberInput
                size="sm"
                mt="sm"
                hideControls
                label="Account name"
                placeholder="Security code"
              />
            </div>

            <Group mt={16} position="right">
              <Button
                mt="md"
                color="dark"
                onClick={() => {
                  close();
                  openSuccessModal(true);
                }}
              >
                Save
              </Button>
            </Group>
          </form>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default SetupWallet;
