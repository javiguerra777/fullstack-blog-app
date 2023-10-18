import React, { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { StyledErrorWrapper } from '../styles/StyledError';
import { useAppDispatch } from '../../../hook';
import { clearSignInError } from '../../../store/UserSlice';

export default function SignUpErrorNotification() {
  const dispatch = useAppDispatch();
  const closeThis = useCallback(() => {
    dispatch(clearSignInError());
  }, [dispatch]);
  return (
    <StyledErrorWrapper>
      <div className="error-container">
        <p>Hi</p>
        <button type="button" onClick={closeThis}>
          <AiOutlineClose />
        </button>
      </div>
    </StyledErrorWrapper>
  );
}
