import { useDispatch } from 'react-redux';
import { TypedDispatch } from 'app/redux/store';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
