import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.css';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  Icon?: IconType;
  disable?: boolean;
}

export const Button: FC<IButtonProps> = memo((props) => {
  const { text, className = '', Icon, disable = false, ...otherProps } = props;
  const MemoIcon = Icon && memo(Icon);

  return (
    <button
      className={`${styles.button} ${disable && styles.disable} ${disable && styles.disable} ${className}`}
      type="button"
      disabled={disable}
      {...otherProps}
    >
      {MemoIcon && (
        <div aria-hidden className={styles.button_icon}>
          <MemoIcon />
        </div>
      )}
      {text}
    </button>
  );
});
