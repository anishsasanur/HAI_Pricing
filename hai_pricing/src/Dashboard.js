import React, {useState, useEffect} from 'react';
import './App.css';
import  { ChartComponent, PriceControl, HintSection, SignalsSection } from './ChartComponents';
import NavBar from './InterfaceComponents/navbar';
import {pushPrices, pushDemands, pushProfits, pushTimerForPrices, pushTimerForHints} from './firebaseDB.js'
import {s1, s2, s1g, s2g, q1, q2, revenue, probabilityA} from './Formulas/formulas.js'
import {parseCSV, fetchCSV} from './handleCSVs/handleCSVs.js'
import {alphas, betas, signals, tips, a_gammas, b_gammas, hints} from './App.js'


const Dashboard = ({sessionID}) => {
  const [p1Price, setP1Price] = useState(500); // assuming 500 is the default value for both sliders
  const [p2Price, setP2Price] = useState(500);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [periodNumber, setPeriodNumber] = useState(1);
  const [currentHint, setCurrentHint] = useState(''); // Store the current hint to display
  const [showHint, setShowHint] = useState(false); // Control the visibility of the hint


  let M = 1000
  let seed = Math.floor(Math.random() * 1961);

  //console.log(alphas[10*((roundNumber)-1) + ((periodNumber)-1)])

  const [profitData, setProfitData] = useState({
    labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
    datasets: [{
      label: 'Revenue',
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
    let g;
    if (sessionID%2 === 0 ) {
      g = a_gammas[seed + 10*((roundNumber)-1) + ((periodNumber)-1)]['"x"']
      console.log(1, g)
    }
    else {
      g = b_gammas[seed + 10*((roundNumber)-1) + ((periodNumber)-1)]['"x"']
      console.log(2, g)
    }
    let demandValueP1 = s1g(newP1Price, newP2Price, g)
    let demandValueP2 = s2g(newP1Price, newP2Price, g)
    let quantity_1 = q1(newP1Price, newP2Price, g)
    let quantity_2 = q2(newP1Price, newP2Price, g)
    let rev = revenue(newP1Price, newP2Price, g)

    console.log(newP1Price, newP2Price, quantity_1, quantity_2, demandValueP1, demandValueP2, rev, g)

  
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
          data: [...prevProfitData.datasets[0].data, rev].slice(-10)
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
            data: [...prevDemandData.datasets[0].data, demandValueP1].slice(-10)
          },
          {
            ...prevDemandData.datasets[1],
            data: [...prevDemandData.datasets[1].data, demandValueP2].slice(-10)
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
    pushProfits(sessionID, rev);
    pushDemands(sessionID, demandValueP1, demandValueP2);
  }
  
  
  const [hintTimeoutId, setHintTimeoutId] = useState(null);

  function handleHint() {
    if (hintTimeoutId) {
      clearTimeout(hintTimeoutId); // Clear any existing timeout
    }
  
    // Pick a random hint from the imported hints array
    const randomIndex = Math.floor(Math.random() * hints.length);
    const randomHintObject = hints[randomIndex];
  
    // Assuming you want to display the 'tip_HiGen' property as the hint
    const randomHint = randomHintObject.tip_HiGen;
  
    setCurrentHint(randomHint);
    setShowHint(true);
  
    // Set a timeout to hide the hint after 30 seconds and save the timeout id
    const newTimeoutId = setTimeout(() => {
      setShowHint(false);
      setCurrentHint(''); // Clear the current hint
    }, 30000);
  
    setHintTimeoutId(newTimeoutId);
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
    <HintSection handleHint={handleHint} currentHint={currentHint} showHint={showHint} />
  </div>


          
          <div className="signalsContainer">
            <SignalsSection/>
          </div>
      </div>
    </div>
  )
}

export default Dashboard