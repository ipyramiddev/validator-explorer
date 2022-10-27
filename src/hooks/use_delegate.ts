import  {
  createTxMsgDelegate,
} from "@tharsis/transactions";
import {
  getSenderObj,
  signAndBroadcastTxMsg,
} from '@utils/sign_and_broadcast_tx_msg';

export const useDelegate = (validator: string, chainConfig: any) => {
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

    console.log('res:', res);
  } 
  
  return {
    requestDelegate,
  };
};