import React, { useEffect, useState } from "react";
import { getBill } from "../../services/wallet/bills";
import { useParams } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import { BillType } from "../../types/billsTypes";
import { AxiosError } from "axios";
import { getTransactions } from "../../services/wallet/transactions";
import { ApiResponseType } from "../../types/utilityTypes";

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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return <div className="bill-details data-page-container">dssdjsd</div>;
};

export default BillDetails;
