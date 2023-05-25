import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTypedSelector, useTypedDispatch } from 'shared';
import { DeleteListModal, RenameListModal } from 'features';
import { modalsActions } from '../store/modalsSlice';

export const ModalController: FC = () => {
  const { deleteList, renameList } = useTypedSelector((state) => state.modals);
  const dispatch = useTypedDispatch();

  const closeDeleteModal = () => {
    dispatch(modalsActions.changeDeleteList({ isShow: false, id: '' }));
  };

  const closeRenameModal = () => {
    dispatch(modalsActions.changeRenameList({ isShow: false, id: '' }));
  };

  return (
    <AnimatePresence>
      {deleteList.isShow && <DeleteListModal deleteList={() => ({})} onClose={closeDeleteModal} />}
      {renameList.isShow && <RenameListModal renameList={() => ({})} onClose={closeRenameModal} />}
    </AnimatePresence>
  );
};
