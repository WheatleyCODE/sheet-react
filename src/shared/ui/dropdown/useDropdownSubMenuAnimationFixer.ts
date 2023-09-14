import { useState } from 'react';

export const useDropdownSubMenuAnimationFixer = (closeMenu: () => void, initialState = true) => {
  const [isHidden, setIsHidden] = useState(initialState);

  const closeContextMenu = () => {
    setIsHidden(true);
    closeMenu();
  };

  const onMouseEnter = () => {
    setIsHidden(false);
  };

  return { overflowStyles: { overflow: isHidden ? 'hidden' : 'visible' }, close: closeContextMenu, onMouseEnter };
};
