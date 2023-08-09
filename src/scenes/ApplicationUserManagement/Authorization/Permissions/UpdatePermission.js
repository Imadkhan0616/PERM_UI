import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {Box} from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../../../theme";
import Header from "../../../../components/Header";
import { Button, Form, Checkbox } from 'semantic-ui-react'
import EditIcon from "@mui/icons-material/Edit";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function UpdatePermission() {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        let navigate = useNavigate();
        const [permissionid, setPermissionId] = useState("");
        const [userid, setUserId] = useState("");
        const [roleID, setRoleid] = useState("");
        const [paramAccessType, setParamAccessType] = useState("");
        const [permissionDetails, setPermissionDetails] = useState("");
        const [isdeleted, setIsdeleted] = useState("");
        const [createdby, setCreatedby] = useState("");
        const [createdon, setCreatedOn] = useState("");

        useEffect(() => {
            setPermissionId(localStorage.getItem("Permission"));
            setUserId(localStorage.getItem("User", userid));
            setRoleid(localStorage.getItem("Role", roleID));
            setParamAccessType(localStorage.getItem("Permission Types", paramAccessType));
            setPermissionDetails(localStorage.getItem("Permission Details", permissionDetails));
            setIsdeleted(localStorage.getItem("isdeleted", isdeleted));
            setCreatedby(localStorage.getItem("createdby", createdby));
            setCreatedOn(localStorage.getItem("createdon", createdon));
        }, []);

        const updateAPIData = () => {
            if (!permissionid) {
              alert('Please enter the permission id.');
              return;
            }
            
            if (!userid) {
              alert('Please enter the user id.');
              return;
            }
            if (!roleID) {
              alert('Please enter the role id.');
              return;
            }
            if (!paramAccessType) {
                alert('Please enter the permission type.');
                return;
            }
            if (!permissionDetails) {
                alert('Please enter the permission details.');
                return;
            }
              axios.put(`https://647e18d4af984710854aee8c.mockapi.io/Permission/${permissionid}`, {
                permissionid: permissionid,
                userid: userid,
                roleID: roleID,
                paramAccessType: paramAccessType,
                permissionDetails: permissionDetails,
                  isdeleted: isdeleted,
                  createdby: createdby,
                  createdon: createdon,
              }).then(() => {
                  navigate('/GetPermission')
              })
        }
        return(
            <Box m="20px">
            <Header title="Permissions" subtitle="Create Permission" />
            <Box display="flex" justifyContent="space-between"  
            backgroundColor={colors.white[500]} color={colors.blue[900]}>
               <h4> <Box>
              <Button
                sx={{
                  backgroundColor: colors.white[100],
                  color: colors.blue[900],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",borderRadius:'15px', boxShadow:'1px 2px 9px #aed7f4'
                }}
                href='/GetPermission'
              >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Show Permission
              </Button>
            </Box> <br></br> 
                </h4>
            </Box>
            <Box display="flex" justifyContent="space-between"  
            backgroundColor={colors.white[100]} color={colors.blue[900]}  >   
            <div style={{ height: '550px', overflow: 'auto', width:'1130px', backgroundColor: '#f4f5ff'}}>    
    
            <Form className="create-form">
            <div className="mb-3">
        <label for="text">Department Code</label>
          <input type="text"  value={permissionid}
                placeholder="Enter Permission ID" name="permissionid" required
                onChange={(e)=>setPermissionId(e.target.value)} />
    
        <label for="text">Name</label>
          <input type="text" 
                placeholder="Enter User" name="name" required value={userid}
                onChange={(e)=>setUserId(e.target.value)} />

                <label for="text">Role </label>
                 <input type="number" min="0" step="1" value={roleID}
                placeholder="Enter Role" name="code" required
                onChange={(e)=>setRoleid(e.target.value)} />

<label for="text">Permission Types </label>
                 <input type="number" min="0" step="1" value={paramAccessType}
                placeholder="Enter Permission Types" name="paramAccessType" required
                onChange={(e)=>setParamAccessType(e.target.value)} />

<label for="text">Permission Details </label>
                 <input type="number" min="0" step="1" value={permissionDetails}
                placeholder="Enter Permission Details" name="permissionDetails" required
                onChange={(e)=>setPermissionDetails(e.target.value)} />
    
    <label for="text">Deleted</label>
          <input type="text" value={isdeleted}
                placeholder="" name="deleted" required
                onChange={(e)=>setIsdeleted(e.target.value)} />
                 
                 <label for="Type">Created by:</label>
      <select id="Type" name="Type" onChange={(e)=>setCreatedby(e.target.value)} value={createdby} >
      <option value="Male">Select</option>
        <option value="Morning"></option>
        <option value="Evening"></option>
      </select>
    
      <label for="pwd">Create on</label>
          <input type="date" id="txt1" value={createdon}
                 name="fromdate" required
                onChange={(e)=>setCreatedOn(e.target.value)} />
    </div>
    <Link to={`/GetPermission`}>
    <Button   
     type="submit"  onClick={updateAPIData} 
     >
         <EditIcon sx={{ mr: "10px" }} />

      Update
     </Button>
     </Link>

    
      </Form></div>
      
      </Box>
      </Box>
      )
}
