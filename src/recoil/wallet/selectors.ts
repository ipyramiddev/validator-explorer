import { selector } from 'recoil';
import { atomState } from './atom';

const getAddress = ({ get }): string => {
  const state = get(atomState);
  return state.address;
};

export const readAddress = selector({
    key: 'wallet.read.address',
    get: getAddress,
});

export const writeAddress = selector({
  key: 'wallet.write.address',
  get: getAddress,
  set: ({ get, set }, newAddress: string) => {
    set(atomState, {
      address: newAddress
    });
  },
});