import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Spinner.module.css';

export interface ISpinnerProps {
  text: string;
  className: string;
}

export const Spinner = forwardRef<HTMLDivElement, ISpinnerProps>(({ text, className }, ref) => {
  return (
    <div className={`${styles.container} ${className || ''}`} ref={ref}>
      <div className={styles.spinner} />
      <span className={styles.text}>{text}</span>
    </div>
  );
});

export const MSpinner = motion(Spinner);
