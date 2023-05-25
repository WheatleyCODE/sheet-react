import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdCheck, MdChevronLeft, MdOutlineFilterAlt } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown, ANIMATION_DURATION, useTypedDispatch } from 'shared';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import { createSheetsActions, sheetsSortNames } from 'widgets';
import styles from './ListFilter.module.css';

// ! FIX
import { ListSorters } from 'widgets/create-sheets/store/createSheetsSlice';

export interface ListFilterProps {
  currentSorter: ListSorters;
}

export const ListFilter: FC<ListFilterProps> = ({ currentSorter }) => {
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useTypedDispatch();

  const changeCurrentSorter = (sorter: ListSorters) => {
    dispatch(createSheetsActions.changeCurrentSorter(sorter));
  };

  const onMouseEnter = () => {
    setIsHidden(true);
  };

  const closeDropdownHandler = () => {
    setIsHidden(false);
    closeDropdown();
  };

  const setNameSorter = () => {
    changeCurrentSorter(ListSorters.NAME);
    closeDropdownHandler();
  };

  const setCreateDateSorter = () => {
    changeCurrentSorter(ListSorters.CREATE_DATE);
    closeDropdownHandler();
  };

  const setChangeDateSorter = () => {
    changeCurrentSorter(ListSorters.CHANGE_DATE);
    closeDropdownHandler();
  };

  const setOpenDateSorter = () => {
    changeCurrentSorter(ListSorters.OPEN_DATE);
    closeDropdownHandler();
  };

  return (
    <div className={styles.filter}>
      <Title isStopShow={isShow} text="Сортировка">
        <Button text="Сортировка" onClick={toggleDropdown} className={styles.button} Icon={MdOutlineFilterAlt} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            onMouseEnter={onMouseEnter}
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            closeDropdown={closeDropdownHandler}
            className={`${styles.dropdown} ${isHidden && styles.visible}`}
          >
            <DropdownMenu>
              <DropdownMenuItem
                onClick={setNameSorter}
                Icon={currentSorter === ListSorters.NAME ? MdCheck : 'NONE'}
                text={sheetsSortNames[ListSorters.NAME]}
              />
              <DropdownMenuItem Icon={MdChevronLeft} text="По дате">
                <DropdownMenu>
                  <DropdownMenuItem
                    onClick={setCreateDateSorter}
                    Icon={currentSorter === ListSorters.CREATE_DATE ? MdCheck : 'NONE'}
                    text={sheetsSortNames[ListSorters.CREATE_DATE]}
                  />
                  <DropdownMenuItem
                    onClick={setChangeDateSorter}
                    Icon={currentSorter === ListSorters.CHANGE_DATE ? MdCheck : 'NONE'}
                    text={sheetsSortNames[ListSorters.CHANGE_DATE]}
                  />
                  <DropdownMenuItem
                    onClick={setOpenDateSorter}
                    Icon={currentSorter === ListSorters.OPEN_DATE ? MdCheck : 'NONE'}
                    text={sheetsSortNames[ListSorters.OPEN_DATE]}
                  />
                </DropdownMenu>
              </DropdownMenuItem>
            </DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
