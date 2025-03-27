//imports
import { useState } from 'react';
import './App.css';
import DateInput from './Components/DateInput';
import Result from './Components/Result';
import Button from './Components/Button';
import { isValidDate } from './Utils/Validation';

//function app
function App() {

  //states that can be changed -> it starts empty
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  //function calculate
  const calculate = () => {

    //if there's no day, month, year or the date is not valid, setIsInvalid becomes true and age is still null and that is the return, nothing else happens
    if (!day || !month || !year || !isValidDate(day, month, year)) {
      setIsInvalid(true);
      setAge(null);
      return;
    }

    //if nothing went wrong, it the setIsInvalid is false
    setIsInvalid(false);

    //set birth
    //month starts at 0
    const birth = new Date(year, month - 1, day);
    //gets today's date -> () is empty, it means that it's gonna get the current date
    const today = new Date();

    //we use "let" because we might have to change the value later, and cont does not allow that
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    //if days are negative, you need to "borrow" from the last month
    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      //gets the last day of the last month
      days += lastMonth.getDate();
      months--;
    }

    //if months are negative, you need to "borrow" from the last year
    if (months < 0) {
      months += 12;
      years--;
    }

    setAge({ years, months, days });
  };

  //what we'll see
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

      <div className="line"></div>

      <Button onClick={calculate} />
      
      <Result age={age} />
    </div>
  );
}

export default App;