import React from "react";
import {
  Drawer,
  Text,
  ScrollArea,
  Select,
  TextInput,
  Group,
  Button,
  Divider,
} from "@mantine/core";

interface SetupBusProps {
  drawerOpen: boolean;
  close: () => void;
  openSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
}

const SetupBus = ({
  callback,
  close,
  drawerOpen,
  openSuccessModal,
}: SetupBusProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="wallet-drawer"
      title={<Text className="title">Add your school vehicle details</Text>}
    >
      {drawerOpen && (
        <ScrollArea className="drawer-scroll-container" type="auto">
          <Divider />
          <div className="acc-title">
            Add details of your school vehicles to help us monitor and track the
            vehicle movement
          </div>

          <form className="wallet-form">
            <TextInput
              size="md"
              label="Vehicle name"
              placeholder="Toyota hiace"
            />

            <Select
              size="sm"
              mt="sm"
              label="Vehicle type"
              placeholder="Select vehicle type"
              data={[
                { value: "bus", label: "Bus" },
                { value: "car", label: "Car" },
                { value: "mini van", label: "Mini van" },
                { value: "coaster bus", label: "Coaster bus" },
              ]}
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
            />

            <TextInput
              size="md"
              mt="sm"
              label="Plate number"
              placeholder="Enter vehicle plate number"
            />

            <TextInput
              size="md"
              mt="sm"
              label="Vehicle color"
              placeholder="Enter color"
            />

            <TextInput
              size="md"
              mt="sm"
              label="School Driver’s name"
              placeholder="Enter name"
            />

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

export default SetupBus;
