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
import { useForm, formList } from "@mantine/form";
import { useEffect, useState } from "react";
import { randomId } from "@mantine/hooks";
import { createBill } from "../../services/bills/bills";
import useNotification from "../../hooks/useNotification";
import { showNotification } from "@mantine/notifications";
import useClass from "../../hooks/useClass";
import { ClassroomType } from "../../types/classTypes";
import moment from "moment";
import { BillsType } from "../../types/bills";

interface CreateBillProps {
  drawerOpen: boolean;
  close: () => void;
  openSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
  edit: BillsType | null;
}

const CreateBill = ({
  callback,
  close,
  drawerOpen,
  openSuccessModal,
  edit
}: CreateBillProps) => {
  const [, setLoading] = useState<boolean>(false);

  const [page] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const [classes, setClasses] = useState<ClassroomType[]>([]);
  const [search] = useState<string>("");
  const [level] = useState<string>("");
  const { handleError } = useNotification();
  const { getClassList } = useClass();

  const form = useForm({
    initialValues: {
      classroom_id: edit ? edit.classroom.classroom_id : "",
      title: edit ? edit.title : "",
      description: edit ? edit.description : "",
      number_of_installments: edit ? edit.number_of_installments.toString() : "",
      deadline_date: edit ? moment(edit.deadline_date).format("YYYY-MM-DD"): "",
      tickets: formList([{ title: "", amount: "", key: randomId() }]),
    },
  });


  const submit = (values: typeof form.values) => {
    setLoading(true);

    createBill(page, perPage, values)
      .then(() => {
        showNotification({
          title: "Success",
          message: "Success",
          color: "grape",
        });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getClassList(page, perPage, level, search)
      .then((res: any) => {
        setClasses(res);
      })
      .catch((error) => {
        handleError(error);
      });
    //eslint-disable-next-line
  }, []);


  const TicketFields = form.values.tickets.map((item, index) => (
    <div key={item.key}>
      <TextInput
        size="sm"
        mt="sm"
        label="Title"
        placeholder="Typer here..."
        required
        {...form.getListInputProps("tickets", index, "title")}
      />

      <NumberInput
        hideControls
        size="sm"
        mt="sm"
        label="Amount"
        placeholder="Typer here..."
        required
        {...form.getListInputProps("tickets", index, "amount")}
      />
    </div>
  ));

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

          <form
            className="wallet-form"
            onSubmit={form.onSubmit((values) => {
              close();
              submit({...values, deadline_date: moment(values.deadline_date).format("YYYY-MM-DD")});
            })}
          >
            <Select
              label="Class"
              placeholder="Select class"
              data={classes.map((item) => ({
                key: item.classroom_id,
                label: item.name,
                value: item.classroom_id,
              }))}
              required
              {...form.getInputProps("classroom_id")}
            />

            <TextInput
              size="sm"
              mt="sm"
              label="Title"
              placeholder="Type here..."
              required
              {...form.getInputProps("title")}
            />

            <Select
              size="sm"
              mt="sm"
              label="Instalment payments"
              placeholder="Select here..."
              data={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ]}
              required
              {...form.getInputProps("number_of_installments")}
            />

            <TextInput
              size="md"
              mt="sm"
              label="Payment description"
              placeholder="Enter description"
              required
              {...form.getInputProps("description")}
            />

            <DatePicker
              mt="sm"
              placeholder="Select deadline"
              label="Add payment deadline"
              required
              {...form.getInputProps("deadline_date")}
            />

            {TicketFields}

            <Group position="right" mt="md">
              <Button
                onClick={() =>
                  form.addListItem("tickets", {
                    title: "",
                    amount: "",
                    key: randomId(),
                  })
                }
              >
                Add employee
              </Button>
            </Group>

            <Group position="right" mt={24}>
              <Button variant="default">Cancel</Button>

              <Button color="dark" type="submit">
                Create Bill
              </Button>
            </Group>
          </form>
        </ScrollArea>
      )}
    </Drawer>
  );
};

export default CreateBill;
