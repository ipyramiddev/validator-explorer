import {
  useState, useEffect,
} from 'react';
import { ethers } from 'ethers';
import { generalConfig } from '@src/configs';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useWallet = () => {
  const [address, setAddress] = useState<string>(null);

  useEffect(() => {
    if (window.localStorage.getItem('address')) {
      setAddress(window.localStorage.getItem('address'));
    }
  }, []);

  const handleConnectWallet = async () => {
    if (window.ethereum === undefined) {
      alert('Please Install Metamask.');
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const walletAddress = await provider.send('eth_requestAccounts', [0]);
      if (walletAddress) {
        setAddress(walletAddress.toString());
        window.localStorage.setItem('address', walletAddress);

        // Add Cascadia chain if not exist.
        const chainConfig = generalConfig.chain;

        await provider.send('wallet_addEthereumChain', [{
          chainId: `0x${chainConfig.CHAINID?.toString(16)}`,
          chainName: chainConfig.NAME,
          nativeCurrency: {
            name: chainConfig.NAME,
            symbol: chainConfig.TOKEN,
            decimals: 18,
          },
          rpcUrls: [chainConfig.RPC],
          blockExplorerUrls: chainConfig.EXPLORER ? [chainConfig.EXPLORER] : null,
        }]);
      }
    }
  };

  return {
    address,
    handleConnectWallet,
  };
};
