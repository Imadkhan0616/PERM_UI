import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../scenes/theme";
import { mockLineData as data } from "../../data/mockData";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
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

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
