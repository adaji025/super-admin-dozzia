import React, { useEffect, useState } from "react";
import { Button, LoadingOverlay, Table } from "@mantine/core";
import { AxiosError } from "axios";
import TransactionDetails from "./TransactionDetails";
import EmptyState from "../../components/EmptyState/EmptyState";
import { getTransactions } from "../../services/wallet/transactions";
import { ApiResponseType } from "../../types/utilityTypes";
import useNotification from "../../hooks/useNotification";

interface TransactionsProps {
  billId?: string;
}

const Transactions = ({ billId }: TransactionsProps) => {
  const [openDetails, setOpenDetails] = React.useState<boolean>(false);
  const [transactions] = React.useState<any[]>([]);
  const [page] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetTransactions();
    //eslint-disable-next-line
  }, []);

  const handleGetTransactions = () => {
    setLoading(true);

    getTransactions(page, perPage)
      .then((res: ApiResponseType<any[]>) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative">
      <LoadingOverlay visible={loading} />

      <TransactionDetails
        callback={() => {}}
        close={() => setOpenDetails(false)}
        drawerOpen={openDetails}
      />

      {transactions.length === 0 && <EmptyState />}

      {transactions.length > 0 && (
        <div className="table-container">
          <Table horizontalSpacing="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((data, index) => (
                <tr className="" key={index}>
                  <td className="start">{data.transaction_id}</td>
                  <td>{data.date}</td>
                  <td>{data.transaction_type}</td>
                  <td>NGN {data.amount}</td>
                  <td>
                    <div
                      className={`status ${
                        data.status === "Success"
                          ? "success"
                          : data.status === "Pending"
                          ? "pending"
                          : "failed"
                      }`}
                    >
                      {data.status}
                    </div>
                  </td>
                  <td className="end">
                    <Button
                      variant="default"
                      size="xs"
                      onClick={() => setOpenDetails(true)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
