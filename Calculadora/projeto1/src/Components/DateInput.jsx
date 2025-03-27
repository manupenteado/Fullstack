import React from 'react';

function DateInput({ day, month, year, setDay, setMonth, setYear, isInvalid }) {
  const handleDayChange = (e) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(0, 2);
    setDay(value);
  };

  const handleMonthChange = (e) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(0, 2);
    setMonth(value);
  };

  const handleYearChange = (e) => {
    let value = e.target.value;
    if (value.length > 4) value = value.slice(0, 4);
    setYear(value);
  };

  const handleBlur = (field, value) => {
    if (field === 'day' && value && value.length < 2) {
      setDay(value.padStart(2, '0'));
    }
    if (field === 'month' && value && value.length < 2) {
      setMonth(value.padStart(2, '0'));
    }
    if (field === 'year' && value && value.length < 4) {
      setYear(value.padStart(4, '190')); // Assume século 20 se incompleto
    }
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
          onChange={handleDayChange}
          onBlur={() => handleBlur('day', day)}
          placeholder="DD"
          className={isInvalid ? 'invalid-input' : ''}
        />

        {isInvalid && (<div className="error">Must be a valid date</div>)}
      </div>
      
      <div className="input-field">
        <label className={isInvalid ? 'invalid-label' : ''}>MONTH</label>
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={handleMonthChange}
          onBlur={() => handleBlur('month', month)}
          placeholder="MM"
          className={isInvalid ? 'invalid-input' : ''}
        />
      </div>
      
      <div className="input-field">
        <label className={isInvalid ? 'invalid-label' : ''}>YEAR</label>
        <input
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          value={year}
          onChange={handleYearChange}
          onBlur={() => handleBlur('year', year)}
          placeholder="YYYY"
          className={isInvalid ? 'invalid-input' : ''}
        />
      </div>
      
      
    </div>
  );
}

export default DateInput;