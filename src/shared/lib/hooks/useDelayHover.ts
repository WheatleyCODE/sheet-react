import { useState, useCallback, useRef } from 'react';
import { useDebounce } from './useDebounce';

export const useDelayHover = (isInitial = false, time = 700, delay = 500, refresh = 200) => {
  const [isMove, setIsMove] = useState(isInitial);
  const [isEnter, setIsEnter] = useState(isInitial);
  const first = useRef(false);
  const target = useRef(false);

  const close = useDebounce(() => setIsMove(false), time);
  const refreshFirstHover = useDebounce(() => (first.current = false), refresh);

  const onMouseEnter = useCallback(() => {
    target.current = true;

    if (!first.current) {
      setTimeout(() => {
        if (target.current) {
          setIsEnter(true);
          first.current = true;
        }
      }, delay);
      return;
    }

    setIsEnter(true);
  }, [first, delay, target]);

  const onMouseMove = useCallback(() => {
    if (first.current) {
      setIsMove(true);
    }
  }, [first]);

  const onMouseLeave = useCallback(() => {
    close();
    setIsEnter(false);
    refreshFirstHover();
    target.current = false;
  }, [close, refreshFirstHover]);

  return {
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    isShow: isEnter || isMove,
  };
};
