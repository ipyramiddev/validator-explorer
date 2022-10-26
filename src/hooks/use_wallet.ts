import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
};

export const useWallet = () => {
  const [address, setAddress] = useState<string>(null)

  useEffect(() => {
    if (window.localStorage.getItem('address')) {
      setAddress(window.localStorage.getItem('address'));
    }
  }, []);

  const handleConnectWallet = async (e: any) => {
    if (window.ethereum === undefined) {
      alert('Please Install Metamask.');
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const addresses = await provider.send('eth_requestAccounts', []);
      if (addresses.length > 0) {
        setAddress(addresses[0]);
        window.localStorage.setItem('address', addresses[0]);
      }
    }
  };

  return {
    address,
    handleConnectWallet,
  };
};