/*import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../scenes/theme";
import { mockBarData2 as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        added
        axis: {
          domain: {
            line: {
              stroke: colors.blue[900],
            },
          },
          legend: {
            text: {
              fill: colors.blue[900],
            },
          },
          ticks: {
            line: {
              stroke: colors.blue[900],
              strokeWidth: 1,
            },
            text: {
              fill: colors.blue[900],
            },
          },
        },
        legends: {
          text: {
            fill: colors.blue[900],
          },
        },
      }}
      keys={["IT", "Sales", "Finance", "HR", "Production", "Marketing"]}
      indexBy="Department"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "pastel2" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Department", // changed
        legendPosition: "middle",
        legendOffset: 42,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Employee Presents", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";


const BarChart = () => {
  const [chartData, setChartData] = useState({});
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark');
      const data = response.data;

      const counts = countStatusOccurrences(data);
      const chartData = {
        labels: Object.keys(counts),
        datasets: [
          {
            data: Object.values(counts),
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(201, 203, 207, 0.6)',
            ],
          },
        ],
      };

      setChartData(chartData);
      setStatusCounts(counts);
    } catch (error) {
      console.error(error);
    }
  };

  const countStatusOccurrences = (data) => {
    const statusCounts = {
      present: 0,
      leave: 0,
      sickleave: 0,
      onduty: 0,
    };

    data.forEach((attendance) => {
      switch (attendance.status.toLowerCase()) {
        case 'present':
          statusCounts.present++;
          break;
        case 'leave':
          statusCounts.leave++;
          break;
        case 'sick-leave':
          statusCounts.sickleave++;
          break;
        case 'on-duty':
          statusCounts.onduty++;
          break;
        default:
          break;
      }
    });

    return statusCounts;
  };

  return (
   
        <div>
          {chartData.labels && chartData.labels.length > 0 ? (
            <Bar
              data={chartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    precision: 0,
                  },
                },
              }}
            />
          ) : (
            <p>Loading...</p>
          )}
      </div>
  );
};

export default BarChart;
