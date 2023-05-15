import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { useDelayHover } from 'shared/lib/hooks/useDelayHover';
import { AnimatePresence } from 'framer-motion';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './DropdownMenuItem.module.css';

interface DropdownMenuItemProps {
  children?: ReactNode;
  text: string;
  Icon: IconType;
  onClick?: () => void;
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({ children, Icon, text, onClick }) => {
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 400, 0);

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div
      onClick={onClickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={styles.item}
    >
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.text}>{text}</div>

      <AnimatePresence>
        {children && isShow && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            className={styles.sub_menu}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
