import { FC } from 'react';
import { Backdrop, Button, Input, Modal, Portal } from 'shared/ui';
import { useValidInput } from 'shared';
import styles from './RenameListModal.module.css';

interface IRenameListModalProps {
  renameList: (id: string, name: string) => void;
  listId: string;
  onClose: () => void;
}

export const RenameListModal: FC<IRenameListModalProps> = ({ renameList, listId, onClose }) => {
  const input = useValidInput('');

  const onSuccess = () => {
    renameList(listId, input.value);
    onClose();
  };

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
              <Button onClick={onSuccess} text="Переименовать" />
            </div>
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
