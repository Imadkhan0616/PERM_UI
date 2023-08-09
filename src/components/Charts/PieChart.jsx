import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

    
// /*Use Api here*/
// function LineChart() {
//   const[data, setData] = useState(null);

//   useEffect(()=>{
//     let token = localStorage.getItem("token");
//     if(token)
//     {
//       const axiosConfig = {
//         headers:{
//           Accept:"application/json",  
//           Authorization: `Bearer ${token}`
//         }
//       };
//       axios.get('https://646296267a9eead6fad2c898.mockapi.io/api/V1/Attendance', axiosConfig).then((response)=>{
//         console.log(response.data.data);
//         if(response.data.data)
//         {
//           setData({
//             labels:response.data.data.map((individualData)=> individualData.value),
//             datasets:[{
//               label: 'Name',
//               data: response.data.data.map((individualData) => individualData.value),
//             }]
//           })
//         }else{
//           console.log("Data Not Found!");
//         }
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//     }
//   }, [])
//   return (
//     <div className="wrapper">
//       {data!== null? (
//         <Line data={data}/>
//       ): (
//         <div>Donations Data is null</div>
//       )}
//     </div>
//   );
// }

/*------------------------------------*/

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
