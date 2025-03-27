import React from 'react';

//parameters
function DateInput({day, month, year, setDay, setMonth, setYear, isInvalid}) {

  //limits the day in case theres more then two digits and set the day
  const handleDayChange = (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      value = value.slice(0, 2)
    };
    setDay(value);
  };

  //limits the month in case theres more then two digits and set the month
  const handleMonthChange = (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      value = value.slice(0, 2)
    };
    setMonth(value);
  };

  //limits the year in case theres more then four digits and set the year
  const handleYearChange = (e) => {
    let value = e.target.value;
    if (value.length > 4) {
      value = value.slice(0, 4)
    };
    setYear(value);
  };

//in case the input is incomplete, it fills automatically the beginning 
  const changeBlur = (field, value) => {
    if (field === 'day' && value && value.length < 2) {
      setDay(value.padStart(2, '0'));
    }
    if (field === 'month' && value && value.length < 2) {
      setMonth(value.padStart(2, '0'));
    }
    if (field === 'year' && value && value.length < 4) {
      setYear(value.padStart(4, '190'));
    }
  };


  //what we see
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
          onBlur={() => changeBlur('day', day)}
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
          onBlur={() => changeBlur('month', month)}
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
          onBlur={() => changeBlur('year', year)}
          placeholder="YYYY"
          className={isInvalid ? 'invalid-input' : ''}
        />
      </div>
    
    </div>
  );
}

export default DateInput;