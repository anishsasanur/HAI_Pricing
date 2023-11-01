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
