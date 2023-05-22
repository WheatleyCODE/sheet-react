import React, { FC, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CgClose } from 'react-icons/cg';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './Modal.module.css';

export interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export const Modal: FC<IModalProps> = ({ children, onClose, className }) => {
  const MemoIcon = memo(CgClose);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      initial={{ translateY: -30, opacity: 0, scale: 0.5 }}
      animate={{ translateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: ANIMATION_DURATION }}
      exit={{ translateY: -30, opacity: 0, scale: 0.5 }}
      onClick={stopPropagation}
      className={`${styles.modal} ${className || ''}`}
    >
      <div aria-hidden onClick={onClose} className={styles.close_button}>
        <MemoIcon />
      </div>

      {children}
    </motion.div>
  );
};
