import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export const useDelayHover = (isInitial = false, time = 700) => {
  const [isMove, setIsMove] = useState(isInitial);
  const [isEnter, setIsEnter] = useState(isInitial);

  const close = useDebounce(() => setIsMove(false), time);

  const onMouseEnter = useCallback(() => setIsEnter(true), []);
  const onMouseMove = useCallback(() => setIsMove(true), []);
  const onMouseLeave = useCallback(() => {
    close();
    setIsEnter(false);
  }, [close]);

  return {
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    isShow: isEnter || isMove,
  };
};
