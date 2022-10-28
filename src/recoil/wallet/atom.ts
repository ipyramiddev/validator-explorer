import { atom } from 'recoil';
import { AtomState } from './types';
import { BigNumber } from 'ethers';

const initialState: AtomState = {
  address: null,
  balance: null,
};
export const atomState = atom<AtomState>({
  key: 'wallet',
  default: initialState,
});
