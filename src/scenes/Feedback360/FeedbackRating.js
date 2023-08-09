import React, { useEffect, useState } from 'react';
import { Table, checkbox } from 'semantic-ui-react'
import axios from 'axios';
import { Box, Button, IconButton, Rating } from "@mui/material";
import Header from '../../components/Header'
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAsync, deleteAsync } from '../../helper/axiosHelper';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Feedback } from '@mui/icons-material';
import RatingStars from "./RatingStars";


const FeedbackRating = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    getData()
  }, []);

  const ratingStars = [];
  const setData = (data) => {
    let { 
        businessPartnerID,
        code,
        firstName,
        middleName,
        lastName,
        Rating,
        gender } = data;
    localStorage.setItem('BusinessPartnerID', businessPartnerID);
    localStorage.setItem('Code', code);
    localStorage.setItem('FirstName', firstName);
    localStorage.setItem('MiddleName', middleName);
    localStorage.setItem('LastName', lastName);
    localStorage.setItem('Rating', Rating);
    localStorage.setItem('Gender', gender);
  };

  const getData = async () => {
    await getAsync('BusinessPartner')
      .then((response) => {
        console.log(response.message);
        setAPIData(response.data.list);
      });
  };
  const onDelete = async (businessPartnerID) => {
     deleteAsync('BusinessPartner/Delete', { 
      businessPartnerID
     })
      .then((response) => {
        alert(response.message);
        getData();
      });
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
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              
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
                  <Table.Cell>{data.Rating}</Table.Cell>
                  <Table.Cell>{data.gender}</Table.Cell>
               
                </Table.Row>
              )
            })}
          </Table.Body></Table>
      </Box>
    </Box>
  )
}
export default FeedbackRating;
