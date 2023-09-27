import {
  Avatar,
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
}

const StudentDetails = ({
  drawerOpen,
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
        <ScrollArea
          className="drawer-scroll-container"
          type="auto"
          sx={{ minHeight: "80vh" }}
        >
          <Divider />

          <Group mt={32} position="center">
            <Avatar size="xl" radius="xl">
              MA
            </Avatar>
          </Group>
          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Full name
            </Text>
            <Text size="sm">Tonia James</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Date of birth
            </Text>
            <Text size="sm">June 14, 2021</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Age
            </Text>
            <Text size="sm">22</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Blood group
            </Text>
            <Text size="sm">O+</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              BGenotype
            </Text>
            <Text size="sm">AA</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Guardian
            </Text>
            <Text size="sm">Mr kola</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Guardian phone
            </Text>
            <Text size="sm">234 8107898765</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Guardian email
            </Text>
            <Text size="sm">kola@gmail.com</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Disability
            </Text>
            <Text size="sm">Nil</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Height
            </Text>
            <Text size="sm">180.00 cm</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Weight
            </Text>
            <Text size="sm">80 kg</Text>
          </Group>

          <Group mt={24} position="right">
            <Button size="md" color="dark" onClick={close}>
              Close
            </Button>
          </Group>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default StudentDetails;
