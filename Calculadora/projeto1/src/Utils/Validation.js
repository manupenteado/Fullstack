export const isValidDate = (day, month, year) => {
    if (month.length !== 2 || isNaN(month)) return false;
    
    const d = Number(day);
    const m = Number(month); 
    const y = Number(year);
  
    if (isNaN(d) || isNaN(y)) return false;
    if (d < 1 || d > 31) return false;
    if (m < 1 || m > 12) return false;
    if (y < 1000 || y > new Date().getFullYear()) return false;
  
    const monthsWith30Days = [4, 6, 9, 11];
    if (monthsWith30Days.includes(m) && d > 30) return false;
  
    if (m === 2) {
      const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      if (d > (isLeapYear ? 29 : 28)) return false;
    }
  
    const inputDate = new Date(y, m - 1, d);
    const today = new Date();
    if (inputDate > today) return false;
  
    return true;
  };