import logo from './logo.svg';
import './App.css';
import InterestRateChart from './Components/InterestRateChart';
import axios from "axios";
import React, { useEffect, useState } from "react";
function App() {
  const[rate,setRate]=useState([])
    const getData=async()=>{
    const apiData=await axios.get("/oah-api/rates/rate-checker?price=200000&loan_amount=180000&minfico=700&maxfico=719&state=AL&rate_structure=fixed&loan_term=30&loan_type=conf&arm_type=5-1")
    const response=apiData.data
   setRate(response.data)

    }
    useEffect(()=>{
getData();
    },[])
  return (
    <div className="App">
     <InterestRateChart rate={rate}/>
    </div>
  );
}

export default App;
