import React, { ReactElement, useEffect, useState } from "react";
import { getBill } from "../../services/wallet/bills";
import { useParams } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import { BillType } from "../../types/billsTypes";
import { AxiosError } from "axios";
import { getTransactions } from "../../services/wallet/transactions";
import { ApiResponseType } from "../../types/utilityTypes";
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { ReactComponent as ArrowLeft } from "../../assets/svg/arrow-left.svg";
import moment from "moment";

const BillDetails = () => {
  const { billId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<BillType | null>(null);
  const { handleError } = useNotification();
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);

  useEffect(() => {
    getBillDetails();
    handleGetTransactions();
    //eslint-disable-next-line
  }, [billId]);

  const getBillDetails = () => {
    if (!billId) return;

    setLoading(true);

    getBill(billId)
      .then((res: BillType) => {
        console.log(res);

        setBill(res);
      })
      .catch((err: AxiosError) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetTransactions = () => {
    getTransactions(page, perPage)
      .then((res: ApiResponseType<any[]>) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        handleError(err);
      });
  };

  return (
    <div className="bill-details">
      <LoadingOverlay visible={loading} />

      <Group spacing={8} align="center">
        <ArrowLeft className="click" />
        <Text size="lg" weight={500}>
          {bill?.title ?? "Bill Details"}
        </Text>
      </Group>

      <div className="bill-info">
        <DetailItem title="Description" value={bill?.description ?? "N/A"} />

        <DetailItem
          title="Date Created"
          value={moment(bill?.deadline_date).format("YYYY-MM-DD")}
        />

        <DetailItem
          title="Deadline Date"
          value={moment(bill?.deadline_date).format("YYYY-MM-DD")}
        />

        <DetailItem
          title="Created by"
          value={
            `${bill?.created_by_staff.first_name} ${bill?.created_by_staff.last_name}` ??
            "N/A"
          }
        />

        <DetailItem
          title="Number of installments"
          value={bill?.number_of_installments ?? "N/A"}
        />

        <DetailItem
          title="Status"
          value={bill?.status.toUpperCase() ?? "N/A"}
        />

        <DetailItem
          title="Classroom(s)"
          value={
            bill?.classrooms.map((classroom) => classroom.name).join(", ") ?? ""
          }
        />

        <DetailItem
          title="Tickets"
          value={
            <Button variant="default" compact size="sm">
              View Tickets
            </Button>
          }
        />
      </div>
    </div>
  );
};

interface DetailItemProps {
  title: string;
  value: string | number | ReactElement;
}

const DetailItem = ({ title, value }: DetailItemProps) => {
  return (
    <div className="bill-info__item">
      <div className="item-title">{title}</div>
      <div className="item-value">{value}</div>
    </div>
  );
};

export default BillDetails;
