import { useState } from 'react';
import './App.css';

function Calculator() {

  //defining const that uses state
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Ajuste para meses/dias negativos
    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="calculator">

        <div className="input-group">

          <div className="input-field">
            <label>DAY</label>
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
            />
          </div>
          
          <div className="input-field">
            <label>MONTH</label>
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
            />
          </div>
          
          <div className="input-field">
            <label>YEAR</label>
            <input
              type="number"
              min="1000"
              max={new Date().getFullYear()}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
            />
          </div>
        </div>
  
        <div className="calculate-button">
          <button 
            onClick={calculateAge}
            className="purple-circle">
          </button>
        </div>
  
      <div className="separator"></div>
  
        <div className="result">

          <p><span>{age ? age.years: "--"}</span>
          <span> years</span></p>

          <p><span>{age ? age.months: "--"}</span>
          <span> months</span></p>       

          <p><span>{age ? age.days: "--"}</span>
          <span> days</span></p>   

        </div>
    </div>
  );
}

export default Calculator;