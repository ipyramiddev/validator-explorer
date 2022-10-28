import { BigNumber } from 'ethers';

export type AtomState = {
  address: string | null;
  balance: BigNumber | null;
};