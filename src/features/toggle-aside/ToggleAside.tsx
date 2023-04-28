import { FC } from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { asideActions } from 'widgets/asideSlice';
import styles from './ToggleAside.module.css';

export const ToggleAside: FC = () => {
  const { isShow } = useTypedSelector((state) => state.aside);
  const dispatch = useTypedDispatch();

  const toggleAside = () => {
    dispatch(asideActions.changeIsShow(!isShow));
  };

  return (
    <div className={styles.toggle_aside}>
      <Title text={isShow ? 'Закрыть боковую панель' : 'Открыть боковую панель'}>
        <Button
          onClick={toggleAside}
          className={`${styles.toggle_aside_button} ${isShow ? styles.close : styles.open}`}
          Icon={MdKeyboardDoubleArrowLeft}
        />
      </Title>
    </div>
  );
};
