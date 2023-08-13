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
import RatingStars from "./RatingStars";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

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
  const [ratingMarks, setRatingMarks] = useState(1);
  const [comments, setComments] = useState('');

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
        <Header title="Employee MasterData" subtitle="Employee Master Data" />
        <Box>
          <Link to={`/CreateEmployeeMasterData`}>
            <Button
              sx={{
                backgroundColor: colors.white[100],
                color: colors.blue[900],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
              }}
            >
              Create Employee
            </Button>
          </Link>

        </Box>
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
                      <StarBorderOutlinedIcon sx={{ color: colors.blue[900] }} />
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
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Rate Employee</h2>
          <div>
            <label>Rating Marks</label>
            <input type='number' min={1} max={5} value={ratingMarks} onChange={(e) => setRatingMarks(e.target.value)} />
          </div>
          <div>
            <label>Comments</label>
            <input type='text' value={comments} onChange={(e) => setComments(e.target.value)} />
          </div>
          <div>
            <button type='button' onClick={onRate}>Rate</button>
          </div>
        </Box>
      </Modal>
    </Box>
  )
}

export default FeedbackRating;