import React from "react";
import { Button, Table } from "@mantine/core";
import TransactionDetails from "./TransactionDetails";

const tableData = [
  {
    transaction_id: "DOZ123456778",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Success",
  },
  {
    transaction_id: "DOZ123456777",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Success",
  },
  {
    transaction_id: "DOZ123456776",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Pending",
  },
  {
    transaction_id: "DOZ123456775",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Failed",
  },
  {
    transaction_id: "DOZ123456774",
    date: "June 13, 2023",
    transaction_type: "Transfer",
    amount: "25,000",
    status: "Failed",
  },
];

const Transactions = () => {
  const [openDetails, setOpenDetails] = React.useState<boolean>(false);
  return (
    <>
      <TransactionDetails
        callback={() => {}}
        close={() => setOpenDetails(false)}
        drawerOpen={openDetails}
      />
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
            {tableData.map((data, index) => (
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
    </>
  );
};

export default Transactions;
