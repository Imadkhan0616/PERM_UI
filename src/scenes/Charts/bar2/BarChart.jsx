import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../scenes/theme";
import Header from "../../../components/Header";
import { getAsync, postAsync } from "../../../helper/axiosHelper";
import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';

const Bar2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [seriesData, setSeriesData] = useState([]);
  const [options, setOptions] = useState(null);
  const [labelData, setLabelData] = useState([]);

  const fetchData = () => {
    getAsync('AttendanceChart')
      .then((res) => {
        if (res.data) {
          console.log(1);
          const labels = res.data.map(s => s.status);
          const series = res.data.map(s => s.count);

          setLabelData(labels);
          setSeriesData(series);
        }
        else {
          console.log(2);
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
      {seriesData.length > 0 ? (
        <div id="chart">
          <Chart
            type="bar"
            width={1380}
            height={700}
            series={[
              {
                name: "Attendance Count",
                data: seriesData
              }
            ]}
            options={{
              title: {
                text: "Attendance Chart",
                style: { fontSize: 30 },
              },

              subtitle: {
                text: "This is graph representation of attendance in Bar Chart.",
                style: { fontSize: 18 },
              },

              colors: ["#f90000"],
              theme: { mode: "light" },

              xaxis: {
                tickPlacement: "on",
                categories: labelData,
                title: {
                  text: "Status",
                  style: { color: "#f90000", fontSize: 30 },
                },
              },

              yaxis: {
                labels: {
                  formatter: (val) => {
                    return `${val}`;
                  },
                  style: { fontSize: "15", colors: ["#f90000"] },
                },
                title: {
                  text: "Attendance Count",
                  style: { color: "#f90000", fontSize: 15 },
                },
              },

              legend: {
                show: true,
                position: "right",
              },

              dataLabels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: {
                  colors: ["#f4f4f4"],
                  fontSize: 15,
                },
              },
            }}
          ></Chart>
        </div>) : (<><h4>No data found to plot Attendance chart.</h4></>)
      }
    </Box>
  );
};

export default Bar2;