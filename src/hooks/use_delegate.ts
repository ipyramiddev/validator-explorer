import  {
  createTxMsgDelegate,
} from "@tharsis/transactions";
import {
  getSenderObj,
  signAndBroadcastTxMsg,
} from '@utils/sign_and_broadcast_tx_msg';
import { useRecoilState } from 'recoil';
import { ethers } from 'ethers';
import { writeBalance } from '@recoil/wallet';

export const useDelegate = (validator: string, chainConfig: any) => {
  const [balance, setBalance] = useRecoilState(writeBalance);
  
  const delegateFee = {
    amount: '80000000000000000',
    denom: chainConfig.DENOM,
    gas: '300000'
  }

  const chain = {
    chainId: chainConfig.CHAINID,
    cosmosChainId: chainConfig.NAME
  };

  const requestDelegate = async (address: string, amount: string) => {
    const senderObj: any = await getSenderObj(address, chainConfig.REST_RPC);

    const params = {
      validatorAddress: validator, 
      amount,
      denom: chainConfig.DENOM,
    }; 

    // Create message to delegate
    const msg = createTxMsgDelegate(chain, senderObj, delegateFee, '', params);

    const res = await signAndBroadcastTxMsg(
      msg,
      senderObj,
      chain,
      chainConfig.REST_RPC,
      address
    );

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // provider.getBalance(address).then((balance) => {
    //   setBalance(balance.toString());
    // });
  } 
  
  return {
    requestDelegate,
  };
};