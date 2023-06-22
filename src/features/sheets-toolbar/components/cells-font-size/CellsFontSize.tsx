import { FC, useState, ChangeEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import { FONT_SIZES } from 'features/sheets-toolbar/consts/sizes';
import styles from './CellsFontSize.module.css';

interface ICellsFontSizeProps {
  fn?: any;
}

export const CellsFontSize: FC<ICellsFontSizeProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();
  const [value, setValue] = useState(10);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);

    if (isNaN(num)) {
      setValue(10);
      return;
    }

    setValue(num);
  };

  const setValueHandler = (num: number) => {
    setValue(num);
    closeDropdown();
  };

  const addValue = () => {
    setValue((p) => p + 1);
  };

  const subValue = () => {
    setValue((p) => p - 1);
  };

  return (
    <div className={styles.font_size}>
      <Title text="Уменьшить размер шрифта">
        <Button onClick={subValue} className={styles.button} Icon={MdRemove} />
      </Title>

      <div>
        <Title isStopShow={isShow} text="Размер шрифта">
          <input value={value} onChange={onChange} onClick={toggleDropdown} className={styles.input} type="text" />
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
                {FONT_SIZES.map((num) => (
                  <div key={num} onClick={() => setValueHandler(num)} className={styles.item}>
                    {num}
                  </div>
                ))}
              </div>
            </MDropdown>
          )}
        </AnimatePresence>
      </div>

      <Title text="Увеличить размер шрифта">
        <Button onClick={addValue} className={styles.button} Icon={MdAdd} />
      </Title>
    </div>
  );
};
