/*import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../scenes/theme";
import { useTheme } from "@mui/material";
import { mockPieData } from "../data/mockData";
const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <div style={{ height: "400px" }}>
    <ResponsivePie
      data={mockPieData}
      theme={{
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={13}
        colors={{ scheme: 'pastel1' }}

        arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "2 ",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#0a1f2e",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#0a1f2e",
              },
            },
          ],
        },
      ]}
    />
  </div>
  );
};

export default PieChart;*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import Chart from "chart.js/auto";

const PieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/Task');
      const data = response.data;

      const statusCounts = countStatusOccurrences(data);
      const chartData = {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(201, 203, 207, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ],
          },
        ],
      };

      
      setChartData(chartData);
    } catch (error) {
      console.error(error);
    }
  };

  const countStatusOccurrences = (data) => {
    const statusCounts = {
      completed: 0,
      inprogress: 0,
      onhold: 0,
      overdue: 0,
      awaitedreview: 0,
    };

    data.forEach((task) => {
      switch (task.status.toLowerCase()) {
        case 'completed':
          statusCounts.completed++;
          break;
        case 'in-progress':
          statusCounts.inprogress++;
          break;
        case 'on-hold':
          statusCounts.onhold++;
          break;
        case 'over-due':
          statusCounts.overdue++;
          break;
        case 'awaited review':
          statusCounts.awaitedreview++;
          break;
        default:
          break;
      }
    });

    return statusCounts;
  };

  return (
    <div style={{ maxHeight: '400px', maxWidth: '500px', width: '100%', margin: '0 auto' }}>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Pie 
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
        }} />
        ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PieChart;
