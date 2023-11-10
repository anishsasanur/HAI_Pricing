import React, {useState} from 'react';
import './App.css';
import  { ChartComponent, PriceControl, HintSection, SignalsSection } from './ChartComponents';
import NavBar from './InterfaceComponents/navbar';
import {pushPrices, pushDemands, pushProfits, pushTimerForPrices, pushTimerForHints} from './firebaseDB.js'

const Dashboard = ({sessionID}) => {
  const [p1Price, setP1Price] = useState(500); // assuming 500 is the default value for both sliders
  const [p2Price, setP2Price] = useState(500);
  const [profitData, setProfitData] = useState({
    labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
    datasets: [{
      label: 'Profit',
      data: [1500000, 2000000, 2500000, 2700000, 3000000, 3200000, 3500000], // initial profit data
      borderColor: 'teal',
      fill: false
    }]
  });
  const [pricesData, setPricesData] = useState({
    labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
    datasets: [
      {
        label: 'P1',
        data: [100, 300, 400, 600, 750, 800, 850], // initial data
        borderColor: 'blue',
        fill: false
      },
      {
        label: 'P2',
        data: [150, 350, 450, 650, 700, 750, 900], // initial data
        borderColor: 'purple',
        fill: false
      }
    ]
  });
  const [demandData, setDemandData] = useState({
    labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
    datasets: [
      {
        label: 'Demand P1',
        data: [2800, 2700, 2600, 2550, 2500, 2450, 2400], // initial demand data for Product 1
        borderColor: 'green',
        fill: false
      },
      {
        label: 'Demand P2',
        data: [2750, 2650, 2575, 2525, 2475, 2435, 2385], // initial demand data for Product 2
        borderColor: 'orange',
        fill: false
      }
    ]
  });  
  
  
  
  
  function handleSetPrice(newP1Price, newP2Price) {
    setP1Price(newP1Price);
    setP2Price(newP2Price);
    const newP1Data = pricesData.datasets[0].data.slice(); // create a copy of the current data
    newP1Data.unshift(p1Price); // add the new price to the beginning
    newP1Data.pop(); // remove the last price
    
    const newP2Data = pricesData.datasets[1].data.slice(); // create a copy of the current data
    newP2Data.unshift(p2Price); // add the new price to the beginning
    newP2Data.pop(); // remove the last price
      
    setPricesData(prevState => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: newP1Data
        },
        {
          ...prevState.datasets[1],
          data: newP2Data
        }
      ]
      
    }));
    const newProfitData = [...profitData.datasets[0].data];  // create a copy of the existing profit data
    const dummyProfitValue = (p1Price + p2Price) * 1000;  // Dummy equation using the set prices
    newProfitData.unshift(dummyProfitValue);  // add the new profit to the front
      
    setProfitData(prevState => ({
      ...prevState,
      datasets: [{
        ...prevState.datasets[0],
        data: newProfitData
      }]
    }));

    // For Product 1
    const newDemandDataP1 = demandData.datasets[0].data.slice(0, -1);  // remove the last demand value
    const dummyDemandValueP1 = Math.max(3000 - p1Price, 1000);  // Dummy demand equation for product 1
    newDemandDataP1.unshift(dummyDemandValueP1);  // add the new demand to the front

    // For Product 2
    const newDemandDataP2 = demandData.datasets[1].data.slice(0, -1);  // remove the last demand value
    const dummyDemandValueP2 = Math.max(3000 - p2Price, 1000);  // Dummy demand equation for product 2
    newDemandDataP2.unshift(dummyDemandValueP2);  // add the new demand to the front

    setDemandData(prevState => ({
        ...prevState,
        datasets: [
            {
                ...prevState.datasets[0],
                data: newDemandDataP1
            },
            {
                ...prevState.datasets[1],
                data: newDemandDataP2
            }
        ]
    }));
    pushPrices(sessionID, newP1Price, newP2Price);
    pushTimerForPrices(sessionID)
    //pushProfits(sessionID, newProfitData);
    pushDemands(sessionID, dummyDemandValueP2, dummyDemandValueP2)

  }

  function handleHint() {
    pushTimerForHints(sessionID)
    return
  }


  return (
    <div className="Dashboard">
      <NavBar round={1} period={1} sessionId={sessionID}/>
      <div className="chartContainer">
        <ChartComponent         
        pricesData={pricesData}
        profitData={profitData}
        sessionID= {sessionID}
        demandData={demandData} 
/>
      </div>
      
      <div className="controlsContainer">
          <div className="priceControl">
            <PriceControl 
              handleSetPrice={handleSetPrice} 
              p1Price={p1Price} 
              setP1Price={setP1Price} 
              p2Price={p2Price} 
              setP2Price={setP2Price} 
            />         
             </div>
          
          <div className="hintsContainer">
            <HintSection handleHint={handleHint}/>
          </div>
          
          <div className="signalsContainer">
            <SignalsSection/>
          </div>
      </div>
    </div>
  )
}

export default Dashboard