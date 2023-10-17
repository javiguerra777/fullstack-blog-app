import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../hook';

export default function UseGetStoreUser() {
  const user = useAppSelector((state) => state.user, shallowEqual);
  return user;
}
