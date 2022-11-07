import { useRecoilState } from 'recoil';
import { ethers } from 'ethers';
import { generalConfig } from '@configs';
import { writeAddress } from '@recoil/wallet';

export const useWallet = () => {
  const [_, setAddress] = useRecoilState(writeAddress);
  const connectWallet = async () => {
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
    connectWallet,
  };
};
