import {
  Button,
  Drawer,
  Group,
  Divider,
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

const VehicleDetails = ({
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
          <Divider mb="24" />

          <div className="acc-title">
            Add details of your school vehicles to help us monitor and track the
            vehicle movement
          </div>

          <form className="wallet-form">
            <TextInput
              size="md"
              label="Vehicle name"
              placeholder="Enter name"
              defaultValue={"Toyota Sienna "}
            />

            <Select
              size="sm"
              mt="sm"
              label="Vehicle type"
              placeholder="Select vehicle type"
              data={[
                { value: "mini van", label: "Mini van" },
                { value: "coaster", label: "Coaster" },
                { value: "car", label: "Car" },
                { value: "coaster bus", label: "Coaster bus" },
              ]}
              defaultValue={"mini van"}
            />

            <Select
              size="sm"
              mt="sm"
              label="Vehicle type"
              placeholder="Select vehicle type"
              data={[
                { value: "2001", label: "2001" },
                { value: "2002", label: "2002" },
                { value: "2003", label: "2003" },
                { value: "2004", label: "2004" },
              ]}
              defaultValue={"2001"}
            />

            <TextInput
              size="md"
              mt="sm"
              label="Plate number"
              placeholder="Enter vehicle plate number"
              defaultValue={"ABJ-12345"}
            />

            <TextInput
              size="md"
              mt="sm"
              label="Vehicle color"
              placeholder="Enter color"
              defaultValue={"Blue"}
            />

            <TextInput
              size="md"
              mt="sm"
              label="School Driver’s name"
              placeholder="Enter name"
              defaultValue={"Mr Bode James"}
            />

            <Group mt={16} position="right" pb={24}>
              <Button
                mt="md"
              
                variant="default"
                onClick={() => {
                  close();
                  openSuccessModal(true);
                }}
              >
                Cancel
              </Button>
              <Button
                mt="md"
                color="dark"
                onClick={() => {
                  close();
                  openSuccessModal(true);
                }}
              >
                Update Information
              </Button>
            </Group>
          </form>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default VehicleDetails;
