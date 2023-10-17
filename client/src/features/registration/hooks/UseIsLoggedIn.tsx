import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UseGetStoreUser from '../../../common/hooks/UseGetStoreUser';

export default function UseIsLoggedIn() {
  const navigate = useNavigate();
  const { loggedIn } = UseGetStoreUser();
  const cbFunc = useCallback(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [navigate, loggedIn]);
  useEffect(() => {
    cbFunc();
  }, [cbFunc]);
}
