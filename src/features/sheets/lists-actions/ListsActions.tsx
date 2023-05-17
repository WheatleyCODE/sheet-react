import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdContentCopy, MdDeleteOutline, MdDriveFileRenameOutline, MdOutlineSettings } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import styles from './ListActions.module.css';

interface ListActionsProps {
  name: string;
  isActive?: boolean;
  id: string;
  changeCurrentListId: (id: string) => void;
}

export const ListActions: FC<ListActionsProps> = ({ name, isActive, changeCurrentListId, id }) => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  const onClick = () => {
    changeCurrentListId(id);
  };

  return (
    <div className={styles.actions}>
      <Title text={`Перейти на ${name}`}>
        <Button onClick={onClick} className={`${styles.button} ${isActive && styles.active}`} text={name} />
      </Title>

      <Title isStopShow={isShow} text={`Параметры ${name}`}>
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdOutlineSettings} />

        <AnimatePresence>
          {isShow && (
            <MDropdown
              transition={{ duration: ANIMATION_DURATION }}
              exit={{ height: 0 }}
              animate={{ height: 'auto' }}
              initial={{ height: 0 }}
              className={styles.dropdown}
              closeDropdown={closeDropdown}
            >
              <DropdownMenu>
                <DropdownMenuItem onClick={closeDropdown} Icon={MdDeleteOutline} text="Удалить" />
                <DropdownMenuItem onClick={closeDropdown} Icon={MdContentCopy} text="Копировать" />
                <DropdownMenuItem onClick={closeDropdown} Icon={MdDriveFileRenameOutline} text="Переименовать" />
              </DropdownMenu>
            </MDropdown>
          )}
        </AnimatePresence>
      </Title>
    </div>
  );
};
