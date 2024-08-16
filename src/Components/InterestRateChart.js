import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Card, Typography } from "@mui/material";
import RequiredDataProvider, {
  useRequiredDataContext,
} from "./Context/RequiredDataProvider";
import Dropdown from "./Dropdown";
import TextField from "@mui/material/TextField";
import CustomSlider from "./CustomSlider";
import CustomRadioComponent from "./CustomRadioComponent";
const InterestRateChart = () => {
  const { states, RateStructure, LoanTerm, LoanType, ArmType } =
    useRequiredDataContext();
  const [rate, setRate] = useState({});
  const [selectedHousePrice, setSelectedHousePrice] = useState("200000");
  const loanAmount = 180000;

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
  const [selectedARMType, setSelectedARMType] = useState(
    Object.values(ArmType)[0]
  );
  const [minValue, setMinValue] = useState(720);
  const [maxValue, setMaxValue] = useState(739);
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
  const handleHousePrice = (e) => {
    setSelectedHousePrice(e.target.value);
  };
  const formatHousePrice = () => {
    setSelectedHousePrice((prev) => Number(prev).toLocaleString());
  };
  const handleARMType = (e) => {
    setSelectedARMType(e.target.value);
  };
  const handleRangeChange = (start, end) => {
    setMinValue(start);
    setMaxValue(end);
  };

  const getData = async () => {
    const apiData = await axios.get(
      `/oah-api/rates/rate-checker?price=${selectedHousePrice}&loan_amount=${loanAmount}&minfico=${minValue}&maxfico=${maxValue}&state=${selectedState}&rate_structure=${selectedRateStructure}&loan_term=${selectedLoanTerm}&loan_type=${selectedLoanType}&arm_type=${selectedARMType}`
    );

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
    maxValue,
    selectedARMType,
  ]);

  return (
    <Box className="h-screen">
      <Box className="flex justify-evenly items-center h-[320px]">
        <Box className="flex flex-col space-y-2">
          <Box className="flex space-x-5 items-center">
            <Box>
              <Typography variant="subtitle1" className="text-[#00000099]">
                House Price
              </Typography>
              <TextField
                value={selectedHousePrice}
                onChange={handleHousePrice}
                id="outlined-basic"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" className="text-[#00000099]">Loan Amount</Typography>
              <Typography
                className="text-[#449d48]"
                variant="h5"
                component="h2"
              >
                ${loanAmount.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box className="w-full mt-4">
            <CustomSlider onRangeChange={handleRangeChange} />
          </Box>
        </Box>
        <Box className="flex flex-col space-y-2 mt-3">
          <Typography variant="subtitle1" className="text-[#00000099]">Select State</Typography>
          <Dropdown
            value={selectedState}
            options={states}
            onChange={handleStates}
          />
          <Box>
            <CustomRadioComponent
              label="Rate Type"
              value={selectedRateStructure}
              onChange={handleRateStructure}
              options={RateStructure}
            />
          
            <CustomRadioComponent
              label="Loan Term"
              value={selectedLoanTerm}
              onChange={handleLoanTerm}
              options={LoanTerm}
            />
          </Box>
          <CustomRadioComponent
            label="Loan Type"
            value={selectedLoanType}
            onChange={handleLoanType}
            options={LoanType}
          />

          {selectedRateStructure == "arm" && (
            <CustomRadioComponent
            label="ARM Type"
            value={selectedARMType}
            onChange={handleARMType}
            options={ArmType}
          />


          )}
        </Box>
      </Box>

      <Box className="h-screen mx-auto flex justify-center mt-10">
        <Card
          elevation={0}
          sx={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)" }}
          className="shadow-md h-[450px] w-[900px] p-4 rounded-md"
        >
          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: "bar",
                toolbar: { show: true },
              },
              grid: {
                show: true,
              },
              xaxis: {
                labels: {
                  rotate: -90,
                  rotateAlways: true,
                 
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
              colors: ["#449d48"],

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
                data: Object.entries(rate).map(([key, value]) => value),
              },
            ]}
            type="bar"
            height={"100%"}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default InterestRateChart;
