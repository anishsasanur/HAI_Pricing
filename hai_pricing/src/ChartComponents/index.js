import React from 'react';
import { Line } from 'react-chartjs-2';  // Assuming you're using line charts
import './styles.css';
import Chart from 'chart.js/auto';
import {Button, Slider, Typography} from '@mui/material';


function ChartComponent(props) {
    const pricesData = {
        labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
        datasets: [
          {
            label: 'P1',
            data: [100, 300, 400, 600, 750, 800, 850], // example data
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'P2',
            data: [150, 350, 450, 650, 700, 750, 900], // example data
            borderColor: 'purple',
            fill: false
          }
          // Add more datasets as needed
        ]
      };
      const options = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
      const profitData = {
        labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
        datasets: [{
            label: 'Profit',
            data: [1500000, 2000000, 2500000, 2700000, 3000000, 3200000, 3500000],
            borderColor: 'teal',
            fill: false
        }]
    };
    
    const demandData = {
        labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y1 Q5', 'Y1 Q6', 'Y1 Q7'],
        datasets: [
            {
                label: 'D1',
                data: [1000, 1500, 2000, 2300, 2500, 2700, 3000],
                borderColor: 'gray',
                fill: false
            },
            {
                label: 'D2',
                data: [1100, 1600, 2050, 2350, 2550, 2750, 3100],
                borderColor: 'lightblue',
                fill: false
            }
        ]
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
function PriceControl({ product, price }) {
  return (
    <div className="price-control">
      <Typography variant="h6" component="h2" className="price-display">
        {product} Price: ${price}
      </Typography>
      <Slider defaultValue={500} aria-label="Default" valueLabelDisplay="auto" step = {10} min={0} max={1000}/>
      <Button variant="contained">Set Prices</Button>
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
