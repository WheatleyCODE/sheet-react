import { FC, memo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MdCheck,
  MdChevronLeft,
  MdContentCopy,
  MdContentCut,
  MdContentPaste,
  MdOutlineFilterAlt,
} from 'react-icons/md';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import { useClickOutside } from 'shared/lib/hooks/useClickOutsize';
import { useContextMenu } from './useContextMenu';
import styles from './ContextMenu.module.css';

interface ContextMenuProps {
  a?: string;
  selectedCells?: [];
}

// ! FIX
export const ContextMenu: FC<ContextMenuProps> = memo(() => {
  const ref = useRef<null | HTMLDivElement>(null);
  const { closeContextMenu, coords } = useContextMenu();

  useClickOutside(ref, closeContextMenu, ['click', 'contextmenu']);

  return (
    <motion.div
      ref={ref}
      style={coords}
      transition={{ duration: ANIMATION_DURATION * 1.5 }}
      exit={{ height: 0, opacity: 0.5 }}
      animate={{ height: 'auto', opacity: 1 }}
      initial={{ height: 0, opacity: 0.5 }}
      className={styles.menu}
    >
      <DropdownMenu>
        <DropdownMenuItem onClick={closeContextMenu} Icon={MdContentCut} text="Вырезать" />
        <DropdownMenuItem onClick={closeContextMenu} Icon={MdContentCopy} text="Копировать" />
        <DropdownMenuItem onClick={closeContextMenu} Icon={MdContentPaste} text="Вставить" />
        <DropdownMenuItem onClick={closeContextMenu} Icon={MdOutlineFilterAlt} text="Добавить фильтр" />
        <DropdownMenuItem Icon={MdChevronLeft} text="Выбрать что-то">
          <DropdownMenu>
            <DropdownMenuItem onClick={closeContextMenu} Icon={MdCheck} text="По дате изменения" />
            <DropdownMenuItem onClick={closeContextMenu} Icon={MdCheck} text="По дате просмотра" />
            <DropdownMenuItem onClick={closeContextMenu} Icon={MdCheck} text="По дате создания" />
          </DropdownMenu>
        </DropdownMenuItem>
      </DropdownMenu>
    </motion.div>
  );
});
