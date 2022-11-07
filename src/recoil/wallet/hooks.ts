import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import {
  writeAddress,
  writeBalance,
} from '@recoil/wallet';

export const useWalletRecoil = () => {
  const [address, setAddress] = useRecoilState(writeAddress);
  const [balance, setBalance] = useRecoilState(writeBalance);

  useEffect(() => {
    if (window.localStorage.getItem('address')) {
      setAddress(window.localStorage.getItem('address'));
    }
  }, []);
  
  useEffect(() => {
    if (window.ethereum && address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getBalance(address).then((balance) => {
        setBalance(balance.toString());
      });

      window.ethereum.on('accountsChanged', () => {
        setAddress(null);
        window.localStorage.removeItem('address');
        setBalance(null);
      });
    }
  }, [address])
}