import { useEffect } from 'react';
import { useRecoilState, useRecoilCallback } from 'recoil';
import { atomState } from '@recoil/wallet';
import { AtomState } from '@recoil/wallet/types';

export const useWalletRecoil = () => {
  const [wallet, setWallet] = useRecoilState(atomState);

  useEffect(() => {
    if (window.localStorage.getItem('address')) {
      const wallet: AtomState = {
        address: window.localStorage.getItem('address')
      };
      setWallet(wallet);
    }
  }, []);
}