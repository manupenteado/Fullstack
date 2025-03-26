/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//importing App.jsx -> in order to really get things from there, you need to export
import App from './App.jsx'

//inside root, we want to render App
createRoot(document.getElementById('root')).render(
  //it does everything twice to make sure it's working
  <StrictMode>
    <App />
  </StrictMode>,
)*/

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import Calculator from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Calculator/>
  </StrictMode>
);
