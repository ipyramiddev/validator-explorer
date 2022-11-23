import {
  generateEndpointAccount,
  generateEndpointGetDelegations,
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
  generateEndpointDistributionRewardsByAddress,
} from '@tharsis/provider';
import {
  createTxRawEIP712,
  signatureToWeb3Extension,
  createTxMsgMultipleWithdrawDelegatorReward,
} from '@tharsis/transactions';
import { signatureToPubkey } from '@hanchon/signature-to-pubkey';
import { ethers } from 'ethers';
import axios from 'axios';

/**
 * Convert an eth address to cascadia address
 * @param {string} addr eth address to be converted
 * @param {string} nodeAddr rest_rpc url of cascadia chain
 * @return {string} converted cascadia address
 */
export async function ethToCascadia(
  addr: string,
  nodeAddr: string,
): Promise<string> {
  try {
    const { data } = await axios.get(
      `${nodeAddr}/ethermint/evm/v1/cosmos_account/${addr}`,
    );
    return data.cosmos_address;
  } catch (err) {
    // console.log(err);
    return null;
  }
}

/**
 * Uses the eth hex address, converts it to a canto address,
 * then gets the sender object.
 * @param {string} addr eth address
 * @param {string} nodeAddr rest_rpc url of cascadia chain
 * @return {object} sender object
 */
export async function getSenderObj(
  addr: string,
  nodeAddr: string,
): Promise<any> {
  const accountCanto = await ethToCascadia(addr, nodeAddr);
  const endPointAccount = generateEndpointAccount(accountCanto ?? '');
  const { data } = await axios.get(
    nodeAddr + endPointAccount,
  );

  const res = await reformatSender(data.account.base_account);
  return res;
}

/**
 * Uses the eth hex address, converts it to a canto address,
 * then gets the delegation response object.
 * @param {string} addr eth address
 * @param {string} nodeAddr rest_rpc url of cascadia chain
 * @param {string} validatorAddr validator address of cascadia chain
 * @return {object} delegation amount in delegation_responses except for pagination
 */
export async function getDelegationObject(
  addr: string,
  nodeAddr: string,
  validatorAddr: string,
) {
  const accountCascadia = await ethToCascadia(addr, nodeAddr);
  const endPointAccount = generateEndpointGetDelegations(accountCascadia ?? '');
  const { data } = await axios.get(
    nodeAddr + endPointAccount,
  );
  // return data.delegation_responses[0].delegation;
  for (let i = 0; i < data.delegation_responses.length; i += 1) {
    if (data.delegation_responses[i].delegation.validator_address === validatorAddr) {
      return data.delegation_responses[i];
    }
  }
}

export async function getRewardObject(
  addr: string,
  nodeAddr: string,
  validatorAddr: string,
) {
  const accountCascadia = await ethToCascadia(addr, nodeAddr);
  const endPointAccount = generateEndpointDistributionRewardsByAddress(accountCascadia ?? '');
  const { data } = await axios.get(
    `${nodeAddr}${endPointAccount}/${validatorAddr}`,
  );
  return data.rewards[0].amount;
}

export async function signAndBroadcastTxMsg(
  msg: any,
  senderObj: any,
  chain: any,
  nodeAddress: string,
  address: string,
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signature = await provider.send('eth_signTypedData_v4', [
    address,
    JSON.stringify(msg.eipToSign),
  ]);

  const raw = generateRawTx(chain, senderObj, signature, msg);

  const { data } = await axios.post(
    nodeAddress + generateEndpointBroadcast(),
    generatePostBodyBroadcast(raw),
  );

  return data;

  // const postOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": JSONHeader },
  //   body: generatePostBodyBroadcast(raw),
  // };
  // const broadcastPost = await fetch(
  //   nodeAddress + generateEndpointBroadcast(),
  //   postOptions
  // );
  // return await broadcastPost.json();
}

export async function txClaimRewards(
  account,
  nodeAddressIP,
  fee,
  chain,
  memo,
  valiAddr,
) {
  const validators = [];
  validators.push(valiAddr);
  const params = {
    validatorAddresses: validators,
  };

  // get sender object using eth address
  const senderObj = await getSenderObj(account, nodeAddressIP);

  // create the msg to delegate
  const msg = createTxMsgMultipleWithdrawDelegatorReward(
    chain,
    senderObj,
    fee,
    memo,
    params,
  );
  const res = await signAndBroadcastTxMsg(
    msg,
    senderObj,
    chain,
    nodeAddressIP,
    account,
  );
  return res;
}

async function reformatSender(addressData: any) {
  let pubkey: string;
  if (addressData.pub_key === null) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage('generate_pubkey');

    pubkey = signatureToPubkey(
      signature,
      Buffer.from([
        50, 215, 18, 245, 169, 63, 252, 16, 225, 169, 71, 95, 254, 165, 146,
        216, 40, 162, 115, 78, 147, 125, 80, 182, 25, 69, 136, 250, 65, 200, 94,
        178,
      ]),
    );
  } else {
    pubkey = addressData.pub_key.key;
  }

  return {
    accountNumber: addressData.account_number,
    pubkey,
    sequence: addressData.sequence,
    accountAddress: addressData.address,
  };
}

function generateRawTx(chain: any, senderObj: any, signature: any, msg: any) {
  const extension = signatureToWeb3Extension(chain, senderObj, signature);

  return createTxRawEIP712(
    msg.legacyAmino.body,
    msg.legacyAmino.authInfo,
    extension,
  );
}
