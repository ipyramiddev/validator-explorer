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
      const walletAddress = await provider.send('eth_requestAccounts', [0]);
      if (walletAddress) {
        setAddress(walletAddress.toString());
        window.localStorage.setItem('address', walletAddress);
      }
    }
  };

  return {
    address,
    handleConnectWallet,
  };
};