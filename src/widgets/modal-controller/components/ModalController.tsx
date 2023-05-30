import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTypedSelector, useTypedDispatch, useActions } from 'shared';
import { DeleteListModal, LoaderModal, RenameListModal } from 'features';
import { modalsActions } from '../store/modalsSlice';
import { useParams } from 'react-router-dom';

export const ModalController: FC = () => {
  const { id } = useParams();
  const { deleteListModal, renameListModal, loaderModal } = useTypedSelector((state) => state.modals);
  const { removeList, renameList } = useActions();
  const dispatch = useTypedDispatch();

  const closeDeleteModal = () => {
    dispatch(modalsActions.changeDeleteList({ isShow: false, id: '' }));
  };

  const closeRenameModal = () => {
    dispatch(modalsActions.changeRenameList({ isShow: false, id: '' }));
  };

  const deleteListHandler = async (listId: string) => {
    if (!id) return;
    removeList({ id, listId });
  };

  const renameListHandler = async (listId: string, name: string) => {
    if (!id) return;
    renameList({ id, listId, name });
  };

  return (
    <AnimatePresence>
      {deleteListModal.isShow && (
        <DeleteListModal listId={deleteListModal.id} deleteList={deleteListHandler} onClose={closeDeleteModal} />
      )}
      {renameListModal.isShow && (
        <RenameListModal listId={renameListModal.id} renameList={renameListHandler} onClose={closeRenameModal} />
      )}
      {loaderModal.isShow && <LoaderModal />}
    </AnimatePresence>
  );
};
