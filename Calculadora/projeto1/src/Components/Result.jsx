import React from 'react';

function Result({age}) {
  return (
    <div className="result">
      <p><span>{age ? age.years : "--"}</span>
      <span> years</span></p>

      <p><span>{age ? age.months : "--"}</span>
      <span> months</span></p>       

      <p><span>{age ? age.days : "--"}</span>
      <span> days</span></p>   
    </div>
  );
}

export default Result;