import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';  // Assuming you're using line charts
import './styles.css';
import Chart from 'chart.js/auto';
import {Button, Slider, Typography} from '@mui/material';
import {pushPrices, pushDemands, pushProfits} from '../firebaseDB.js'


// 5 State Variables
// Round Specific Values: p1Price, p2oPrice, p1Demand, p2Demand, Profit

// State variable for sessionID

function handleSetPrice() {
  //pushPrices(sessionID, p1Price, p2Price)
  //pushDemands(sessionID, p1Demand, p2Demand)
  //pushProfits(sessionID, p2Demand, p2Demand)
}

function ChartComponent({ pricesData, profitData, demandData, sessionID}) {
    

      const options = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };

    
  return (
    <div className="chartContainer">
        <div className="chartWrapper">
            <Line data={pricesData} options={options} />
        </div>
        <div className="chartWrapper">
            <Line data={profitData} options={options} />
        </div>
        <div className="chartWrapper">
            <Line data={demandData} options={options} />
        </div>
    </div>
  );
}
function PriceControl({ handleSetPrice }) {
  const [sliderValueP1, setSliderValueP1] = useState(500);
  const [sliderValueP2, setSliderValueP2] = useState(500);
  
  function updatePrices() {
    handleSetPrice(sliderValueP1, sliderValueP2);
}

    return (
    <div className="price-control">
      <Typography variant="h6" component="h2" className="price-display">
        Product 1
      </Typography>
        <Slider
    value={sliderValueP1}
    onChange={(event, newValue) => setSliderValueP1(newValue)}
    aria-label="P1 Price"
    valueLabelDisplay="auto"
    step={10}
    min={0}
    max={1000}
  />
      <Typography variant="h6" component="h2" className="price-display">
        Product 2
      </Typography>

  <Slider
    value={sliderValueP2}
    onChange={(event, newValue) => setSliderValueP2(newValue)}
    aria-label="P2 Price"
    valueLabelDisplay="auto"
    step={10}
    min={0}
    max={1000}
  />
    <Button variant="contained" onClick={updatePrices}>Set Prices</Button>
    </div>
  );
}
function HintSection() {
  return (
    <div className="hint-section">
      <Typography variant="subtitle1" component="h2">
        You have the option to click on Hint for AI generated advice
      </Typography>
      <Button variant="contained">Hint</Button>
    </div>
  );
}
function SignalsSection() {
  return (
    <div className="signals-section">
      <div>
        <span className="down-arrow">⬇️</span>
        <Typography variant="subtitle1" component="h2">
          The demand for Product 1 will be lower.
        </Typography>
      </div>
      <div>
        <span className="up-arrow">⬆️</span>
        <Typography variant="subtitle1" component="h2">
          The demand for Product 2 will be higher.
        </Typography>
      </div>
    </div>
  );
}
export { ChartComponent, PriceControl, HintSection, SignalsSection };
