import { FC } from 'react';
import { Spinner } from 'entities/loader';
import { Backdrop, Modal, Portal } from 'shared/ui';
import { noop } from 'shared/utils';
import styles from './LoaderModal.module.css';

interface ILoaderModalProps {
  a?: () => void;
}

export const LoaderModal: FC<ILoaderModalProps> = () => {
  return (
    <Portal>
      <Backdrop onClose={noop}>
        <Modal isHideCloseButton onClose={noop}>
          <div className={styles.loader_modal}>
            <Spinner className={styles.loader} text="Подготовка базы данных..." />
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
