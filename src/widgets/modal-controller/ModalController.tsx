import { FC, useState } from 'react';
import { Backdrop, Modal, Portal } from 'shared/ui';
import { AnimatePresence } from 'framer-motion';

export const ModalController: FC = () => {
  const [isShow, setIsShow] = useState(true); // ! Fix

  return (
    <AnimatePresence>
      {isShow && (
        <Portal>
          <Backdrop onClose={() => setIsShow(false)}>
            <Modal onClose={() => setIsShow(false)}>
              <h1>Modal Template</h1>
            </Modal>
          </Backdrop>
        </Portal>
      )}
    </AnimatePresence>
  );
};
