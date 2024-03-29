import React, { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '../../../hook';
import { clearError } from '../../../store/UserSlice';
import { StyledErrorWrapper } from '../styles/StyledError';

export default function LoginErrorNotification() {
  const dispatch = useAppDispatch();
  const closeThis = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);
  return (
    <StyledErrorWrapper>
      <div className="error-container">
        <p>Error Logging into account</p>
        <button type="button" onClick={closeThis}>
          <AiOutlineClose />
        </button>
      </div>
    </StyledErrorWrapper>
  );
}
