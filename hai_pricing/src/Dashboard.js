import React, {useState, useEffect} from 'react';
import './App.css';
import  { ChartComponent, PriceControl, HintSection, SignalsSection } from './ChartComponents';
import NavBar from './InterfaceComponents/navbar';
import {pushPrices, pushDemands, pushProfits, pushTimerForPrices, pushTimerForHints} from './firebaseDB.js'
import {s1, s2, s1g, s2g, q1, q2, revenue, probabilityA} from './Formulas/formulas.js'
import {parseCSV, fetchCSV} from './handleCSVs/handleCSVs.js'


const Dashboard = ({sessionID}) => {
  const [p1Price, setP1Price] = useState(500); // assuming 500 is the default value for both sliders
  const [p2Price, setP2Price] = useState(500);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [periodNumber, setPeriodNumber] = useState(1);

  fetchCSV("/HAI_Pricing/Data/alphas.csv").then(parsedData => {
    let alphas = parsedData
  });
  fetchCSV("/HAI_Pricing/Data/betas.csv").then(parsedData => {
    let betas = parsedData
  });
  fetchCSV("/HAI_Pricing/Data/signals.csv").then(parsedData => {
    let signals = parsedData
  });
  fetchCSV("/HAI_Pricing/Data/tips.csv").then(parsedData => {
    let tips = parsedData
  });
  fetchCSV("/HAI_Pricing/Data/a_gammas.csv").then(parsedData => {
    let a_gammas = parsedData
  });
  fetchCSV("/HAI_Pricing/Data/b_gammas.csv").then(parsedData => {
    let b_gammas = parsedData
  });

  const [profitData, setProfitData] = useState({
    labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
    datasets: [{
      label: 'Profit',
      data: [], // initial profit data
      borderColor: 'teal',
      fill: false
    }]
  });
  const [pricesData, setPricesData] = useState({
    labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7', 'Y1 Q8', 'Y1 Q9', 'Y1 Q10'],
    datasets: [
      {
        label: 'P1',
        data: [], // initial data
        borderColor: 'blue',
        fill: false
      },
      {
        label: 'P2',
        data: [], // initial data
        borderColor: 'purple',
        fill: false
      }
    ]
  });
  const [demandData, setDemandData] = useState({
    labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7', 'Y1 Q8', 'Y1 Q9', 'Y1 10'],
    datasets: [
      {
        label: 'Demand P1',
        data: [], // initial demand data for Product 1
        borderColor: 'green',
        fill: false
      },
      {
        label: 'Demand P2',
        data: [], // initial demand data for Product 2
        borderColor: 'orange',
        fill: false
      }
    ]
  });  
  function generateLabels(counter) {
    const currentYear = Math.ceil(counter / 10); // Calculate current year
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'];
    return quarters.map(quarter => `Y${currentYear} ${quarter}`);
  }
  useEffect(() => {
    if (updateCounter % 10 === 0 && updateCounter !== 0) {
      // Generate new labels based on the current value of updateCounter
      const newLabels = generateLabels(updateCounter);
  
      // Reset Prices Data with new labels and empty data
      setPricesData({
        labels: newLabels,
        datasets: [
          { label: 'P1', data: [], borderColor: 'blue', fill: false },
          { label: 'P2', data: [], borderColor: 'purple', fill: false }
        ]
      });
  
      // Reset Profit Data with new labels and empty data
      setProfitData({
        labels: newLabels,
        datasets: [{ label: 'Profit', data: [], borderColor: 'teal', fill: false }]
      });
  
      // Reset Demand Data with new labels and empty data
      setDemandData({
        labels: newLabels,
        datasets: [
          { label: 'Demand P1', data: [], borderColor: 'green', fill: false },
          { label: 'Demand P2', data: [], borderColor: 'orange', fill: false }
        ]
      });
    }
  }, [updateCounter]);
  
  
  
  
  
  function handleSetPrice(newP1Price, newP2Price) {
    // Update P1 and P2 prices
    setP1Price(newP1Price);
    setP2Price(newP2Price);
    const dummyProfitValue = (newP1Price + newP2Price) * 1000;  // Dummy calculation for profit
    const dummyDemandValueP1 = Math.max(3000 - newP1Price, 1000); // Dummy demand equation for product 1
    const dummyDemandValueP2 = Math.max(3000 - newP2Price, 1000); // Dummy demand equation for product 2

  
    // Increment the update counter and update the datasets
    setUpdateCounter(prevCounter => {
      const newCounter = prevCounter + 1;
  
      // Generate new labels based on the updated counter
      const newLabels = generateLabels(newCounter);
  
      // Update Prices Data with new labels and new prices
      setPricesData(prevData => ({
        ...prevData,
        labels: newLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newP1Price].slice(-10) // append new P1 price
          },
          {
            ...prevData.datasets[1],
            data: [...prevData.datasets[1].data, newP2Price].slice(-10) // append new P2 price
          }
        ]
      }));
  
      // Update Profit Data
      setProfitData(prevProfitData => ({
        ...prevProfitData,
        labels: newLabels,
        datasets: [{
          ...prevProfitData.datasets[0],
          data: [...prevProfitData.datasets[0].data, dummyProfitValue].slice(-10)
        }]
      }));
  
      // Update Demand Data
      // Assuming similar logic for demand data updates
      setDemandData(prevDemandData => ({
        ...prevDemandData,
        labels: newLabels,
        datasets: [
          {
            ...prevDemandData.datasets[0],
            data: [...prevDemandData.datasets[0].data, dummyDemandValueP1].slice(-10)
          },
          {
            ...prevDemandData.datasets[1],
            data: [...prevDemandData.datasets[1].data, dummyDemandValueP2].slice(-10)
          }
        ]
      }));
      setPeriodNumber(periodNumber + 1)
      if (periodNumber >= 10) {
        setRoundNumber(roundNumber + 1)
        setPeriodNumber(1)
      }
      return newCounter; // Return the new counter value
    });
  
    // Firebase-related calls
    pushPrices(sessionID, newP1Price, newP2Price);
    pushTimerForPrices(sessionID);
    // Uncomment if you need to push the new profit and demand data to Firebase
    pushProfits(sessionID, dummyProfitValue);
    pushDemands(sessionID, dummyDemandValueP1, dummyDemandValueP2);
  }
  
  function handleHint() {
    pushTimerForHints(sessionID)
    return
  }


  return (
    <div className="Dashboard">
      <NavBar round={roundNumber} period={periodNumber} sessionId={sessionID}/>
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