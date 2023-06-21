import { ReactNode, forwardRef } from 'react';
import { AiOutlineTable } from 'react-icons/ai';
import styles from './SheetsListItem.module.css';
import { motion } from 'framer-motion';

interface ISheetsListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isIcon?: boolean;
  children: ReactNode;
}

export const SheetsListItem = forwardRef<HTMLDivElement, ISheetsListItemProps>((props, ref) => {
  const { isIcon = true, children, ...anotherProps } = props;

  return (
    <div ref={ref} {...anotherProps} className={styles.item}>
      {isIcon && (
        <div className={styles.icon_container}>
          <AiOutlineTable className={styles.icon} />
        </div>
      )}

      <div className={styles.main}>{children}</div>
    </div>
  );
});

export const MSheetsListItem = motion(SheetsListItem);
