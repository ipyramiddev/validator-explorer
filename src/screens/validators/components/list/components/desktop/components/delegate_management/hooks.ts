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
    const res = await requestDelegate(address, (amount * (10 ** 18)).
      toString());
    console.log(res);
    setOpen(false);
  };

  const handleUndelegate = async (address: string) => {
    if (!amount) return;
    const res = await requestUndelegate(address, (amount * (10 ** 18)).toString());
    console.log(res);
    setOpen(false);
  };

  const handleRedelegate = async (address: string, sourceAddr: string, destAddr: string) => {
    // alert(`Redelegated: ${sourceAddr} to ${destAddr}, Amount: ${amount}, address: ${address}`);
    if (!destAddr) {
      alert('Please set destination validator to redelegate.');
      return;
    }
    if (!amount) {
      alert('Please set amount to redelegate.');
      return;
    }
    const res = await requestRedelegate(address, (amount * (10 ** 18)).toString(), sourceAddr, destAddr);
    console.log(res);
    setOpen(false);
  };

  const handleClaimReward = () => {
    alert(`Claimed: ${validatorAddr}, Amount: ${amount}`);
  };

  const getDelegationInfo = async (address: string, validatorAddr: string) => {
    return await requestDelegationInfo(address, generalConfig.chain.REST_RPC, validatorAddr);
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
  };
};
