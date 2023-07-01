import {
  Button,
  Divider,
  Drawer,
  Group,
  NumberInput,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

interface CreateBillProps {
  drawerOpen: boolean;
  close: () => void;
  openSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
}

const CreateBill = ({
  callback,
  close,
  drawerOpen,
  openSuccessModal,
}: CreateBillProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="wallet-drawer"
      title={<Text className="title">Create Bill</Text>}
    >
      {drawerOpen && (
        <ScrollArea className="drawer-scroll-container" type="auto">
          <Divider />

          <form className="wallet-form">
            <TextInput
              label="Payment Type"
              placeholder="i.e school fees, excursion, summer lesson"
            />

            <Select
              size="sm"
              mt="sm"
              label="Add payment parties"
              placeholder="Payment type"
              data={[
                { value: "Jss 1 parents", label: "Jss 1 parents" },
                { value: "Jss 2 parents", label: "Jss 2 parents" },
                { value: "Jss 3 parents", label: "Jss 3 parents" },
              ]}
            />

            <NumberInput
              size="sm"
              mt="sm"
              hideControls
              label="Amount"
              placeholder="Enter amount"
            />

            <Select
              size="sm"
              mt="sm"
              label="Instalment payments"
              placeholder="Payment type"
              data={[
                { value: "es", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />

            <DatePicker
              mt="sm"
              placeholder="Select deadline"
              label="Add payment deadline"
            />

            <TextInput
              size="md"
              mt="sm"
              label="Payment description"
              placeholder="Enter description"
            />
            <Group position="right" mt={24}>
              <Button variant="default">Cancel</Button>

              <Button color="dark">Create Bill</Button>
            </Group>
          </form>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default CreateBill;
