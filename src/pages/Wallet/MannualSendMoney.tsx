import { NumberInput, Select, TextInput, Button, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

type MannualSendMoneyProps = {
  goBack: () => void;
};

const MannualSendMoney = ({ goBack }: MannualSendMoneyProps) => {
  return (
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
        placeholder="Enter destination account"
      />

      <TextInput size="sm" mt="sm" label="Account name" />

      <NumberInput
        size="sm"
        mt="sm"
        hideControls
        label="Amount"
        placeholder="Enter Amount"
      />

      <TextInput
        size="sm"
        mt="sm"
        label="Narration"
        placeholder="Enter narration"
      />

      <DatePicker mt="sm" placeholder="Select time" label="Schedule payment" />

      <Group mt={24} position="right">
        <Button variant="default" onClick={goBack}>
          Go back
        </Button>

        <Button color="dark">Send Money</Button>
      </Group>
    </form>
  );
};

export default MannualSendMoney;
