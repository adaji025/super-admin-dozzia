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

const StafftDetails = ({
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
      title={<Text className="title">Staff Details</Text>}
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
            <Text size="sm">Shola Bade</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Staff role
            </Text>
            <Text size="sm">Jss1 Green</Text>
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
              Email
            </Text>
            <Text size="sm">shola@gmail.com</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
            Years of experience
            </Text>
            <Text size="sm">7</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
            Phone number
            </Text>
            <Text size="sm">07066778899</Text>
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
              Genotype
            </Text>
            <Text size="sm">AA</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Guarantor
            </Text>
            <Text size="sm">Mr kola</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Guarantor's Profession
            </Text>
            <Text size="sm">Software Engineer</Text>
          </Group>

          <Divider variant="dashed" my={16} />

          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Marital Status
            </Text>
            <Text size="sm">Married</Text>
          </Group>

          <Divider variant="dashed" my={16} />
          
          <Group position="apart" className="details">
            <Text weight={500} size="sm">
              Next of knin
            </Text>
            <Text size="sm">Modomawa Toba</Text>
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

export default StafftDetails;
