import React, { useEffect, useState } from 'react';
import { Table, checkbox } from 'semantic-ui-react'
import axios from 'axios';
import { Box, Button, IconButton, Rating, Modal } from "@mui/material";
import Header from '../../components/Header'
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAsync, deleteAsync, postAsync } from '../../helper/axiosHelper';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Feedback } from '@mui/icons-material';
import FaRatingStar from "./FaRatingStar";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import '../../index.css';
import { FaStar } from 'react-icons/fa'
import './RatingStar.css';

const FeedbackRating = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);
  const [open, setOpen] = useState(false);
  const [businessPartnerID, setBusinessPartnerID] = useState(0);
  const [comments, setComments] = useState('');
  const [ratingMarks, setRatingMarks] = useState(null);
  const [hover, setHover] = useState(null);


  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    await getAsync('BusinessPartner')
      .then((response) => {
        console.log(response.message);
        setAPIData(response.data.list);
      });
  };

  const onRate = () => {
    postAsync('BusinessPartner/Feedback', {
      businessPartnerID,
      ratingMarks,
      comments
    })
      .then((response) => {
        alert(response.message);
      });
  };

  const handleOpen = (businessPartnerID) => {
    setBusinessPartnerID(businessPartnerID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Employee 360 Feedback" subtitle="Feedback Rating" />

      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Middle Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body>
            {APIData.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.code}</Table.Cell>
                  <Table.Cell>{data.firstName}</Table.Cell>
                  <Table.Cell>{data.middleName}</Table.Cell>
                  <Table.Cell>{data.lastName}</Table.Cell>
                  <Table.Cell>{data.paramGender.paramKey}</Table.Cell>
                  <Table.Cell>
                    <IconButton onClick={() => handleOpen(data.businessPartnerID)}>
                      <StarOutlinedIcon sx={{ color: '#FFC000', fontSize: '20px' }} />
                    </IconButton>{" "}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body></Table>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, borderRadius: '10px', backgroundColor: 'white', color: 'black', border: '0px' }} className='modalStyles'>
          <h2 id="parent-modal-title">Rate Employee</h2>
          <div>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label>
                  <input
                    type='radio'
                    name="rating"
                    value={currentRating}
                    onClick={() => setRatingMarks(currentRating)}
                  />
                  <FaStar
                    className='star'
                    size={50}
                    color={currentRating <= (hover || ratingMarks) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            <p>Your rating is {ratingMarks}</p>
          </div>
          <div>
            <input placeholder='Comments' type='text' value={comments} onChange={(e) => setComments(e.target.value)} />
          </div>
          <div>
            <button className='btn-rate' type='button' onClick={onRate}
            >Rate</button>
          </div>
        </Box>
      </Modal>
    </Box>
  )
}

export default FeedbackRating;