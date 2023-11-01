import React from 'react'
import './App.css';
import  { ChartComponent, PriceControl, HintSection, SignalsSection } from './ChartComponents';
import NavBar from './InterfaceComponents/navbar';

const Dashboard = ({sessionID}) => {
  return (
    <div className="Dashboard">
      <NavBar round={1} period={1} sessionId={sessionID}/>
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
  )
}

export default Dashboard