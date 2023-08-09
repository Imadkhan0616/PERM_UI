import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../theme";
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StatBox from "../../components/StatBox";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";
import BarChart2 from "../../components/Charts/BarChart2";



const Dashboard = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return (
      <div style={{ height: '100%', overflow: 'auto', width:'100%', backgroundColor: '#f4f5ff'}}>    
      <Box m="20px">
     
        <Box display="flex" justifyContent="space-between" alignItems="center" >
          <Header  title="DASHBOARD" subtitle="Welcome to your dashboard" />
          <Box>
          <Button 
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        elevation={30} 
      ><Box
      gridColumn="span 3"
      backgroundColor={colors.white[100]}
      display="flex"
      alignItems="center"
      justifyContent="center"
      elevation={30} boxShadow='1px 2px 9px #d6ebfa' borderRadius='20px'
    >
      <StatBox
            title="94"
            subtitle="Total Tasks"
            progress="0.75"
            increase="+32% This month"
            icon={
              <AssignmentIcon
                sx={{ color: colors.blue[900], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.white[100]}
          display="flex"
          alignItems="center"
          justifyContent="center" boxShadow='1px 2px 9px #d6ebfa' borderRadius='20px'
        >
          <StatBox
            title="56"
            subtitle="Completed Tasks"
            progress="0.50"
            increase="+32% This month"
            icon={
              <AssignmentIcon
                sx={{ color: colors.blue[900], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.white[100]}
          display="flex"
          alignItems="center"
          justifyContent="center" boxShadow='1px 2px 9px #d6ebfa' borderRadius='20px'
        >
          <StatBox
            title="150"
            subtitle="Today's Attendance"
            progress="0.30"
            increase="+80%"
            icon={
              <EventNoteIcon
                sx={{ color: colors.blue[900], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.white[100]}
          display="flex"
          alignItems="center"
          justifyContent="center" boxShadow='1px 2px 9px #d6ebfa' borderRadius='20px'
        >
          <StatBox
            title="4.5/160"
            subtitle="Employee Ratings and Feedbacks"
            progress="0.80"
            increase="+43%"
            icon={
              <FeedbackIcon
                sx={{ color: colors.blue[900], fontSize: "26px" }}
              />
            }
          />
        </Box>   
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.white[100]} boxShadow='1px 2px 9px #d6ebfa' borderRadius='25px'
        > 
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ padding: "30px 30px 0 30px" }}
                color={colors.blue[900]}
              >
                Employee Count by Department
              </Typography>
              <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
            </Box>
        <Box
        gridColumn="span 6"
        gridRow="span 2"  display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        backgroundColor={colors.white[100]} boxShadow='1px 2px 9px #d6ebfa' borderRadius='25px'
        >
              <Typography
              variant="h3"
              fontWeight="bold" color={colors.blue[900]}
              sx={{ padding: "30px 30px 0 30px" }}>
                 Tasks Status
              </Typography>
              <Box height={250} width={250}>
            <PieChart isDashboard={true} height={200} width={200}/>
          </Box>
          </Box>
          <Box
          gridColumn="span 12"
          gridRow="span 3" flexDirection="column"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          backgroundColor={colors.white[100]} boxShadow='1px 2px 9px #d6ebfa' borderRadius='25px'
        > 
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ padding: "30px 30px 0 30px" }}
                color={colors.blue[900]}
              >
                Todays Attendance
              </Typography>
              <Box height={840} width={840}>
            <BarChart2 isDashboard={true} />
          </Box>
          
            </Box>
            
        
        </Box></Box></div>
        
    )
};

export default Dashboard;