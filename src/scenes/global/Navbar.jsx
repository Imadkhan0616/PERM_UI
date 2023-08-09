import * as React from 'react';
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Button, ListItem, ListItemButton, Typography, useTheme, Rating } from "@mui/material";
import { Link, json } from "react-router-dom";
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
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Insights } from '@mui/icons-material';

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
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const menu = JSON.parse(localStorage.getItem('menu'));
    setMenu(menu);
  }, []);

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

          {/* Menu item */}
          {menu.map((item, index) => (
            <>
              {item.subMenu && item.subMenu.length == 0 &&
                <>
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                    <Item
                      key={index}
                      title={item.name}
                      to={item.link}
                      icon={<AssignmentIcon />}
                      selected={selected}
                      setSelected={setSelected} />
                  </Box>
                </>
              }
              
              <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', color: colors.blue[900], backgroundColor: colors.white[100] }}>
                <SubMenu
                  key={index}
                  title={item.name} color='#0a1f2e'
                  icon={<PeopleOutlinedIcon />}
                  selected={selected} setSelected={setSelected}>

                  {/* Sub menu item */}
                  {item.subMenu && item.subMenu.length > 0 && item.subMenu.map((subItem, subIndex) => (
                    <>
                      <Typography sx={{ m: "25px 0 5px 20px" }}>  </Typography>
                      <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                        <MenuItem
                          key={subIndex}
                          selected={selected}
                          setSelected={setSelected}
                          icon={<AccountCircleIcon />}>
                          <Link
                            to={subItem.link}>{subItem.name}
                          </Link>
                        </MenuItem>
                      </Box>
                      <span></span>
                    </>
                  ))
                  }
                </SubMenu>
              </Box>
             
            </>
          ))} 
           <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Key Insights
                  </Typography>
                  <Box sx={{ borderRadius: '15px', boxShadow: '1px 2px 9px #d6ebfa', backgroundColor: colors.white[100] }}>
                    <Item
                      key={"view"}
                      title={"Key Insights"}
                      to={"/KeyInsights"}
                      icon={<AssignmentIcon />}
                      selected={selected}
                      setSelected={setSelected} />
                  </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Navbar;