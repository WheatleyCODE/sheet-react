import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { modalsActions } from '..';
import { DeleteListModal, RenameListModal } from 'features/index';

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
      {deleteList.isShow && <DeleteListModal onClose={closeDeleteModal} />}
      {renameList.isShow && <RenameListModal onClose={closeRenameModal} />}
    </AnimatePresence>
  );
};
