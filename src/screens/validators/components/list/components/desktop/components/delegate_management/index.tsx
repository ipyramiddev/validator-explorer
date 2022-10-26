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
import { useDelegateManagement } from './hooks';
import { useStyles } from './styles';

const DelegateManagement: React.FC<{
  className?: string;
  validator: string
}> = (props) => {
  const { t } = useTranslation('validators');
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
              0 CASCADIA
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
                  onClick={() => handleDelegate()}
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