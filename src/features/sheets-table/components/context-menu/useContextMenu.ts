import { contextMenuActions } from 'features';
import { useTypedDispatch, useTypedSelector } from 'shared';

let isFresh = false;

export const useContextMenu = () => {
  const { isShow, coords } = useTypedSelector((state) => state.contextMenu);

  const dispatch = useTypedDispatch();

  const closeContextMenu = () => {
    setTimeout(() => {
      isFresh = true;
      dispatch(contextMenuActions.changeIsShow(false));
    }, 0);

    setTimeout(() => {
      isFresh = false;
    }, 170);
  };

  const openContextMenu = (e: React.MouseEvent) => {
    if (!isFresh) {
      setTimeout(() => {
        dispatch(contextMenuActions.changeCoords({ top: e.clientY, left: e.clientX }));
        dispatch(contextMenuActions.changeIsShow(true));
      }, 0);
      return;
    }

    setTimeout(() => {
      dispatch(contextMenuActions.changeCoords({ top: e.clientY, left: e.clientX }));
      dispatch(contextMenuActions.changeIsShow(true));
    }, 170);
  };

  return {
    isShow,
    coords,
    closeContextMenu,
    openContextMenu,
  };
};
