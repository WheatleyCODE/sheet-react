import { FC } from 'react';
import { Backdrop, Button, Input, Modal, Portal } from 'shared/ui';
import { useValidInput } from 'shared';
import styles from './RenameListModal.module.css';

interface IRenameListModalProps {
  renameList: () => void;
  onClose: () => void;
}

export const RenameListModal: FC<IRenameListModalProps> = ({ renameList, onClose }) => {
  const input = useValidInput('');

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <div className={styles.rename_modal}>
            <div className={styles.title}>Переименовать</div>
            <Input
              value={input.value}
              type="text"
              placeholder="Новое имя листа"
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              isError={input.isError}
              validError={input.validError}
              isActive={input.isActive}
            />

            <div className={styles.buttons}>
              <Button onClick={onClose} text="Отмена" />
              <Button text="Переименовать" />
            </div>
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
