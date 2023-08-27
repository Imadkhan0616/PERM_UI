import React, {useEffect, useState} from 'react';
import { useTheme } from "@mui/material";
import Chart from 'react-apexcharts';
import { tokens } from "../../scenes/theme";

const BarChartEmp = ({isDashboard = false}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [attendanceStatus, setAttendanceStatus] = useState([]);
    const [attendanceStatusValue, setAttendanceStatusValue] = useState([]);

    useEffect(() =>{
        const attendanceStatus = [];
        const attendanceValue = [];
        const getAttendanceRecord = async () =>{
            const request = await fetch("http://localhost:5072/api/MarkAttendance");
            const response = await request.json();
            console.log(response);

            for(let i = 0; i < response.length; i++)
            {
                attendanceStatus.push(response[i].paramAttendanceStatusID);
                attendanceValue.push(response[i].paramAttendanceStatusID.length);
                
            }
            setAttendanceStatus(attendanceStatus);
            setAttendanceStatusValue(attendanceStatusValue);
        }  
        getAttendanceRecord();
    },[])

    return(
        <React.Fragment>
            <div className='container-fluid mb-5 containerht'></div>
            <h3 className='text-center mt-3 mb-3'>Bar Chart in</h3>

            <Chart
            type='bar'
            width={1380}
            height={700}
            series={[
                { 
                    name: "Employees",
                    data: attendanceStatusValue //values
                }
            ]}

            options={{
                    title:{text: "Total Attendance",
                    style:{fontSize:30}
                },

                subtitle:{
                    text:"Today's Employees Attendance",
                    style:{fontSize:14}
                },

                colors:['#0096FF'],
                theme:{mode: 'light'},

                xaxis:{
                    tickPlacement: "on",
                    categories: attendanceStatus,
                        title:{text:"Today's Employee Attendance",
                        style: {color: "#000", fontSize: "14"}
                    }
                },
                yaxis:{
                    labels:{
                        formatter:(val) => {return `${val}`},
                        style:{fontSize:12,
                            colors: ["#000"]}
                    },
                    title:{
                        text:"Attendance Count",
                        style:{fontSize:14,
                        color:"#000"}
                    }
                },
                legend:{
                    show: true,
                    position: "left",
                },

                dataLabels:{
                    formatter: (val) =>{return `${val}`},
                    style: {
                        fontSize: 14,
                        colors:["#fff"]
                    }
                }
                
            }}
            >


            </Chart>
        </React.Fragment>
    )
}

export default BarChartEmp;