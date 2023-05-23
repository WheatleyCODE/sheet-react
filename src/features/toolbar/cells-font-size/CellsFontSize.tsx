import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './CellsFontSize.module.css';

interface ICellsFontSizeProps {
  fn?: any;
}

export const CellsFontSize: FC<ICellsFontSizeProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.font_size}>
      <Title text="Уменьшить размер шрифта">
        <Button className={styles.button} Icon={MdRemove} />
      </Title>

      <div>
        <Title isStopShow={isShow} text="Размер шрифта">
          <input onClick={toggleDropdown} value={10} className={styles.input} type="text" />
        </Title>

        <AnimatePresence>
          {isShow && (
            <MDropdown
              className={styles.dropdown}
              closeDropdown={closeDropdown}
              transition={{ duration: ANIMATION_DURATION }}
              exit={{ height: 0 }}
              animate={{ height: 'auto' }}
              initial={{ height: 0 }}
            >
              <div className={styles.menu}>
                <div className={styles.item}>6</div>
                <div className={styles.item}>8</div>
                <div className={styles.item}>10</div>
                <div className={styles.item}>12</div>
                <div className={styles.item}>14</div>
                <div className={styles.item}>18</div>
                <div className={styles.item}>24</div>
                <div className={styles.item}>36</div>
              </div>
            </MDropdown>
          )}
        </AnimatePresence>
      </div>

      <Title text="Увеличить размер шрифта">
        <Button className={styles.button} Icon={MdAdd} />
      </Title>
    </div>
  );
};
