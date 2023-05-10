import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './TemplateCard.module.css';
import { ANIMATION_DURATION } from 'shared/consts/animate';

export interface ITemplateCardProps {
  text: string;
  src: string;
  noAnimate?: boolean;
}

export const TemplateCard: FC<ITemplateCardProps> = ({ text, src, noAnimate = false }) => {
  return (
    <div className={noAnimate ? styles.card_def : styles.card}>
      <Link to="sheets/randomId">
        {noAnimate ? (
          <div className={styles.image}>
            <img src={src} alt="Картинка" />
          </div>
        ) : (
          <motion.div
            initial={{ height: 135 }}
            whileHover={{
              scale: 1.05,
              translateY: -10,
              height: 'auto',
            }}
            whileTap={{ scale: 1, transition: { duration: ANIMATION_DURATION } }}
            transition={{ duration: ANIMATION_DURATION * 2 }}
            className={styles.image}
          >
            <img src={src} alt="Картинка" />
          </motion.div>
        )}
      </Link>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
