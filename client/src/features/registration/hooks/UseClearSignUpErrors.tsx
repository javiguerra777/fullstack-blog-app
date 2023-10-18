import { useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../../hook';
import { clearSignInError } from '../../../store/UserSlice';

export default function UseClearSignUpErrors() {
  const dispatch = useAppDispatch();
  const cbFunc = useCallback(() => {
    dispatch(clearSignInError());
    return () => {
      dispatch(clearSignInError());
    };
  }, [dispatch]);
  useEffect(() => {
    cbFunc();
  }, [cbFunc]);
}
