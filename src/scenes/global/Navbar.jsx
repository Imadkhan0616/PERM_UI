import * as React from 'react';
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Button, ListItem, ListItemButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StorageIcon from '@mui/icons-material/Storage';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
import BarChartIcon from '@mui/icons-material/BarChart';
import UsbIcon from '@mui/icons-material/Usb';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
const Item = ({ title, to, icon, }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const { isCollapsed, setIsCollapsed } = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.blue[900],
      }}
      onClick={() => setSelected(title)}
      icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (

    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.white[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#5db0e9 !important",
        },
        "& .pro-menu-item.active": {
          color: "#a3a3a3 !important",
        },
      }} >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuIcon /> : undefined} style={{
              margin: "10px 0 20px 0",
              color: colors.blue[900],
            }} >
            {!isCollapsed && (
              <Box
                display="flex" justifyContent="space-between"
                alignItems="center"
                ml="25px" >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                </IconButton>
                <MenuIcon />
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="left" alignItems="left">
                <img
                  alt="perm-logo"
                  width="200px"
                  height="100px"
                  src={`../../imgs/logo.jpeg`}
                  style={{ cursor: "pointer", borderRadius: "5%" }}
                />
              </Box> </Box>
          )}
          <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', color: colors.blue[900], backgroundColor: colors.white[100] }} >
            <Item
              title="Dashboard" to="/dashboard" color='#0a1f2e'
              icon={<HomeOutlinedIcon />} selected={selected}
              setSelected={setSelected} />
          </Box>
          <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Employee
          </Typography>
          <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', color: colors.blue[900], backgroundColor: colors.white[100] }}>
            <SubMenu
              title="Employee" color='#0a1f2e'
              icon={<PeopleOutlinedIcon />}
              selected={selected} setSelected={setSelected}>

              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected}
                  icon={<AccountCircleIcon />}> <Link to="/empMD">Master Data</Link></MenuItem>
              </Box>

              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected}
                  icon={<AccountCircleIcon />}> <Link to="/MAttread">Attendance</Link></MenuItem>
              </Box>
              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>

              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected}
                  icon={<EventNoteIcon />}><Link to="/Aread">Requested Attendance</Link></MenuItem>
              </Box>
              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected} icon={<AssignmentIcon />}>
                  <Link to='/ReadTask'>Task</Link></MenuItem>
              </Box>                 <span></span>
            </SubMenu>  </Box>
          <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>{/*
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
               Master data
            </Typography>
<Box sx={{borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',backgroundColor:colors.white[100]}}>
            <Item
              title="Employee Master Data"  to="/empMD"
              icon={<PeopleOutlinedIcon />}
              selected={selected}   setSelected={setSelected}
            />
            </Box>

<Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
<Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Attendance
            </Typography>
              <Box sx={{borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',backgroundColor:colors.white[100]}}>
              <Item
              title="Atttendance Request"
              to="/Aread"
              icon={<EventNoteIcon />} />
            </Box>

            <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',backgroundColor:colors.white[100]}}>
              <Item
              title="Atttendance"
              to="/MAttread"
              icon={<EventNoteIcon />} />
            </Box>

            <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Tasks
            </Typography>
              <Box sx={{borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',backgroundColor:colors.white[100]}}>
              <Item
              title="Task"
              to="/ReadTask"
              icon={<AssignmentIcon />} />
              </Box>*/}


          {/* 
            <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
            <Box sx={{borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',backgroundColor:colors.white[100]}}>
            <Item
              title="Task Management"
              to="/Task Management"
              icon={<AssignmentIcon />}    selected={selected}  setSelected={setSelected}
            /></Box>
             <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
            <Box sx={{borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',backgroundColor:colors.white[100]}}>
            <Item
              title="Attendance"
              to="/Attendance"
              icon={<EventNoteIcon />}
              selected={selected}
              setSelected={setSelect />
            </Box>*/}
          <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Departments
          </Typography>
          <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
            <Item
              title="Department"
              to="/ReadDepartment"
              icon={<AssignmentIcon />} />
          </Box>
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Charts
          </Typography>
          <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', color: colors.blue[900], backgroundColor: colors.white[100] }}>
            <SubMenu
              title="Charts" color='#0a1f2e'
              icon={<PeopleOutlinedIcon />}
              selected={selected} setSelected={setSelected}>

              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected}
                  icon={<BarChartIcon />}> <Link to="/bar">Employee Count</Link></MenuItem>
              </Box>

              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected}
                  icon={<PieChartOutlineOutlinedIcon />}> <Link to="/Pie">Task Count</Link></MenuItem>
              </Box>
              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>

              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected}
                  icon={<TimelineOutlinedIcon />}><Link to="/Line">Line Chart</Link></MenuItem>
              </Box>
              <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                <MenuItem selected={selected} setSelected={setSelected} icon={<BarChartIcon />}>
                  <Link to='/bar2'>Attendance</Link></MenuItem>
              </Box>                 <span></span>
            </SubMenu>  </Box>
          <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>

          <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
            <Item
              title="Permission"
              to="/CreatePermission"
              icon={<AccountCircleIcon
              />}
              selected={selected}
              setSelected={setSelected} /></Box>
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "25px 0 5px 20px" }}>   </Typography>


          {/*
      <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "25px 0 5px 20px" }}>   </Typography>
              <Box sx={{borderRadius:'15px', boxShadow:'1px 2px 9px #d6ebfa',backgroundColor:colors.white[100]}}>
            <Item 
              title=" Departments"
              to="/Departments"jhfdzrrdd
              icon={<CorporateFareIcon />}
              selected={selected}
          setSelected={setSelected} /></Box>*/}
          <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
          <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />} />
          </Box>
          <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
          <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
            <Item
              title="Feedback"
              to="/Feedback"
              icon={<FeedbackIcon />}
              selected={selected}
              setSelected={setSelected} /></Box>




        </Menu>
      </ProSidebar>
    </Box>
  );
};
export default Navbar;