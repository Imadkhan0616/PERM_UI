import { React, useState, useEffect } from "react";
import "./Intro.css";
import { colors, useTheme, Button } from '@mui/material'
import { tokens } from "../scenes/theme";
import { motion } from "framer-motion";
import Profilepic from '../img/Profilepic.png'
import { Link } from 'react-router-dom';
const Intro = () => {
  const transition = { duration: 2, type: "spring" };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <div className="Intro" id="Intro">
          <div className="i-right">
        <img src={Profilepic} alt="" />
       
      </div>
      {/* left name side */}
      <div className="i-left">
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          <span >Developer</span>
          <div className="i-subname"><span>Mohammad</span></div>
          
          <span>
            Frontend Developer with high level of experience in web designing
            and development, producting the Quality work.
          </span>
        </div>
        <Link to="/Services" smooth={true} spy={true}>
          <Button className="button i-button" 
          sx={{
            backgroundColor: colors.white[100],
            color: colors.blue[900],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "20px 20px", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'}}
          >Skills</Button>
        </Link>  </div></div>
  );};

export default Intro;
