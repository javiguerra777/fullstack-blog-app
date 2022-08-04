import React from 'react';
import './animations.css';

function LoadingSpinner() {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default LoadingSpinner;
