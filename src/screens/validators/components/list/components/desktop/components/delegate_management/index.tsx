import React from 'react';
import classnames from 'classnames';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  DialogActions,
  InputBase,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';
import {
  readAddress, readBalance,
} from '@recoil/wallet';
import { useDelegateManagement } from './hooks';
import { useStyles } from './styles';
import { useState } from 'react';

const DelegateManagement: React.FC<{
  className?: string;
  validator: string;
}> = (props) => {
  const { t } = useTranslation('validators');
  const address = useRecoilValue(readAddress);
  const balance = useRecoilValue(readBalance);
  const [delegationAmount, setDelegationAmount] = useState<string>('');

  const {
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
  } = useDelegateManagement(props.validator);

  const handleDelegationAmount = (address: string, validatorAddr: string) => {

    getDelegationInfo(address, validatorAddr).then((res) => {
      setDelegationAmount(res.balance.amount);
    })

  }
  const classes = useStyles();

  let button: JSX.Element;
  if (status === 'delegate') {
    button = (
      <>
        <Button
          onClick={() => handleChangeStatus(null)}
        >
          Back
        </Button>
        <Button
          color="primary"
          disabled={!amount}
          onClick={() => handleDelegate(address)}
        >
          Delegate
        </Button>
      </>
    );
  } else if (status === 'undelegate') {
    button = (
      <>
        <Button
          onClick={() => handleChangeStatus(null)}
        >
          Back
        </Button>
        <Button
          color="secondary"
          onClick={() => handleUndelegate(address)}
        >
          Undelegate
        </Button>
      </>
    );
  } else if (status === 'redelegate') {
    button = (
      <>
        <Button
          onClick={() => handleChangeStatus(null)}
        >
          Back
        </Button>
        <Button
          onClick={() => handleRedelegate()}
          className={classnames(classes.redelegateButton)}
        >
          Redelegate
        </Button>
      </>
    );
  } else if (status === 'claimReward') {
    button = (
      <>
        <Button
          onClick={() => handleChangeStatus(null)}
        >
          Back
        </Button>
        <Button
          onClick={() => handleClaimReward()}
          className={classnames(classes.claimButton)}
        >
          Claim Reward
        </Button>
      </>
    );
  } else {
    button = (
      <>
        <div className={classnames(classes.buttonGroup)}>
          <Button
            color="primary"
            disabled={!(balance && parseInt(balance, 10) > 0)}
            onClick={() => handleChangeStatus('delegate')}
          >
            Delegate
          </Button>
          <Button
            onClick={() => handleChangeStatus('redelegate')}
            className={classnames(classes.redelegateButton)}
          >
            Redelegate
          </Button>
          <Button
            color="secondary"
            onClick={() => handleChangeStatus('undelegate')}
          >
            Undelegate
          </Button>
          <Button
            onClick={() => handleChangeStatus('claimReward')}
            className={classnames(classes.claimButton)}
          >
            Claim Reward
          </Button>
        </div>
      </>
    );
  }
  return (
    <div>
      <Button
        disabled={!address}
        variant="contained"
        color="primary"
        onClick={() => {
          handleOpen();
          handleDelegationAmount(address, props.validator);
        }}
      >
        {t('manage')}
      </Button>
      <Dialog
        className={classnames(classes.root)}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography variant="h2">
            {t('delegate')}
          </Typography>
          <IconButton aria-label="close" className={classes.closeIcon} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className={classnames(classes.listItem)}>
            <Typography className="label">
              {`${t('availableBalance')}:`}
            </Typography>
            <Typography className="value">
              {`${balance && parseInt(balance, 10) > 0
                ? (parseInt(balance, 10) / (10 ** 18)).toPrecision(4)
                : 0} CASCADIA`}
            </Typography>
          </div>
          {status !== null && (
            <>
              <div className={classnames(classes.listItem)}>
                <Typography className="label">
                  {`${t('myDelegation')}:`}
                </Typography>
                <Typography className="value">
                  {`${delegationAmount && parseInt(delegationAmount, 10) > 0
                    ? (parseInt(delegationAmount, 10) / (10 ** 18)).toPrecision(4)
                    : 0} CASCADIA`}
                </Typography>
              </div>
              <div className={classnames(classes.formItem)}>
                <Typography className="form-label">
                  {`${t('amount')} to ${status}:`}
                </Typography>
                <InputBase
                  className="form-control"
                  value={amount}
                  onChange={handleChangeAmount}
                  endAdornment={(
                    <Typography>CASCADIA</Typography>
                  )}
                />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {button}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DelegateManagement;
