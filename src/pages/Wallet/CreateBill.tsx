import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Group,
  LoadingOverlay,
  NumberInput,
  ScrollArea,
  Select,
  MultiSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { AxiosError } from "axios";
import moment from "moment";
import { DatePicker } from "@mantine/dates";
import { useForm, formList } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { createBill } from "../../services/wallet/bills";
import useNotification from "../../hooks/useNotification";
import { showNotification } from "@mantine/notifications";
import useClass from "../../hooks/useClass";
import { ClassroomType } from "../../types/classTypes";
import { BillType } from "../../types/billsTypes";

interface CreateBillProps {
  drawerOpen: boolean;
  close: () => void;
  callback: () => void;
  bill: BillType | null;
}

const CreateBill = ({ callback, close, drawerOpen, bill }: CreateBillProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<ClassroomType[]>([]);
  const { handleError } = useNotification();
  const { getClassList } = useClass();

  const form = useForm({
    initialValues: {
      classroom_id: [],
      title: "",
      description: "",
      number_of_installments: "",
      deadline_date: "",
      tickets: formList([{ title: "", amount: "", key: randomId() }]),
    },
  });

  useEffect(() => {
    getClasses();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bill) {
      form.setFieldValue("title", bill.title);
      form.setFieldValue("description", bill.description);
      form.setFieldValue(
        "number_of_installments",
        `${bill.number_of_installments}`
      );
      form.setFieldValue(
        "deadline_date",
        moment(bill.deadline_date).toDate() as any as string
      );
    }

    if (!drawerOpen) {
      form.reset();
    }
    //eslint-disable-next-line
  }, [drawerOpen]);

  const getClasses = () => {
    getClassList(1, 40, "", "")
      .then((res) => {
        setClasses(res);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const submit = (values: typeof form.values) => {
    setLoading(true);

    createBill({
      ...values,
      deadline_date: moment(values.deadline_date).format("YYYY-MM-DD"),
    })
      .then(() => {
        showNotification({
          title: "Success",
          message: "Bill created successfully",
          color: "green",
        });
        form.reset();
        callback();
        close();
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TicketFields = form.values.tickets.map((item, index) => (
    <Group key={item.key} grow mt="sm">
      <TextInput
        size="sm"
        label="Name"
        placeholder="Input name"
        required
        {...form.getListInputProps("tickets", index, "title")}
      />

      <NumberInput
        hideControls
        size="sm"
        label="Amount"
        placeholder="Input amount"
        required
        {...form.getListInputProps("tickets", index, "amount")}
      />
    </Group>
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
      <LoadingOverlay visible={loading} />

      {drawerOpen && (
        <ScrollArea className="drawer-scroll-container" type="auto">
          <Divider />

          <form
            className="wallet-form"
            onSubmit={form.onSubmit((values) => submit(values))}
          >
            <MultiSelect
              label="Classes"
              placeholder="Select classes"
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
              label="Number of installments"
              placeholder="Select number of installments"
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

            <Divider
              mt={16}
              variant="dashed"
              label="Tickets"
              labelPosition="center"
            />

            {TicketFields}

            <Button
              mt={8}
              variant="light"
              compact
              onClick={() =>
                form.addListItem("tickets", {
                  title: "",
                  amount: "",
                  key: randomId(),
                })
              }
            >
              Add Item
            </Button>

            <Group position="right" mt={24}>
              <Button variant="default" onClick={close}>
                Cancel
              </Button>

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