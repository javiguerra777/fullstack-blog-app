import React from 'react';
import styled from 'styled-components';

type NotificationProps = {
  message: string;
  clearMessage: () => void;
};

const NotificationWrapper = styled.section`
  background-color: lightgray;
  color: black;
  width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em 0 1em;
  border-radius: 1em;
  .clear-notification {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
function Notification({ message, clearMessage }: NotificationProps) {
  return (
    <NotificationWrapper>
      <p>{message}</p>
      <section className="clear-notification-btn">
        <button
          type="button"
          className="clear-notification"
          onClick={clearMessage}
        >
          x
        </button>
      </section>
    </NotificationWrapper>
  );
}

export default Notification;
