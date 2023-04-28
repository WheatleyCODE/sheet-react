import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelayHover } from 'shared/lib/hooks/useDelaayHover';
import styles from './Title.module.css';
import { ANIMATION_DURATION } from 'shared/consts/animate';

export interface TitleProps {
  children: React.ReactNode;
  text: string;
}

export const Title: FC<TitleProps> = ({ children, text }) => {
  const { isShow, onMouseEnter, onMouseLeave } = useDelayHover(false, 2000);

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={styles.title}>
      {children}

      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            className={styles.title_text}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
