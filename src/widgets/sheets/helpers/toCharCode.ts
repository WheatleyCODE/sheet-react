import { TABLE_MAX_LENGTH, CODES } from 'shared/consts/table';

export const toCharCode = (): (() => string) => {
  let count = -1;
  let repeat = 1;

  return () => {
    count++;

    if (count > TABLE_MAX_LENGTH) {
      repeat++;
      count = 0;
    }

    return String.fromCharCode(CODES.A + count).repeat(repeat);
  };
};
