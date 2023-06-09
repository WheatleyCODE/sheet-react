import { FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { useDelayHover, ANIMATION_DURATION } from 'shared';
import styles from './DropdownMenuItem.module.css';

interface DropdownMenuItemProps {
  children?: ReactNode;
  className?: string;
  text: string;
  Icon?: IconType | 'NONE';
  onClick?: () => void;
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({ children, Icon, text, onClick, className }) => {
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 400, 0);

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  const isNone = Icon === 'NONE';
  const isIcon = typeof Icon === 'function';

  return (
    <div
      onClick={onClickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={`${styles.item} ${className && className}`}
    >
      {isNone && <div className={styles.icon} />}

      {isIcon && (
        <div className={styles.icon}>
          <Icon />
        </div>
      )}

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
