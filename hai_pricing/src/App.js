import './App.css';
import  { ChartComponent, PriceControl, HintSection, SignalsSection } from './ChartComponents';



function App() {
  return (
<div className="App">
    <h1>Pricing Strategy Game - Round: 1, Period: 8</h1>
    
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

  );
}

export default App;
