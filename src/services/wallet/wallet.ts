import { AxiosError } from "axios";
import AxoisApi from "../../api";
import { APIS } from "../../api/api";
import { WalletType } from "../../types/walletTypes";

export const getWallet = () => {
  return new Promise<WalletType>((resolve, reject) => {
    AxoisApi.get(APIS.WALLET.WALLET)
      .then(
        (res: {
          data: {
            data: WalletType;
          };
        }) => {
          resolve(res.data.data);
        }
      )
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};
