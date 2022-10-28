import { selector } from 'recoil';
import { BigNumber } from 'ethers';
import { atomState } from './atom';
import { mergeStateChange } from '@utils/merge_state_change';

const getAddress = ({ get }): string | null => {
  const state = get(atomState);
  return state.address;
};

const getBalance = ({ get }): BigNumber | null => {
  const state = get(atomState);
  return state.balance;
}

export const readAddress = selector({
    key: 'wallet.read.address',
    get: getAddress,
});

export const writeAddress = selector({
  key: 'wallet.write.address',
  get: getAddress,
  set: ({ get, set }, newAddress: string) => {
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, {
      address: newAddress,
    });
    set(atomState, newState);
  },
});

export const readBalance = selector({
  key: 'wallet.read.balance',
  get: getBalance,
});

export const writeBalance = selector({
  key: 'wallet.write.balance',
  get: getBalance,
  set: ({ get, set }, newBalance: BigNumber | null) => {
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, {
      balance: newBalance,
    });
    set(atomState, newState);
  },
});