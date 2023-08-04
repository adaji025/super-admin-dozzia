import {
  Button,
  Drawer,
  Group,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { Trash, ChevronLeft } from "tabler-icons-react";

interface AddStudentProps {
  drawerOpen: boolean;
  close: () => void;
  callback: () => void;
}

const AddStudentToBus = ({ drawerOpen, callback, close }: AddStudentProps) => {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={close}
      padding="lg"
      position="right"
      size={600}
      className="wallet-drawer"
      title={<Text className="title">Toyota Sienna Blue</Text>}
    >
      {drawerOpen && (
        <ScrollArea className="drawer-scroll-container" type="auto">
          <Group spacing="xs">
            <ChevronLeft
              size={24}
              strokeWidth={2}
              color={"black"}
              className="cursor-pointer"
              onClick={close}
            />
            <Text size="lg" weight={600}>
              Add Student
            </Text>
          </Group>
          <div className="a-s-header">
            <div className="a-s-header-group">
              <TextInput label="Registration number *" size="md" />
              <Text>Student Name</Text>
              <div className="trash">
                <Trash size={24} strokeWidth={2} color={"red"} />
              </div>
            </div>
          </div>

          <Group mt={42}>
            <Button color="dark" onClick={close}>
              Close
            </Button>
            <Button color="dark" variant="outline">
              Add another field
            </Button>
          </Group>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default AddStudentToBus;
