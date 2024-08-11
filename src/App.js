import logo from './logo.svg';
import './App.css';
import InterestRateChart from './Components/InterestRateChart';
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomSlider from './Components/CustomSlider';
function App() {

  return (
    <div className="bg-slate-50">
  <InterestRateChart/>
    
     
    </div>
  );
}

export default App;
