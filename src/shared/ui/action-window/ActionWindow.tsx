import { forwardRef, ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'shared/lib/hooks/useClickOutsize';
import { Button } from '../button/Button';
import styles from './ActionWindow.module.css';

export interface IActionWindowProps {
  children: ReactNode;
  onClose: () => void;
  onSuccess: () => void;
  actionName: string;
  className?: string;
}

export const ActionWindow = forwardRef<HTMLDivElement, IActionWindowProps>((props, ref) => {
  const { children, className, onClose, onSuccess, actionName } = props;
  const main = useRef<HTMLDivElement | null>(null);

  useClickOutside(main, onClose, ['click', 'contextmenu']);

  return (
    <div ref={ref} onClick={(e) => e.stopPropagation()} className={`${styles.window} ${className && className}`}>
      <div className={styles.main} ref={main}>
        <div className={styles.name}>{actionName}</div>

        {children}

        <div className={styles.buttons}>
          <Button onClick={onClose} text="Закрыть" />
          <Button onClick={onSuccess} text="Подтверить" />
        </div>
      </div>
    </div>
  );
});

export const MActionWindow = motion(ActionWindow);
