import React from 'react';

function Button({onClick}) {
  return (
    <div className="calculate-button">
      <button 
        onClick={onClick}
        className="purple-circle">
          <img 
          src="/icon-arrow.svg" 
          className="arrow"
        />
      </button>
    </div>
  );
}

export default Button;