import React from 'react';

function DateInput({ day, month, year, setDay, setMonth, setYear, isInvalid }) {
  const handleMonthChange = (e) => {
    let value = e.target.value;

    if (value.length === 1 && value > 1) {
      value = value.padStart(2, '0');
    }
    setMonth(value);
  };

  return (
    <div className="input-group">
      <div className="input-field">
        <label className={isInvalid ? 'invalid-label' : ''}>DAY</label>
        <input
          type="number"
          min="1"
          max="31"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="DD"
          className={isInvalid ? 'invalid-input' : ''}
        />
        {isInvalid && <span className="error">Must be a valid date</span>}
      </div>
      
      <div className="input-field">
        <label className={isInvalid ? 'invalid-label' : ''}>MONTH</label>
        <input
          type="text"
          minLength="2"
          maxLength="2"
          value={month}
          onChange={handleMonthChange}
          placeholder="MM"
          className={isInvalid ? 'invalid-input' : ''}
        />
      </div>
      
      <div className="input-field">
        <label className={isInvalid ? 'invalid-label' : ''}>YEAR</label>
        <input
          type="number"
          min="1000"
          max={new Date().getFullYear()}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="YYYY"
          className={isInvalid ? 'invalid-input' : ''}
        />
      </div>
    </div>
  );
}

export default DateInput;