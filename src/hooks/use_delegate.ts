import {
  createTxMsgDelegate,
  createTxMsgUndelegate,
} from '@tharsis/transactions';
import {
  getSenderObj,
  signAndBroadcastTxMsg,
  getDelegationObject,
} from '@utils/sign_and_broadcast_tx_msg';

export const useDelegate = (validator: string, chainConfig: any) => {
  // const [_, setBalance] = useRecoilState(writeBalance);
  const delegateFee = {
    amount: '80000000000000000',
    denom: chainConfig.DENOM,
    gas: '300000',
  };

  const chain = {
    chainId: chainConfig.CHAINID,
    cosmosChainId: chainConfig.NAME,
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

    await signAndBroadcastTxMsg(
      msg,
      senderObj,
      chain,
      chainConfig.REST_RPC,
      address,
    );

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // provider.getBalance(address).then((balance) => {
    //   setBalance(balance.toString());
    // });
  };

  const requestUndelegate = async (address: string, amount: string) => {
    const senderObj: any = await getSenderObj(address, chainConfig.REST_RPC);
    console.log("senderObj: ", senderObj);
    const params = {
      validatorAddress: validator,
      amount,
      denom: chainConfig.DENOM,
    };

    // Create message to delegate
    const msg = createTxMsgUndelegate(chain, senderObj, delegateFee, '', params);
    console.log("msg: ", msg);
    await signAndBroadcastTxMsg(
      msg,
      senderObj,
      chain,
      chainConfig.REST_RPC,
      address,
    );

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // provider.getBalance(address).then((balance) => {
    //   setBalance(balance.toString());
    // });
  };


  const requestDelegationInfo = async (address: string, node_addr: string, validatorAddr: string) => {
    return await getDelegationObject(address, node_addr, validatorAddr);
  };

  return {
    requestDelegate,
    requestUndelegate,
    requestDelegationInfo,
  };
};
