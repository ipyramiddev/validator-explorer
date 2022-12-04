export const columns:{
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'block',
    width: 15,
  },
  {
    key: 'hash',
    width: 30,
  },
  {
    key: 'messages',
    align: 'center',
    width: 15,
  },
  {
    key: 'result',
    align: 'left',
    width: 20,
  },
  {
    key: 'time',
    align: 'left',
    width: 20,
  },
];
