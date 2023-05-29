import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KVFactory, LocalStorageEngine, useActions } from 'shared';

export const useInitSheets = () => {
  const { id } = useParams();
  const { getSheets, createSheets, createTable } = useActions();

  useEffect(() => {
    if (!id) return;

    const init = async () => {
      const ls = KVFactory('sheets', new LocalStorageEngine());
      const isExists = await ls.get(id);

      if (isExists) {
        await getSheets({ id });
      } else {
        createSheets({ id });
        createTable({ tableId: id });
      }
    };

    init();
  }, []);
};
