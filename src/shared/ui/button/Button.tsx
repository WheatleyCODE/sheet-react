import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.css';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  Icon?: IconType;
  SubIcon?: IconType;
  disable?: boolean;
}

export const Button: FC<IButtonProps> = memo((props) => {
  const { text, className = '', Icon, SubIcon, disable = false, ...otherProps } = props;
  const MemoIcon = Icon && memo(Icon);
  const MemoSubIcon = SubIcon && memo(SubIcon);

  return (
    <button
      className={`${styles.button} ${disable && styles.disable} ${disable && styles.disable} ${className} ${
        Icon && styles.icon
      }`}
      type="button"
      disabled={disable}
      {...otherProps}
    >
      {MemoIcon && (
        <div className={styles.button_icon_container}>
          <MemoIcon className={styles.button_icon} />
        </div>
      )}
      {text}
      {MemoSubIcon && (
        <div className={styles.button_sub_icon_container}>
          <MemoSubIcon className={styles.button_sub_icon} />
        </div>
      )}
    </button>
  );
});
