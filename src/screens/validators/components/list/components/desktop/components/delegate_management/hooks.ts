import {
  useState,
} from 'react';
import { useDelegate } from '@hooks';
import { generalConfig } from '@src/configs';

type TStatus = 'delegate' | 'undelegate' | 'redelegate' | 'claimReward' | null;

export const useDelegateManagement = (validatorAddr: string) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>(null);
  const [amount, setAmount] = useState<number>(0);
  const {
    requestDelegate,
    requestUndelegate,
    requestRedelegate,
    requestDelegationInfo,
    requestRewardInfo,
    requestClaimReward,
  } = useDelegate(validatorAddr, generalConfig.chain);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatus = (st: TStatus) => {
    setStatus(st);
    if (st === null) setAmount(0);
  };

  const handleChangeAmount = (e: any) => {
    const value = e?.target?.value || 0;
    setAmount(parseFloat(value));
  };

  const handleDelegate = async (address: string) => {
    if (!amount) return;
    await requestDelegate(address, (amount * (10 ** 18))
      .toString());
    setOpen(false);
  };

  const handleUndelegate = async (address: string) => {
    if (!amount) return;
    await requestUndelegate(address, (amount * (10 ** 18)).toString());
    setOpen(false);
  };

  const handleRedelegate = async (address: string, sourceAddr: string, destAddr: string) => {
    if (!destAddr) {
      alert('Please set destination validator to redelegate.');
      return;
    }
    if (!amount) {
      alert('Please set amount to redelegate.');
      return;
    }
    await requestRedelegate(
      address,
      (amount * (10 ** 18)).toString(),
      sourceAddr,
      destAddr,
    );
    setOpen(false);
  };

  const handleClaimReward = async (address:string, valiAddr:string) => {
    await requestClaimReward(address, valiAddr);
  };

  const getDelegationInfo = async (address: string, valiAddr: string) => {
    const res = await requestDelegationInfo(address, generalConfig.chain.REST_RPC, valiAddr);
    return res;
  };

  const getRewardInfo = async (address: string, valiAddr: string) => {
    const res = await requestRewardInfo(address, generalConfig.chain.REST_RPC, valiAddr);
    return res;
  };

  return {
    open,
    status,
    amount,
    handleOpen,
    handleClose,
    handleChangeStatus,
    handleChangeAmount,
    handleDelegate,
    handleUndelegate,
    handleRedelegate,
    handleClaimReward,
    getDelegationInfo,
    getRewardInfo,
  };
};
