import { useState } from 'react';

type TStatus = 'delegate' | 'undelegate' | null;

export const useDelegateManagement = (address: string) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>(null);
  const [amount, setAmount] = useState<number>(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatus= (st: TStatus) => {
    setStatus(st);
    if (st === null) setAmount(0);
  }

  const handleChangeAmount = (e: any) => {
    const value = e?.target?.value || 0;
    setAmount(parseFloat(value));
  }

  const handleDelegate = () => {
    alert(`Delegated: ${address}, Amount: ${amount}`);
  }

  const handleUndelegate = () => {
    alert(`Undelegated: ${address}, Amount: ${amount}`);
  }

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
  }
}