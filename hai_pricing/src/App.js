import './App.css';
import  { ChartComponent, PriceControl, HintSection, SignalsSection } from './ChartComponents';
import NavBar from './InterfaceComponents/navbar';
import Login from './InterfaceComponents/Login';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from 'react-router-dom';
import React from 'react';



function App() {

  const round = 1;
  const period = 2;
  const sessionId = '0000000000';

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = (fullName, sessionId) => {
  //   // Here you would verify the user's credentials, typically by sending them to a server.
  //   // This example assumes that any non-empty name and sessionId is valid.
  //   if (fullName.trim() !== '' && sessionId.trim() !== '') {
  //     setIsLoggedIn(true);
  //   } else {
  //     alert('Login failed');
  //   }
  // };


  return (
  <div>
    {/* <div className="Login">
      <Login />
    </div> */}
    <div className="Dashboard">
      <NavBar round={round} period={period} sessionId={sessionId}/>
      <div className="chartContainer">
          <ChartComponent />  
      </div>
      
      <div className="controlsContainer">
          <div className="priceControl">
              <PriceControl/>
          </div>
          
          <div className="hintsContainer">
            <HintSection/>
          </div>
          
          <div className="signalsContainer">
            <SignalsSection/>
          </div>
      </div>
    </div>
  </div>

  );
}

export default App;
