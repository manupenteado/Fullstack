//boolean
export const isValidDate = (day, month, year) => {

    if (day?.length !== 2 || month?.length !== 2 || year?.length !== 4) {
      return false;
    }
  
    //string -> int na base decimal
    const dayI = parseInt(day, 10);
    const monthI = parseInt(month, 10);
    const yearI = parseInt(year, 10);
  
    //verify if theres something in the input
    if (isNaN(dayI) || isNaN(monthI) || isNaN(yearI)){
        return false;
      }
      
    //checks the limit of the days
    if (dayI < 1 || dayI > 31){
        return false;
      }
    //checks the limit of the month
    if (monthI < 1 || monthI > 12){
        return false;
      }
    //checks the limit of the years
    if (yearI < 1900 || yearI > new Date().getFullYear()){
        return false;
      }
  
    // checks if the month has 30 days
    const month30days = [4, 6, 9, 11];
    if (month30days.includes(monthI) && dayI > 30){
        return false;
      }
  
    //checks leap year
    if (monthI === 2) {
      const leapYear = (yearI % 4 === 0 && yearI % 100 !== 0) || yearI % 400 === 0;
      if (dayI > (leapYear ? 29 : 28)){
        return false;
      }
    }
  
    //verify if the date is in the future
    const inputDate = new Date(yearI, monthI - 1, dayI);
    const today = new Date();
    if (inputDate > today){
        return false;
      }
  
    //if it passes all these tests, it returns "true" to isvaliddate
    return true;
  };