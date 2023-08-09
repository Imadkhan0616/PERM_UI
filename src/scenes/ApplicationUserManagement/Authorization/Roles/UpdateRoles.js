import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../../../theme";
import Header from "../../../../components/Header";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, Form, Checkbox } from 'semantic-ui-react'
import { getAsync, putAsync } from "../../../../helper/axiosHelper";
import EditIcon from "@mui/icons-material/Edit";


export default function UpdateRole() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    const roleResponse = await getAsync('Role', { 'SearchColumn': 'RoleID', 'SearchValue': id.toString() })
      .catch((error) => {
        console.error('Error fetching roles data:', error);
      });

    const role = roleResponse.data.list[0];

    setName(role.name);
    setDescription(role.description);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {
    await putAsync('Role/Update', {
      roleID: id,
      name,
      description
    }).then((response) => {
      alert(response.message);
      navigate('/GetRole');
    })
  }

  return (
    <Box m="20px">
      <Header title="Roles" subtitle="Create Role" />
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <h4> <Box>
          <Link to={`/GetRole`}>
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
              Show Role
            </Button>
          </Link>
        </Box> <br></br>
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >
        <div style={{ height: '550px', overflow: 'auto', width: '1130px', backgroundColor: '#f4f5ff' }}>

          <Form className="create-form">
            <div className="mb-3">

              <label for="text">Name</label>
              <input type="text"
                placeholder="Enter Name" name="name" required value={name}
                onChange={(e) => setName(e.target.value)} />

              <label for="text">Description</label>
              <input type="text"
                placeholder="Enter Description" name="description" required value={description}
                onChange={(e) => setDescription(e.target.value)} />

            </div>
            <Link to={`/GetRole`}>
              <Button type="submit" onClick={onSubmit}>
                <EditIcon sx={{ mr: "10px" }} />
                Update</Button>
            </Link>

          </Form></div>
      </Box>
    </Box>
  )
}