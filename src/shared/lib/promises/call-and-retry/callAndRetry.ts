/* eslint-disable prefer-const */
import { sleep } from '../sleep/sleep';
import { Constructor, RetryParams } from './interface';

export const callAndRetry = <T>(constructor: Constructor<T>, params: RetryParams, ...cbPrms: any[]): Promise<T> => {
  let { delay = 0, tries = 1, onRetry } = params;

  return constructor(...cbPrms).catch((err) => {
    if (tries <= 0) {
      return Promise.reject(err);
    }

    tries--;

    return new Promise((res) => {
      sleep(delay).then(() => {
        if (onRetry) onRetry();

        res(callAndRetry(constructor, { delay, tries, onRetry }, ...cbPrms));
      });
    });
  });
};
