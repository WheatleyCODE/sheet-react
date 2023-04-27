import React, { useCallback, useState } from 'react';

export interface IValidInputOpts<T> {
  value: T;
  isFocus: boolean;
  isActive: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  isError: boolean;
  isTouched: boolean;
  validError: string | null;
  changeValue: (string: T) => void;
  changeFocus: (boolean: boolean) => void;
  changeActive: (boolean: boolean) => void;
}

export type IValidator = (str: string) => string | null;

export const useValidInput = <T>(init: T, validators?: IValidator[]): IValidInputOpts<T> => {
  const [value, setValue] = useState(init);
  const [isFocus, setIsFocus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [validError, setValidError] = useState<null | string>(null);
  const [isTouched, setIsTouched] = useState(false);
  let counter = 0;

  const onBlur = useCallback(() => {
    setIsTouched(true);
    setIsFocus(false);

    if (!value) setIsActive(false);
  }, [value]);

  const onFocus = useCallback(() => {
    setIsFocus(true);
    setIsActive(true);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);

    if (counter === 0 && e.target.value) {
      setIsTouched(true);
    }

    validators?.forEach((fn) => {
      setValidError(fn(e.target.value));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    counter += 1;
  }, []);

  const changeFocus = useCallback((boolean: boolean) => {
    setIsFocus(boolean);
  }, []);

  const changeActive = useCallback((boolean: boolean) => {
    setIsActive(boolean);
  }, []);

  const changeValue = useCallback((string: T) => {
    setValue(string);
  }, []);

  return {
    value,
    isFocus,
    isActive,
    onChange,
    onBlur,
    onFocus,
    isError: !!(isTouched && validError),
    isTouched,
    validError,
    changeValue,
    changeFocus,
    changeActive,
  };
};
