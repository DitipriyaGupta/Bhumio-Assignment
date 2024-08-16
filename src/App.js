import logo from "./logo.svg";
import "./App.css";
import InterestRateChart from "./Components/InterestRateChart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomSlider from "./Components/CustomSlider";
function App() {
  return (
    <div className="h-screen bg-[#e9e7e71a]">
      <InterestRateChart />
    </div>
  );
}

export default App;
