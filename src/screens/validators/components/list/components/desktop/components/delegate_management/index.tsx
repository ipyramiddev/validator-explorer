import React, { useEffect } from 'react';
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
import { readAddress, readBalance } from '@recoil/wallet';
import { useDelegateManagement } from './hooks';
import { useStyles } from './styles';

const DelegateManagement: React.FC<{
  className?: string;
  validator: string;
}> = (props) => {
  const { t } = useTranslation('validators');
  const address = useRecoilValue(readAddress);
  const balance = useRecoilValue(readBalance);

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
  } = useDelegateManagement(props.validator);
  const classes = useStyles();

  return (
    <div>
      <Button
        disabled={!address}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        {t('manage')}
      </Button>
      <Dialog
        className={classnames(classes.root)}        
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >
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
              {`${t("myDelegation")}:`}
            </Typography>
            <Typography className="value">
              {`${
                balance && parseInt(balance) > 0?
                (parseInt(balance) / Math.pow(10, 18)).toPrecision(4)
                :0} CASCADIA`}
            </Typography>
          </div>
          {status !== null && (
            <>
              <div className={classnames(classes.listItem)}>
                <Typography className="label">
                  {`${t("availableBalance")}:`}
                </Typography>
                <Typography className="value">
                  0 CASCADIA
                </Typography>
              </div>
              <div className={classnames(classes.formItem)}>
                <Typography className="form-label">
                  {`${t("amount")} to ${status}:`}
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
          {
            status === 'delegate' ? (
              <>
                <Button onClick={() => handleChangeStatus(null)}
                >
                  Back
                </Button>
                <Button color="primary"
                  disabled={!amount}
                  onClick={() => handleDelegate(address)}
                >
                  Delegate
                </Button>
              </>
            ) : status === 'undelegate' ? (
              <>
                <Button onClick={() => handleChangeStatus(null)}
                >
                  Back
                </Button>
                <Button color="secondary"
                  onClick={() => handleUndelegate()}
                >
                  Undelegate
                </Button>
              </>
            ) : (
              <>
                <Button color="secondary"
                  onClick={() => handleChangeStatus('undelegate')}          
                >
                  Undelegate
                </Button>
                <Button color="primary"
                  disabled={!(balance && parseInt(balance) > 0)}
                  onClick={() => handleChangeStatus('delegate')}
                >
                  Delegate
                </Button>
              </>
            )
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DelegateManagement;