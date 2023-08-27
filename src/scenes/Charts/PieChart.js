import { Box, useTheme } from "@mui/material";
import { tokens } from "../../scenes/theme";
import Header from "../../components/Header";
import PieChart from "../../components/Charts/PieChart";
import { getAsync, postAsync } from "../../helper/axiosHelper";
import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';

const Pie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [seriesData, setSeriesData] = useState([]);
  const [labelData, setLabelData] = useState([]);

  const fetchData = () => {
    getAsync('TaskCount')
      .then((res) => {
        if (res.data) {
          const labels = res.data.map(s => s.status);
          const series = res.data.map(s => s.count);

          setLabelData(labels);
          setSeriesData(series);
        }
        else {
          setLabelData([]);
          setSeriesData([]);
        }
      })
      .then((res) => {
        console.log(labelData);
        console.log(seriesData);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      backgroundColor={colors.white[500]}
      color={colors.blue[900]}
    >
      {seriesData.length > 0 ? (<div id="chart">
        <Chart
          type="pie"
          series={seriesData}
          options={{ labels: labelData }}
          width={380}
          height={300}>
        </Chart>
      </div>) : (<><h4>No data found to plot Task count chart.</h4></>)}
    </Box>
  );
};

export default Pie;