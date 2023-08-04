import {
  Button,
  Drawer,
  Group,
  Divider,
  ScrollArea,
  Text,
  Avatar,
} from "@mantine/core";

interface StudentDetailsProps {
  drawerOpen: boolean;
  close: () => void;
  callback: () => void;
}

const StudentDetails = ({
  drawerOpen,
  callback,
  close,
}: StudentDetailsProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={400}
      className="wallet-drawer"
      title={<Text className="title">Student Details</Text>}
    >
      {drawerOpen && (
        <ScrollArea className="drawer-scroll-container" type="auto">
          <Divider mb="24" />
          <Group mt={24} position="center">
            <Avatar size="xl" radius="xl" src={null} />
          </Group>
          
            <Group my={10} grow>
              <Group position="left"><Text weight={500} size="sm">Full name</Text></Group>
              <Group position="right"><Text size="sm">Tonia James</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text weight={500} size="sm">Class</Text></Group>
              <Group position="right"><Text size="sm">Jss1 Green</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text weight={500} size="sm">Date of birth</Text></Group>
              <Group position="right"><Text size="sm">June 14, 2021</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text weight={500} size="sm">Age</Text></Group>
              <Group position="right"><Text size="sm">22</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text weight={500} size="sm">Blood group</Text></Group>
              <Group position="right"><Text size="sm">0+</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text weight={500} size="sm">Genotype</Text></Group>
              <Group position="right"><Text size="sm">AA</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text size="sm" weight={500}>Guardian</Text></Group>
              <Group position="right"><Text size="sm">Mr kola</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text size="sm" weight={500}>Guardian phone</Text></Group>
              <Group position="right"><Text size="sm">234 8107898765</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text size="sm" weight={500}>Guardian email</Text></Group>
              <Group position="right"><Text size="sm">kola@gmail.com</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text size="sm" weight={500}>Disability</Text></Group>
              <Group position="right"><Text size="sm">Nil</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text size="sm" weight={500}>Height</Text></Group>
              <Group position="right"><Text size="sm">180.00 cm</Text></Group>
            </Group>
            <Divider variant="dashed" />

            <Group my={10} grow>
              <Group position="left"><Text size="sm" weight={500}>Weight</Text></Group>
              <Group position="right"><Text size="sm">80 kg</Text></Group>
            </Group>

          <Group mt={42} position="right">
            <Button color="dark" variant="outline">Remove from vehicle</Button>
            <Button color="dark" onClick={close}>Close</Button>
          </Group>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default StudentDetails;
