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
    await requestDelegate(address, (amount * (10 ** 18)).toString());
    setOpen(false);
  };

  const handleUndelegate = () => {
    alert(`Undelegated: ${validatorAddr}, Amount: ${amount}`);
  };

  const handleRedelegate = () => {
    alert(`Redelegated: ${validatorAddr}, Amount: ${amount}`);
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
