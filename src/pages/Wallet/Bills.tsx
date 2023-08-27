import React, { useEffect, useState } from "react";
import { Menu, Table, LoadingOverlay, Pagination } from "@mantine/core";
import { Edit, Trash } from "tabler-icons-react";
import useNotification from "../../hooks/useNotification";
import { deleteBill, getBills } from "../../services/bills/bills";
import { AxiosError } from "axios";
import { BillType, BillsState } from "../../types/billsTypes";
import CreateBill from "./CreateBill";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import { showNotification } from "@mantine/notifications";
import EmptyState from "../../components/EmptyState/EmptyState";
import { setBills } from "../../redux/data/data.actions";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponseType } from "../../types/utilityTypes";

interface BillsProps {
  createBillDrawer: boolean;
  setCreateBillDrawer: (value: boolean) => void;
}

const Bills = ({ createBillDrawer, setCreateBillDrawer }: BillsProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeBill, setActiveBill] = useState<BillType | null>(null);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(100);
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState<boolean>(false);
  const { handleError } = useNotification();
  const bills = useSelector(
    (state: { data: { bills: BillsState } }) => state.data.bills
  );

  useEffect(() => {
    handleGetBills();
    //eslint-disable-next-line
  }, []);

  const handleGetBills = () => {
    if (!bills.dataFetched) setLoading(true);

    getBills(page, perPage)
      .then((res: ApiResponseType<BillType[]>) => {
        dispatch(
          setBills({ data: res.data, meta: res.meta, dataFetched: true })
        );
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteBill = () => {
    if (!activeBill) return;

    setLoading(true);

    deleteBill(activeBill.school_bill_id)
      .then(() => {
        showNotification({
          title: "Success",
          message: "Bill deleted successfully",
          color: "green",
        });
        handleGetBills();
      })
      .catch((error: AxiosError) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative">
      <CreateBill
        callback={handleGetBills}
        close={() => setCreateBillDrawer(false)}
        drawerOpen={createBillDrawer}
        edit={activeBill}
      />

      <Confirmation
        isOpened={confirmDeleteEvent}
        closeModal={() => {
          setConfirmDeleteEvent(false);
        }}
        title="Are you sure you want to delete this bill?"
        confirmText="delete"
        submit={() => {
          setConfirmDeleteEvent(false);
          handleDeleteBill();
        }}
        hasInput={false}
      />

      <LoadingOverlay visible={loading} />

      {bills.data.length === 0 && <EmptyState />}

      {bills.data.length > 0 && (
        <div className="tabs">
          <div className="table-container">
            <Table horizontalSpacing="sm">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Payment Deadline</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bills.data.map((bill: BillType) => (
                  <tr className="click" key={bill.school_bill_id}>
                    <td className="start">{bill.title}</td>
                    <td>{bill.deadline_date}</td>
                    <td className="end">NGN 5666</td>
                    <td>
                      <Menu gutter={15} withArrow size="sm">
                        <Menu.Label>Menu</Menu.Label>

                        <Menu.Item
                          icon={<Edit size={14} />}
                          onClick={() => {
                            setActiveBill(bill);
                            setCreateBillDrawer(true);
                          }}
                        >
                          Update Bill
                        </Menu.Item>

                        <Menu.Item
                          color="red"
                          icon={<Trash size={14} />}
                          onClick={() => {
                            setConfirmDeleteEvent(true);
                            setActiveBill(bill);
                          }}
                        >
                          Delete Bill
                        </Menu.Item>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {bills?.meta && bills?.data.length > 0 && (
              <Pagination
                sx={{ maxWidth: 900 }}
                mt={12}
                onChange={(value) => {
                  if (value !== bills.meta.current_page) {
                    setLoading(true);
                    setPage(value);
                  }
                }}
                initialPage={bills.meta.current_page}
                total={bills.meta.last_page}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
