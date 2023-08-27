import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { colors, useTheme } from '@mui/material'
import { tokens } from "../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Button, Form, Checkbox, Input, Select } from 'semantic-ui-react'
import { Code, Grade } from "@mui/icons-material";
import { putAsync, getAsync } from "../../helper/axiosHelper";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SelectInput from '../../components/Select/SelectInput';


export default function UpdateEmployeeMasterData() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  // const [businessPartnerID, setBusinessPartnerID] = useState("");
  const [code, setcode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isActive, setIsActive] = useState("");
  const [gender, setGender] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [paramLevelID, setParamLevelID] = useState("");
  const [designation, setDesignation] = useState("");
  const [paramGenderID, setParamGenderID] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const fetchData = async () => {
    const employeeResponse = await getAsync('BusinessPartner', { 'SearchColumn': 'businessPartnerID', 'SearchValue': id.toString() })
      .catch((error) => {
        console.error('Error fetching employees data:', error);
      });

    const employee = employeeResponse.data.list[0];

    // setBusinessPartnerID(employee.businessPartnerID);
    setcode(employee.code);
    setFirstName(employee.firstName);
    setMiddleName(employee.middleName);
    setLastName(employee.lastName);
    setIsActive(employee.isActive);
    setGender(employee.gender);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDepartmentChange = (selectedDepartment) => {
    setSelectedDepartment(selectedDepartment);
  };

  const handleLevelChange = (selectedLevel) => {
    setSelectedLevel(selectedLevel);
  };

  const handleGenderChange = (selectedGender) => {
    setSelectedGender(selectedGender);
  };

  const onSubmit = async () => {
    await putAsync('BusinessPartner/Update', {
      businessPartnerID: id,
      code,
      firstName,
      middleName,
      lastName,
      isActive,
      designation,
      paramGenderID: selectedGender.value,
      departmentID: selectedDepartment.value,
      paramLevelID: selectedLevel.value
    }).then((response) => {
      alert(response.message);
      navigate('/GetEmployeeMasterData');
    })
  }

  return (
    <Box m="20px">
      <Header title="MasterData" subtitle="Update Employee Master Data" />
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
        <h4> <Box>
          <Link to={`/GetEmployeeMasterData`}>

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
              Show Data
            </Button>
          </Link>
        </Box> <br></br>
          Employee Details
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >

        <Form className="create-form">
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='First Name'
              placeholder='First Name' value={firstName} required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Field
              control={Input}
              label='Middle Name'
              placeholder='Middle Name' value={middleName} required
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <Form.Field
              control={Input}
              label='Last Name'
              placeholder='Last Name' value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Form.Field
              control={Input}
              label='Designation'
              placeholder='Designation' onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Group>

          {/*
          <Form.Field
            control={Select}
            label='Gender'
            options={options} value={gender}
            onChange={(e)=>setGender(e.target.value)}
            placeholder='Gender'
          /></Form.Group>*/}
          <label for="Type">Gender:</label>
          <SelectInput
            searchHeader={{ 'SearchColumn': 'ApplicationParamMasterID', 'SearchValue': '10' }}
            placeholde="Select Gender"
            apiUrl="ApplicationParam"
            valueField="applicationParamDetailID"
            lableField="paramKey"
            selectedOption={selectedGender}
            onValueChange={handleGenderChange} />

          <label for="Type">Department:</label>
          <SelectInput
            placeholde="Select Department"
            apiUrl="Department"
            valueField="departmentID"
            lableField="name"
            selectedOption={selectedDepartment}
            onValueChange={handleDepartmentChange} />

          <label for="Type">Level:</label>
          <SelectInput
            searchHeader={{ 'SearchColumn': 'ApplicationParamMasterID', 'SearchValue': '12' }}
            placeholde="Select Level"
            apiUrl="ApplicationParam"
            valueField="applicationParamDetailID"
            lableField="paramKey"
            selectedOption={selectedLevel}
            onValueChange={handleLevelChange} />

          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button
            // type="submit" color='#0a1f2e' disabled={!isFormValid}
            className="btn-primary" onClick={onSubmit}
          >Update
          </Button>

        </Form>

      </Box>
    </Box>
  )

}

