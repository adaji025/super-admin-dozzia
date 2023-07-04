import {
  Badge,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";

interface TransactionDetailsProps {
  drawerOpen: boolean;
  close: () => void;
  callback: () => void;
}

const TransactionDetails = ({
  drawerOpen,
  callback,
  close,
}: TransactionDetailsProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="transaction-details"
      title={<Text className="title">Transaction Details</Text>}
    >
      {drawerOpen && (
        <ScrollArea className="drawer-scroll-container" type="auto">
          <Divider />
          <div className="details">
            <div className="title">Transaction ID</div>
            <div className="desc">DOZ123456778</div>
          </div>
          <div className="details">
            <div className="title">Amount</div>
            <div className="desc">NGN 25,000</div>
          </div>
          <div className="details">
            <div className="title">Date</div>
            <div className="desc">June 14, 2023</div>
          </div>
          <div className="details">
            <div className="title">Transaction type</div>
            <div className="desc">Transfer</div>
          </div>
          <div className="details">
            <div className="title">Beneficiary</div>
            <div className="desc">Kola Olushola</div>
          </div>
          <div className="details">
            <div className="title">Beneficiary account/bank</div>
            <div className="desc">3002345678 - Firstbank</div>
          </div>
          <div className="details">
            <div className="title">Narration</div>
            <div className="desc">Nil</div>
          </div>
          <div className="details">
            <div className="title">Status</div>

            <Badge color="teal">Successful</Badge>
          </div>
          <Group mt={24} position="right">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>

            <Button color="dark">Download Receipt</Button>
          </Group>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default TransactionDetails;
