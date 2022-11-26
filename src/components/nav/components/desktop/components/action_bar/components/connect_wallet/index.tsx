import React from 'react';
import { useRecoilValue } from 'recoil';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@material-ui/core';
import { atomState } from '@recoil/wallet';
import { useWallet } from './hooks';

const ConnectWallet: React.FC<{
  className?: string
}> = (props) => {
  const { t } = useTranslation('common');
  const { address } = useRecoilValue(atomState);
  const {
    connectWallet, disconnectWallet,
  } = useWallet();

  return (
    <div className={classnames(props.className)}>
      {address == null ? (
        <Button
          variant="outlined"
          disabled={!!address}
          onClick={() => connectWallet()}
        >
          {
            (
              address
              && `${address.slice(0, 6)}...${address.slice(address.length - 6)}`
            ) || t('connectWallet')
          }
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            disconnectWallet();
            window.location.reload();
          }}
        >
          {`${address.slice(0, 6)}...${address.slice(address.length - 6)}`}
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
