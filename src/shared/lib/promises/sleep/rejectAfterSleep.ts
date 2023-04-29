export const rejectAfterSleep = (ms: number, err: string): Promise<void> => {
  return new Promise((_, reject) => setTimeout(reject, ms, err));
};
