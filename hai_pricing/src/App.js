import './App.css';
import Login from './InterfaceComponents/Login';
import Dashboard from './Dashboard';
import { useState } from 'react';
import {createUser} from './firebaseDB';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from 'react-router-dom';
import React from 'react';
import {s1, s2, s1g, s2g, q1, q2, revenue, probabilityA} from './Formulas/formulas.js'
import {parseCSV, fetchCSV} from './handleCSVs/handleCSVs.js'

let alphas, betas, signals, tips, a_gammas, b_gammas, hints;

await fetchCSV("/HAI_Pricing/Data/alphas.csv").then(parsedData => {
  alphas = parsedData
});
await fetchCSV("/HAI_Pricing/Data/betas.csv").then(parsedData => {
  betas = parsedData
});
await fetchCSV("/HAI_Pricing/Data/signals.csv").then(parsedData => {
  signals = parsedData
});
await fetchCSV("/HAI_Pricing/Data/tips.csv").then(parsedData => {
  tips = parsedData
});
await fetchCSV("/HAI_Pricing/Data/a_gammas.csv").then(parsedData => {
  a_gammas = parsedData
});
await fetchCSV("/HAI_Pricing/Data/b_gammas.csv").then(parsedData => {
 b_gammas = parsedData
});
await fetchCSV("/HAI_Pricing/Data/tips.csv").then(parsedData => {
  hints = parsedData
 });


 

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [sessionID, setSessionID] = useState(0);

  const handleLogin = (fullName, sessionId) => {
    if (fullName.trim() !== '' && sessionId.trim() !== '') {
      setIsLoggedIn(true);
      createUser(sessionId, fullName)
    } else {
      alert('Login failed');
    }
  };

  return (
  <div>
    {isLoggedIn ? <Dashboard sessionID={sessionID}/> : <Login onLogin={handleLogin} setSessionID={setSessionID}/>}
  </div>

  );
}

export default App;
export {alphas, betas, signals, tips, a_gammas, b_gammas, hints}
