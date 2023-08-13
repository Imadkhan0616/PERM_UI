import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
var StringHelper = require('string');

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loginID, setLoginID] = useState("");
  const [tenantID, setTenantID] = useState("");
  useEffect(() => {
    setLoginID(localStorage.getItem('username'));
    setTenantID(localStorage.getItem('tenantID'));
  });
  const colorMode = useContext(ColorModeContext);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  };

  const dispatch = useDispatch();
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.white[100]}
        borderRadius="10px"
        boxShadow='1px 2px 9px #aed7f4'
      >
        <InputBase sx={{ color: colors.blue[900], ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ color: colors.blue[900], p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex" color={"#0a1f2e"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon sx={{ color: colors.blue[900] }} />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon sx={{ color: colors.blue[900] }} />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon sx={{ color: colors.blue[900] }} />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon sx={{ color: colors.blue[900] }} />
          {/* {loginID} */}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            style: {
              color: "#0a1f2e", width: "200px", borderRadius: '15px', border: '1px solid #ccc',
              backgroundColor: "#fbfbff",
            },
          }}
        >
          <MenuItem component={Link} to="/Profile" onClick={handleMenuClose}>
            <PersonOutlinedIcon sx={{ marginRight: 1, color: colors.blue[900] }} />{StringHelper(loginID).humanize().s}</MenuItem>

          <MenuItem component={Link} to="/Profile" onClick={handleMenuClose}>
            <CorporateFareOutlinedIcon sx={{ marginRight: 1, color: colors.blue[900] }} />{StringHelper(tenantID).humanize().s}</MenuItem>

          <MenuItem component={Link} to="/"
            onClick={handleMenuClose}>
            <Logout sx={{ marginRight: 1, color: colors.blue[900] }} />
            <div onClick={() => dispatch({ type: "logout" })}>Logout</div>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;