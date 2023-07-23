import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { postAsync } from '../../helper/axiosHelper';

export default function CDepartment() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [departmentid, setDepartmentId] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isdeleted, setIsdeleted] = useState('');
  const [createdby, setCreatedby] = useState('');
  const [createdon, setCreatedOn] = useState('');

  const history = useNavigate();

  const postData = async () => {
    await postAsync('Department/Add', {
      departmentid,
      name,
      code,
    }).then((response) => {
      console.log(response.message);
      history('/ReadDepartment')
    });
  }
  
  return (
    <Box m="20px">
      <Header title="Departments" subtitle="Create Department" />
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <h4> <Box>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
            }}
            href='/ReadDepartment'
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Show Departments
          </Button>
        </Box> <br></br>
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >
        <Form className="create-form">
          <div className="mb-3">
            <label for="text">Department Id</label>
            <input type="number" min="0" step="1"
              placeholder="Enter Department ID" name="departmentid" required
              onChange={(e) => setDepartmentId(e.target.value)} />
            <label for="text">Name</label>
            <input type="text"
              placeholder="" name="name" required
              onChange={(e) => setName(e.target.value)} />

            <label for="text">Code </label>
            <input type="text"
              placeholder="Enter Department Code" name="code" required
              onChange={(e) => setCode(e.target.value)} />

            {/* <label for="text">Deleted</label>
            <input type="checkbox"
              placeholder="" name="deleted" required
              onChange={(e) => setIsdeleted(e.target.value)} />

            <label for="Type">Created by:</label>
            <select id="Type" name="Type" onChange={(e) => setCreatedby(e.target.value)} >
              <option value="Male">Select</option>
              <option value="Morning"></option>
              <option value="Evening"></option>
            </select>

            <label for="pwd">Create on</label>
            <input type="date" id="txt1"
              name="fromdate" required
              onChange={(e) => setCreatedOn(e.target.value)} /> */}
          </div>

          <Button
            type="submit" color='#0a1f2e' className="btn-primary" onClick={postData}
          >Submit</Button>

        </Form>

      </Box>
    </Box>
  )

}

