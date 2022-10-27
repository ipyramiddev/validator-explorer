import React from 'react';
import { useRecoilValue } from 'recoil';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@material-ui/core';
import { useWallet } from './hooks';
import { atomState } from '@recoil/wallet';


const ConnectWallet: React.FC<{
  className?: string
}> = (props) => {
  const { t } = useTranslation('common');
  const { address } = useRecoilValue(atomState);
  const { connectWallet } = useWallet();

  React.useEffect(() => {
    console.log('address:', address);
  }, [address]);

  return (
    <div className={classnames(props.className)}>
      <Button variant="outlined"
        disabled={!!address}
        onClick={() => connectWallet()}
      >
        {
          (
            address &&
            `${address.slice(0, 6)}...${address.slice(address.length - 6)}`
          ) || t('connectWallet')
        }
      </Button>
    </div>
  );
};

export default ConnectWallet;