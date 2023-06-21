import { FC, ReactNode } from 'react';
import styles from './TemplateList.module.css';

interface ITemplateListProps {
  children: ReactNode;
}

export const TemplateList: FC<ITemplateListProps> = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};
