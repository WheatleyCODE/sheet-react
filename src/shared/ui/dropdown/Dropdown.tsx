import { forwardRef, ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Dropdown.module.css';
import { useClickOutside } from 'shared/lib/hooks/useClickOutsize';

export interface IDropdownProps {
  children: ReactNode;
  className?: string;
  closeDropdown: () => void;
}

export const Dropdown = forwardRef<HTMLDivElement, IDropdownProps>((props, ref) => {
  const { children, className, closeDropdown } = props;
  const main = useRef<HTMLDivElement | null>(null);

  useClickOutside(main, closeDropdown, ['click', 'contextmenu']);

  return (
    <div ref={ref} className={`${styles.dropdown} ${className && className}`}>
      <div ref={main}>{children}</div>
    </div>
  );
});

export const MDropdown = motion(Dropdown);
