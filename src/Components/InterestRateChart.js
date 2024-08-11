import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "@mui/material";
import RequiredDataProvider, { useRequiredDataContext } from "./Context/RequiredDataProvider";
import Dropdown from "./Dropdown";
// const chartData = {
//   series: [  
//     {
//       data: [21, 22, 10],
//     },
//   ],
//   options: {
//     chart: {
//       height: 350,
//       type: "bar",
//       toolbar: { show: false },
//     },
//     grid: {
//       show: false,
//     },
//     xaxis: {
//       axisBorder: {
//         show: true,
//         color: "#78909C",
//         height: 1,
//         width: "100%",
//         offsetX: 0,
//         offsetY: 0,
//       },
//       // Keep only X-axis border, hide others
//       axisTicks: {
//         show: false,
//       },
//       tickPlacement: "on",
//     },
//     colors: ["#64A33F"],
//     plotOptions: {
//       bar: {
//         columnWidth: "15%",
//         distributed: true,
//       },
//     },

//     legend: {
//       show: false,
//     },
//   },
// };

const InterestRateChart = ({ rate }) => {
  const{states,RateStructure,LoanTerm,LoanType}=useRequiredDataContext()
  const[selectedState,setSelectedState]=useState(RateStructure[0])
  return (
    <>
    <Dropdown value={selectedState} options={RateStructure}/>
      <Card
        className="max-w-sm"
        sx={{ borderRadius: 3, width: 800, height: 400 ,"boxShadow":"2px"}}
      >
        <ReactApexChart
          options={{
            chart: {
              height: 350,
              type: "bar",
              toolbar: { show: false },
            },
            xaxis: {
              labels: {
                rotate: -90,
              },
              tickPlacement: "off",
              categories: Object.entries(rate)
                .sort()
                .map(([key, value]) => key),
            },
            yaxis: {
              title: {
                text: "Number of lenders offering rate",
              },
            },
            colors: ["#64A33F"],
           
            dataLabels:{
              enabled:false
            },
            plotOptions: {
              bar: {
                columnWidth: "50%",
                distributed: false,
              },
            },
          }}
          series={[
            {
              data: Object.entries(rate).map(([key, value]) => value),
            },
          ]}
          type="bar"
          height={"100%"}
        />
      </Card>
      
      
    </>
  );
};

export default InterestRateChart;
