import { FC } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import styles from './SheetAside.module.css';

export const SheetAside: FC = () => {
  return (
    <motion.div
      transition={{ duration: ANIMATION_DURATION }}
      initial={{ width: 0, opacity: 1 }}
      animate={{ width: 300, opacity: 1 }}
      exit={{ width: 0, opacity: 1 }}
      className={styles.aside}
    >
      SheetAside
    </motion.div>
  );
};
