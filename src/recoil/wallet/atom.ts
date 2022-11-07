import { atom } from 'recoil';
import { AtomState } from './types';

const initialState: AtomState = {
  address: null,
  balance: null,
};
export const atomState = atom<AtomState>({
  key: 'wallet',
  default: initialState,
});
