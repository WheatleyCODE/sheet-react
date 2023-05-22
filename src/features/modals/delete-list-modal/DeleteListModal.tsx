import { FC } from 'react';
import styles from './DeleteListModal.module.css';
import { Backdrop, Button, Modal, Portal } from 'shared/ui';

interface IDeleteListModalProps {
  deleteList: () => Promise<void>;
  onClose: () => void;
}

export const DeleteListModal: FC<IDeleteListModalProps> = ({ deleteList, onClose }) => {
  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <div className={styles.delete_modal}>
            <div className={styles.title}>Удалить</div>
            <div>
              Удалить этот лист? <div className={styles.list_name}>Лист 1</div>
            </div>
            <div className={styles.buttons}>
              <Button onClick={onClose} text="Отмена" />
              <Button text="Удалить" />
            </div>
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
