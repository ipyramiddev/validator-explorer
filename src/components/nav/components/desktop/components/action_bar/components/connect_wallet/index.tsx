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
  const { connectWallet } = useWallet();

  return (
    <div className={classnames(props.className)}>
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
    </div>
  );
};

export default ConnectWallet;
