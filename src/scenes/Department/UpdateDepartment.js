import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import Header from "../../components/Header";
import { Button, Form, Checkbox } from 'semantic-ui-react'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { getAsync, putAsync } from "../../helper/axiosHelper";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


export default function UpdateDepartment() {

  const { id } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const fetchData = async () => {
    const departmentResponse = await getAsync('Department', { 'SearchColumn': 'DepartmentID', 'SearchValue': id.toString() })
      .catch((error) => {
        console.error('Error fetching roles data:', error);
      });

    const department = departmentResponse.data.list[0];

    setName(department.name);
    setCode(department.code);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAPIData = async () => {
    await putAsync(`Department/Update`, {
      departmentID: id,
      name: name,
      code: code,
    }).then((response) => {
      alert(response.message);
      navigate('/ReadDepartment')
    })
  };

  return (
    <Box m="20px">
      <Header title="Departments" subtitle="Create Department" />
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <h4> <Box>
          <Link to={`/ReadDepartment`}>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
            }}
          >
            <VisibilityOutlinedIcon sx={{ mr: "10px" }} />
            Show Departments
          </Button>
          </Link>
        </Box> <br></br>
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >
        <Form className="create-form">
          <div className="mb-3">

            <label for="text">Name</label>
            <input type="text"
              placeholder="Enter Department Name" 
              name="name" 
              required value={name}
              onChange={(e) => setName(e.target.value)} 
              sx={{padding: "10px"}}/>
            <label for="text">Code </label>
            <input type="text" 
            value={code}
              placeholder="Enter Department Code" 
              name="code" required 
              onChange={(e) => setCode(e.target.value)}
              sx={{padding: "10px"}} />
            <Button
              type="submit" onClick={updateAPIData}
            >Update</Button>
          </div>
        </Form>
      </Box>
    </Box>
  );
}