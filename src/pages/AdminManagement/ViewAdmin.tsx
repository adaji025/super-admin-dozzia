import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from "@mantine/core";

interface TransactionDetailsProps {
  drawerOpen: boolean;
  close: () => void;
}

const ViewAdmin = ({ drawerOpen, close }: TransactionDetailsProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="transaction-details"
      title={<Text weight={500}>Add Admin</Text>}
    >
      <TextInput label="Full Name" placeholder="Enter full name" />

      <TextInput
        mt={16}
        type="email"
        label="Email Address"
        placeholder="Enter email address"
      />

      <TextInput
        mt={16}
        label="Phone Number"
        placeholder="Enter phone number"
      />

      <Select
        mt={16}
        className="form-item"
        required
        label="School Category"
        placeholder="Choose category"
        data={[
          { value: "super admin", label: "Super admin" },
          { value: "customer support", label: "Customer support" },
          { value: "operations", label: "Operations" },
          { value: "marketing", label: "Marketing" },
          { value: "data analyst", label: "Data analyst" },
          { value: "sales", label: "Sales" },
        ]}
      />

      <Group position="right" mt={24}>
        <Button size="md" variant="outline" color="dark">
          Cancel
        </Button>
        <Button size="md" color="dark">Add Admin</Button>
      </Group>
    </Drawer>
  );
};

export default ViewAdmin;
