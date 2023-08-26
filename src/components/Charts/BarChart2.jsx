import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";


const BarChart2 = () => {
  const [chartData, setChartData] = useState({});
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark');
      const data = response.data;
      console.log(response.data);
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

export default BarChart2;
