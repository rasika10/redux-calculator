// src/components/Button.jsx
import React from 'react';

const Button = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className} ` }
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default React.memo(Button);
