import { useEffect } from 'react';
import { useActions, useTypedSelector } from 'shared/lib';
import { RESIZE_MARGIN } from 'entities/share';

export type ResizeType = 'col' | 'row' | null;

export const useTableResize = () => {
  const { addColWidth, addRowHeight } = useActions();
  const { currentListId, id } = useTypedSelector((state) => state.sheets);

  useEffect(() => {
    let resize: HTMLDivElement | null = null;
    let isActive = false;
    let type: ResizeType = null;
    let colId: string | null;
    let rowId: string | null;

    const coords = {
      startX: 0,
      startY: 0,
      addX: 0,
      addY: 0,
    };

    const mouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      colId = target.getAttribute('data-col-resize');
      rowId = target.getAttribute('data-row-resize');

      if (rowId || colId) {
        resize = target;
        resize.classList.add('resize');
        coords.startX = e.clientX;
        coords.startY = e.clientY;
        type = rowId ? 'row' : 'col';
        isActive = true;
      }
    };

    const mouseUp = () => {
      if (resize) {
        resize.classList.remove('resize');
        type === 'col' ? (resize.style.right = `-${RESIZE_MARGIN}px`) : (resize.style.bottom = `-${RESIZE_MARGIN}px`);
      }

      if (type === 'col' && colId && currentListId && id) {
        addColWidth({ sheetsId: id, listId: currentListId, colId: Number(colId), width: coords.addX });
      }

      if (type === 'row' && rowId && currentListId && id) {
        addRowHeight({ sheetsId: id, listId: currentListId, rowId: Number(rowId), height: coords.addY });
      }

      coords.startX = 0;
      coords.startY = 0;
      coords.addX = 0;
      coords.addY = 0;

      type = null;
      resize = null;
      isActive = false;
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isActive || !resize) return;

      if (type === 'row') {
        const y = coords.startY - e.clientY - RESIZE_MARGIN;
        resize.style.bottom = `${y}px`;
        coords.addY = y * -1;
      }

      if (type === 'col') {
        const x = coords.startX - e.clientX - RESIZE_MARGIN;
        resize.style.right = `${x}px`;
        coords.addX = x * -1;
      }
    };

    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);

    return () => {
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    };
  }, [currentListId, id]);
};
