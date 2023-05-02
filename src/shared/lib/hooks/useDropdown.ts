import { useState, useCallback } from 'react';

export const useDropdown = () => {
  const [isShow, setIsShow] = useState(false);

  const toggleDropdown = useCallback(() => {
    setTimeout(() => setIsShow((p) => !p), 0);
  }, []);

  const closeDropdown = useCallback(() => {
    setTimeout(() => setIsShow(false), 0);
  }, []);

  return {
    isShow,
    toggleDropdown,
    closeDropdown,
  };
};
