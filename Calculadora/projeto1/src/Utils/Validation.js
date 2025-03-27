//boolean
export const isValidDate = (day, month, year) => {

    if (day?.length !== 2 || month?.length !== 2 || year?.length !== 4) {
      return false;
    }
  
    //string -> int na base decimal
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
  
    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    if (d < 1 || d > 31) return false;
    if (m < 1 || m > 12) return false;
    if (y < 1900 || y > new Date().getFullYear()) return false;
  
    // checks if the month has 30 days
    const monthsWith30Days = [4, 6, 9, 11];
    if (monthsWith30Days.includes(m) && d > 30) return false;
  
    //anos bissextos
    if (m === 2) {
      const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      if (d > (isLeapYear ? 29 : 28)) return false;
    }
  
//verify if the date is in the future
    const inputDate = new Date(y, m - 1, d);
    const today = new Date();
    if (inputDate > today) return false;
  
    return true;
  };