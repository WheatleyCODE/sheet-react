import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rootActions } from 'app/redux/rootActions';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(rootActions, dispatch);
};
