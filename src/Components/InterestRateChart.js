import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Card } from "@mui/material";
import RequiredDataProvider, {
  useRequiredDataContext,
} from "./Context/RequiredDataProvider";
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
import TextField from "@mui/material/TextField";
import CustomSlider from "./CustomSlider";
const InterestRateChart = () => {
  const { states, RateStructure, LoanTerm, LoanType } =
    useRequiredDataContext();
  const [rate, setRate] = useState({});
  const[selectedHousePrice,setSelectedHousePrice]=useState("200000")
  const [selectedState, setSelectedState] = useState(Object.values(states)[0]);
  const [selectedRateStructure, setSelectedRateStructure] = useState(
    Object.values(RateStructure)[0]
  );
  const [selectedLoanTerm, setSelectedLoanTerm] = useState(
    Object.values(LoanTerm)[0]
  );
  const [selectedLoanType, setSelectedLoanType] = useState(
    Object.values(LoanType)[0]
  );
  const[minValue,setMinValue]=useState(720)
  const[maxValue,setMaxValue]=useState(739)
  const handleStates = (e) => {
    setSelectedState(e.target.value);
  };
  const handleLoanTerm = (e) => {
    setSelectedLoanTerm(e.target.value);
  };
  const handleRateStructure = (e) => {
    setSelectedRateStructure(e.target.value);
  };
  const handleLoanType = (e) => {
    setSelectedLoanType(e.target.value);
  };
  const handleHousePrice=(e)=>{
    setSelectedHousePrice(e.target.value)
  }
  const handleRangeChange=(start,end)=>{
setMinValue(start)
setMaxValue(end)
  }

  const getData = async () => {
    const apiData = await axios.get(
      `/oah-api/rates/rate-checker?price=${selectedHousePrice}&loan_amount=180000&minfico=${minValue}&maxfico=${maxValue}&state=${selectedState}&rate_structure=${selectedRateStructure}&loan_term=${selectedLoanTerm}&loan_type=${selectedLoanType}&arm_type=5-1`
    );
    // const apiData = await axios.get(
    //   "/oah-api/rates/rate-checker?price=1000&loan_amount=900&minfico=700&maxfico=719&state=AZ&rate_structure=fixed&loan_term=30&loan_type=conf&arm_type=5-1"
    // );

    const response = apiData.data;
    setRate(response.data);
  };
  useEffect(() => {
    getData();
  }, [
    selectedState,
    selectedRateStructure,
    selectedLoanTerm,
    selectedLoanType,
    selectedHousePrice,
    minValue,
    maxValue
  ]);

  return (
    <Box>
         <><CustomSlider onRangeChange={handleRangeChange}/></> 
    <Box className="flex justify-center items-center">
      <TextField value={selectedHousePrice} onChange={handleHousePrice} id="outlined-basic"  variant="outlined" size="small" />
      <Dropdown
        value={selectedState}
        options={states}
        onChange={handleStates}
      />

      <Dropdown
        value={selectedRateStructure}
        options={RateStructure}
        onChange={handleRateStructure}
      />
      <Dropdown
        value={selectedLoanTerm}
        options={LoanTerm}
        onChange={handleLoanTerm}
      />
      <Dropdown
        value={selectedLoanType}
        options={LoanType}
        onChange={handleLoanType}
      />
      </Box>
      <Box className="h-screen mx-auto flex justify-center items-center" >
      <Card
        elevation={0}
       className="shadow-md h-[500px] w-[900px] border p-4 rounded-md"
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
              title: {
                text: "Interest rates for your situation",
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
            colors: ["#addc91"],

            dataLabels: {
              enabled: false,
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
              // name: Object.entries(rate).map(([key, value]) => key), 
              data: Object.entries(rate).map(([key, value]) => value),
            },
          ]}
          type="bar"
          height={"100%"}
        />
      </Card></Box>
    </Box>
  );
};

export default InterestRateChart;
