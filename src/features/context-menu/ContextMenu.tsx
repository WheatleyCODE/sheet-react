import { FC, memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import { MdContentCopy, MdContentCut, MdContentPaste, MdOutlineFilterAlt, MdTimeline } from 'react-icons/md';
import { useClickOutside } from 'shared/lib/hooks/useClickOutsize';
import { useContextMenu } from './useContextMenu';
import styles from './ContextMenu.module.css';

interface ContextMenuProps {
  a?: string;
  selectedCells?: [];
}

export const ContextMenu: FC<ContextMenuProps> = memo(() => {
  const ref = useRef<null | HTMLDivElement>(null);
  const { closeContextMenu, coords } = useContextMenu();

  useClickOutside(ref, closeContextMenu, ['click', 'contextmenu']);

  console.log(coords);

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
      <div onClick={closeContextMenu} className={styles.list}>
        <div className={styles.li}>
          <div className={styles.icon}>
            <MdContentCut />
          </div>
          Вырезать
        </div>
        <div className={styles.li}>
          <div className={styles.icon}>
            <MdContentCopy />
          </div>
          Копировать
        </div>
        <div className={styles.li}>
          <div className={styles.icon}>
            <MdContentPaste />
          </div>
          Вставить
        </div>
        <div className={styles.li}>
          <div className={styles.icon}>
            <MdTimeline />
          </div>
          Вырезать
        </div>
        <div className={styles.li}>
          <div className={styles.icon}>
            <MdOutlineFilterAlt />
          </div>
          Добавить фильтр
        </div>
      </div>
    </motion.div>
  );
});
