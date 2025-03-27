import { useState } from 'react';
import './App.css';
import DateInput from './Components/DateInput';
import Result from './Components/Result';
import Button from './Components/Button';
import { isValidDate } from './Utils/Validation';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const calculateAge = () => {
    if (!day || !month || !year || !isValidDate(day, month, year)) {
      setIsInvalid(true);
      setAge(null);
      return;
    }

    setIsInvalid(false);
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

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
      <DateInput 
        day={day} 
        month={month} 
        year={year} 
        setDay={setDay} 
        setMonth={setMonth} 
        setYear={setYear}
        isInvalid={isInvalid}
      />

      <div className="divider-line"></div>

      
      <Button onClick={calculateAge} />
      
      <Result age={age} />
    </div>
  );
}

export default App;