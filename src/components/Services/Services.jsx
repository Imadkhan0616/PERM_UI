import React, { useContext } from "react";
import "./Services.css";
import Card from "../Card/Card";
import { colors, useTheme, Button } from '@mui/material'
import { tokens } from "../../scenes/theme";
import { motion } from "framer-motion";

const Services = () => {
  // context
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  // transition
  const transition = {
    duration: 1,
    type: "spring",
  };

  return (
    <div className="services" id="services">
      {/* left side */}
      <div className="awesome">
        {/* dark mode */}
        <span>My Skills</span>
        <span></span>
        <spane>
          Lorem ispum is simpley dummy text of printing of printing Lorem
          <br />
          ispum is simpley dummy text of printing
        </spane>
        <a  download>
        <Button className="button i-button" 
          sx={{
            backgroundColor: colors.white[100],
            color: colors.blue[900],
            fontSize: "14px",
            fontWeight: "bold", width:"150px",
            padding: "30px 20px ", borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'}}
          >Download CV</Button>
        </a>
        <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>
      </div>
      {/* right */}
      <div className="cards">
        {/* first card */}
        <motion.div
          initial={{ left: "25rem" }}
          whileInView={{ left: "14rem" }}
          transition={transition}
        >
          <Card
            heading={"Design"}
            detail={"Figma, Sketch, Photoshop, Adobe Illustrator, Adobe xd"}
          />
        </motion.div>
        {/* second card */}
        <motion.div
          initial={{ left: "-11rem", top: "12rem" }}
          whileInView={{ left: "-4rem" }}
          transition={transition}
        >
          <Card
            heading={"Developer"}
            detail={"Html, Css, JavaScript, React, Nodejs, Express"}
          />
        </motion.div>
        {/* 3rd */}
        <motion.div
          initial={{ top: "19rem", left: "25rem" }}
          whileInView={{ left: "12rem" }}
          transition={transition}
        >
          <Card
            heading={"UI/UX"}
            detail={
              "Lorem ispum dummy text are usually use in section"
            }
            color= '#0a1f2e'
            />
        </motion.div>
        <div
          className="blur s-blur2"
          style={{ background: "var(--purple)" }}
        ></div>
      </div>
    </div>
  );
};

export default Services;
