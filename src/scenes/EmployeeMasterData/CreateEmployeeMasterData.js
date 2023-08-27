import { colors, useTheme } from '@mui/material'
import axios from "axios";
import { tokens } from "../theme";
import { React, useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'
import { Height } from '@mui/icons-material';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Button, Form, Checkbox, Input, Select } from 'semantic-ui-react'
import { postAsync } from '../../helper/axiosHelper';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SelectInput from '../../components/Select/SelectInput';


export default function CreateEmployee() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [businessPartnerID, setBusinessPartnerID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [designation, setDesignation] = useState("");
  const [paramLevelID, setParamLevelID] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [code, setCode] = useState("");
  const [firstName, setFirstname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [lastName, setLastname] = useState("");
  const [isActive, setIsActive] = useState("");
  const [paramGenderID, setParamGenderID] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  //  const  [dob, setDOB]= useState("");
  //  const  [doj, setDoj]= useState("");
  //  const  [employeementtype, setEtype]= useState("");
  //  const  [emrgncyname, setEmrgncyName]= useState("");
  //  const  [relation, setRelation]= useState("");
  //  const  [jobapp, setjobapp]= useState("");
  //  const  [conenddate, setConenddate]= useState("");
  //  const  [offrdate, setOffrdate]= useState("");
  //  const  [notice, setNotice]= useState("");
  //  const  [confdate, setConfdate]= useState("");
  //  const  [dor, setDOR]= useState("");
  //  const  [departn, setDepartn]= useState("");
  //  const  [gradee, setGrade]= useState("");
  //  const  [desigg, SetDesigg]= useState("");
  //  const  [reportto, setReportto]= useState("");
  //  const  [branch, SetBranch]= useState("");
  //  const  [deviceid, setDeviceid]= useState("");
  //  const  [holidays, setHolidays]= useState("");
  //  const  [shift, setShift]= useState("");
  //  const  [salarymode, setSalarymode]= useState("");
  //  const  [bank, setBank]= useState("");
  //  const  [bankacc, setbankAcc]= useState("");
  //  const  [payrollc, setPayrollc]= useState("");
  //  const  [pfacc, setPfacc]= useState("");
  //  const  [hprovider, setHprovider]= useState("");
  //  const  [hnumber, setHnumber]= useState("");
  //  const  [status, setStatus]= useState("");
  //  const  [bldgrp, setBldgrp]= useState("");
  //  const  [fbg, setFbg]= useState("");
  //  const  [healthd, setHealthd]= useState("");
  //  const  [cnic, setCnic]= useState("");
  //  const  [issuedata, setIssuedate]= useState("");
  //  const  [expdate, setExpdate]= useState("");
  //  const  [uni, setUni]= useState("");
  //  const  [program, setProgram]= useState("");
  //  const  [level, setLevel]= useState("");
  //  const  [passingyr, setPassingyr]= useState("");
  //  const  [excomp, setExcomp]= useState("");
  //  const  [exdesig, setExdesig]= useState("");
  //  const  [exsalary, setExsalary]= useState("");
  //  const  [add, setAdd]= useState("");
  //  const  [exbranch, setExbranch]= useState("");
  //  const  [stdate, setStdate]= useState("");
  //  const  [endate, setEndate]= useState("");
  //  const  [salarystructure, setSalarystructure]= useState("");
  //  const  [name, setName]= useState("");
  //  const  [desig, setDesig]= useState("");
  //  const  [rqskills, setRqskills]= useState("");
  //  const  [des, setDes]= useState("");
  //  const  [resigdate, setResigdate]= useState("");
  //  const  [exdate, setExdate]= useState("");
  //  const  [relievingdate, setReleivingdate]= useState("");
  //  const  [feedback, setFeedback]= useState("");
  //  const  [newplace, setNewplace]= useState("");
  //  const  [reasonleaving, setReasonleaving]= useState("");

  /*const [checkbox, setCheckbox] = useState(false);*/
  //  const [isFormValid, setFormValid] = useState(false);

  // useEffect(() => {
  //   generateEmpcode();
  // }, []);
  // const generateEmpcode = () => {
  //   const lastCode = localStorage.getItem('lastEmployeeCode');
  //   if (lastCode) {
  //     const lastNumber = parseInt(lastCode.split('-')[1], 10);
  //     const newNumber = lastNumber + 1;
  //     const code = `E-${padNumber(newNumber, 4)}`;
  //     setEmpcode(code);
  //   } else {
  //     setEmpcode('E-0001');
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Check if any required field is empty
  //   if (!empcode || !fname ) {
  //     alert('Please fill in all required fields.');
  //     return;
  //   }
  //   onSubmit();
  // };
  // useEffect(() => {
  //   setFormValid(!!empcode && !!fname  && !!doj && !!name  && !!cnic);
  // }, [empcode, fname, doj, name, cnic]);

  // const padNumber = (number, length) => {
  //   return number.toString().padStart(length, '0');
  // };
  //  const options = [
  //   { key: 'o', text: 'Select', value: 'Select' },
  //       { key: 'm', text: 'Male', value: 'male' },
  //       { key: 'f', text: 'Female', value: 'female' },
  //     ];
  //     const optionst = [
  //       { key: 'o', text: 'Select', value: 'Select' },
  //       { key: 'm', text: 'Full-time', value: 'Full-time' },
  //       { key: 'f', text: 'Part-time', value: 'Part-time' },

  //     ]
  //     const optionsta = [
  //       { key: 'o', text: 'Select', value: 'Select' },
  //       { key: 'm', text: '15 Days', value: '15 Daya' },
  //       { key: 'f', text: '30 Days', value: '30 Days' },

  //     ]
  //     const optionstb = [
  //       { key: 's', text: 'Select', value: 'Select' },
  //       { key: 'm', text: 'Finance', value: 'Finance' },
  //       { key: 'f', text: 'Sales ', value: 'Part-timeC' },
  //       { key: 'o', text: 'Marketing ', value: 'Marketing' },
  //       { key: 'p', text: 'HR ', value: 'HR' },
  //       { key: 'q', text: 'Production ', value: 'Productione' },
  //       { key: 'r', text: 'IT ', value: 'ITc' },
  //     ]
  //     const optionstc = [
  //       { key: 'o', text: 'Select', value: 'Select' },
  //       { key: 'm', text: 'Morning', value: 'Morning' },
  //       { key: 'f', text: 'Evening', value: 'Evening' },  
  //     ]
  //     const optionste = [
  //       { key: 'o', text: 'Select', value: 'Select' },
  //       { key: 'm', text: 'Married', value: 'Married' },
  //       { key: 'f', text: 'Un-married', value: 'Un-married' },
  //     ]
  //     const optionstd = [
  //       { key: 'o', text: 'Select', value: 'Select' },
  //       { key: 'm', text: 'Bank', value: 'Bank' },
  //       { key: 'f', text: 'Check', value: 'Check' },
  //     ]
  const history = useNavigate();

  const handleDepartmentChange = (selectedDepartment) => {
    setDepartmentID(selectedDepartment);
  };

  const handleLevelChange = (selectedLevel) => {
    setSelectedLevel(selectedLevel);
  };

  const handleGenderChange = (selectedGender) => {
    setSelectedGender(selectedGender);
  };



  const onSubmit = async () => {
    const empoyeeResponse = await postAsync('BusinessPartner/Add', {
      code,
      designation,
      firstName,
      middleName,
      lastName,
      isActive,
      paramGenderID: selectedGender.value,
      departmentID: selectedDepartment.value,
      paramLevelID: selectedLevel.value
    });
    alert(empoyeeResponse.message);
    history('BusinessPartner')
  }
  //  const onSubmit = () => {
  //   axios.post (`http://localhost:5072/api/BusinessPartner/Add`, {
  //     empcode: empcode,
  //   fname: fname,
  //   lname: lname,
  //   mname: mname,
  //   gender: gender,
  //   dob: dob,
  //   doj: doj,
  //   etype: etype,
  //   emrgncyname: emrgncyname,
  //   relation: relation,
  //   jobapp: jobapp,
  //   conenddate: conenddate,
  //   offrdate: offrdate,
  //   notice: notice,
  //   confdate: confdate,
  //   dor: dor,
  //   departn: departn,
  //   gradee: gradee,
  //   desigg: desigg,
  //   reportto: reportto,
  //   branch: branch,
  //   deviceid: deviceid,
  //   holidays:holidays,
  //   shift: shift,
  //   salarymode: salarymode,
  //   bank: bank,
  //   bankacc: bankacc,
  //   payrollc: payrollc,
  //   pfacc: pfacc,
  //   hprovider: hprovider,
  //   hnumber: hnumber,
  //   status: status,
  //   bldgrp: bldgrp,
  //   fbg: fbg,
  //   healthd: healthd,
  //   cnic: cnic,
  //   issuedata: issuedata,
  //   expdate: expdate,
  //   uni: uni,
  //   program: program,
  //   level: level,
  //   passingyr: passingyr,
  //   excomp: excomp,
  //   exdesig: exdesig,
  //   exsalary: exsalary,
  //   add: add,
  //   exbranch: exbranch,
  //   stdate: stdate,
  //   endate: endate,
  //   salarystructure: salarystructure,
  //   name: name,
  //   desig: desig,
  //   rqskills: rqskills,
  //   des: des,
  //   resigdate: resigdate,
  //   exdate: exdate,
  //   relievingdate: relievingdate,
  //   feedback: feedback,
  //   newplace: newplace,
  //   reasonleaving: reasonleaving,
  //   })
  // .then(response=> {
  //   const lastCode = localStorage.getItem('lastEmployeeCode');
  //   if (lastCode) {
  //     const lastNumber = parseInt(lastCode.split('-')[1], 10);
  //     const newNumber = lastNumber + 1;
  //     const code = `E-${padNumber(newNumber, 4)}`;
  //     setEmpcode(code);
  //     localStorage.setItem('lastEmployeeCode', code);}  
  //           history("/empMD");
  // });}
  // const onSubmit = () => {
  //     axios.post (`http://localhost:5072/api/BusinessPartner/Add`, {
  //       empcode: empcode,
  //     fname: fname,
  //     lname: lname,
  //     mname: mname,
  //     gender: gender,
  //     dob: dob,
  //     doj: doj,
  //     etype: etype,
  //     emrgncyname: emrgncyname,
  //     relation: relation,
  //     jobapp: jobapp,
  //     conenddate: conenddate,
  //     offrdate: offrdate,
  //     notice: notice,
  //     confdate: confdate,
  //     dor: dor,
  //     departn: departn,
  //     gradee: gradee,
  //     desigg: desigg,
  //     reportto: reportto,
  //     branch: branch,
  //     deviceid: deviceid,
  //     holidays:holidays,
  //     shift: shift,
  //     salarymode: salarymode,
  //     bank: bank,
  //     bankacc: bankacc,
  //     payrollc: payrollc,
  //     pfacc: pfacc,
  //     hprovider: hprovider,
  //     hnumber: hnumber,
  //     status: status,
  //     bldgrp: bldgrp,
  //     fbg: fbg,
  //     healthd: healthd,
  //     cnic: cnic,
  //     issuedata: issuedata,
  //     expdate: expdate,
  //     uni: uni,
  //     program: program,
  //     level: level,
  //     passingyr: passingyr,
  //     excomp: excomp,
  //     exdesig: exdesig,
  //     exsalary: exsalary,
  //     add: add,
  //     exbranch: exbranch,
  //     stdate: stdate,
  //     endate: endate,
  //     salarystructure: salarystructure,
  //     name: name,
  //     desig: desig,
  //     rqskills: rqskills,
  //     des: des,
  //     resigdate: resigdate,
  //     exdate: exdate,
  //     relievingdate: relievingdate,
  //     feedback: feedback,
  //     newplace: newplace,
  //     reasonleaving: reasonleaving,
  //     })
  //   .then(response=> {
  //     const lastCode = localStorage.getItem('lastEmployeeCode');
  //     if (lastCode) {
  //       const lastNumber = parseInt(lastCode.split('-')[1], 10);
  //       const newNumber = lastNumber + 1;
  //       const code = `E-${padNumber(newNumber, 4)}`;
  //       setEmpcode(code);
  //       localStorage.setItem('lastEmployeeCode', code);}  
  //             history("/empMD");
  //   });}
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="MasterData" />
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
        </Box>
          <br></br>
        </h4>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >

        <Form className="create-form">
          <Form.Group widths='equal'>

            {/* <Form.Field
              control={Input}
              label='Employee ID'
              placeholder='Employee ID' required
              onChange={(e) => setBusinessPartnerID(e.target.value)}
            /> */}
            <Form.Field
              control={Input}
              label='First name'
              placeholder='First name' required
              onChange={(e) => setFirstname(e.target.value)}
            />
            <Form.Field
              control={Input}
              label='Middle Name'
              placeholder='Middle name' required
              onChange={(e) => setMiddlename(e.target.value)}
            />
            <Form.Field
              control={Input}
              label='Last name'
              placeholder='Last name' onChange={(e) => setLastname(e.target.value)}
            />
            <Form.Field
              control={Checkbox}
              label='Is Active'
              placeholder='Is Active'
              onChange={(e) => setIsActive(e.target.value)}
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

          {/* <Form.Group widths='equal'>
<Form.Field
          type='date'
            control={Input}
            label='Data of birth'
            placeholder='Enter DOJ'
            onChange={(e)=>setDOB(e.target.value)}
          /><Form.Field
          type='date'
            control={Input}
            label='Data of joining'
            placeholder='Enter DOJ' required
            onChange={(e)=>setDoj(e.target.value)}
          />
          <Form.Field
            control={Select}
            options={optionst}
            label='Employeement Type'
            placeholder='Enter Employeement type'  onChange={(e)=>setEtype(e.target.value)}
          /></Form.Group>
   {/* 

*/}

          {/* <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Emergency Contacts</h4>
        </Box>
        <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Name'
            placeholder='Enter Name' required
            onChange={(e)=>setEmrgncyName(e.target.value)}
          /><Form.Field
            control={Input}
            label='Relation'
            placeholder=''
            onChange={(e)=>setRelation(e.target.value)}
          />
         </Form.Group>

            <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Joining Details</h4>
        </Box>

        <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Job Applicant'
            placeholder='Enter Name'
            onChange={(e)=>setjobapp(e.target.value)}
          /><Form.Field
          type='date'
            control={Input}
            label='Contract End Date'
            placeholder=''
            onChange={(e)=>setConenddate(e.target.value)}
          />
         <Form.Field
          type='date'
            control={Input}
            label='Offer Date' 
            placeholder=''
            onChange={(e)=>setOffrdate(e.target.value)}
          />
         </Form.Group>
         <Form.Group widths='equal'>
<Form.Field
           control={Select}
           options={optionsta}
            label='Notice days'
            placeholder='Select'
            onChange={(e)=>setNotice(e.target.value)}
          /><Form.Field
          type='date'
            control={Input}
            label='Confirmation Date'
            placeholder=''
            onChange={(e)=>setConfdate(e.target.value)}
          />
         <Form.Field
          type='date'
            control={Input}
            label='Date of Retirement'
            placeholder=''
            onChange={(e)=>setDOR(e.target.value)}
          />
         </Form.Group>
            <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Department & Grade</h4></Box>

            <Form.Group widths='equal'>
<Form.Field
control={Select}
options={optionstb}
            label='Department' 
            placeholder='' 
            onChange={(e)=>setDepartn(e.target.value)}
          /><Form.Field
          control={Input}
          label='Grade'
          placeholder='' required
          onChange={(e)=>setGrade(e.target.value)}
        />
        <Form.Field
            control={Input}
            label='Designation'
            placeholder='' value={desigg}
            onChange={(e)=>SetDesigg(e.target.value)}
          />
         </Form.Group>

         <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Report to'
            placeholder=''
            onChange={(e)=>setReportto(e.target.value)}
          /><Form.Field
          control={Input}
          label='Branch'
          placeholder=''
          onChange={(e)=>SetBranch(e.target.value)}
        />
         </Form.Group>
      <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Attendance & Leave Details</h4></Box>
            <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Device Id'
            placeholder=''
            onChange={(e)=>setDeviceid(e.target.value)}
          /><Form.Field
          control={Input}
          label='Holidays'
          placeholder=''
          onChange={(e)=>setHolidays(e.target.value)}
        />
        <Form.Field
           control={Select}
           options={optionstc}
            label='Default Shifts'
            placeholder=''
            onChange={(e)=>setShift(e.target.value)}
          />
         </Form.Group>

  <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Bank Details</h4></Box>
            <Form.Group widths='equal'>
<Form.Field
         control={Select}
         options={optionstd}
            label='Salary Mode'
            placeholder=''
            onChange={(e)=>setSalarymode(e.target.value)}
          /><Form.Field
          control={Input}
          label='Bank'
          placeholder=''
          onChange={(e)=>setBank(e.target.value)}
        />
        <Form.Field
            control={Input}
            label='Bank Account #'
            placeholder=''
            onChange={(e)=>setbankAcc(e.target.value)}
          />
         </Form.Group>
         <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Payroll Cost Centre'
            placeholder=''
            onChange={(e)=>setPayrollc(e.target.value)}
          /><Form.Field
          control={Input}
          label='Provident Fund Account'
          placeholder=''
          onChange={(e)=>setPfacc(e.target.value)}
        />  </Form.Group>

<Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Health Insurance</h4></Box>

            <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Provider'
            placeholder=''
            onChange={(e)=>setHprovider(e.target.value)}
          /><Form.Field
          control={Input}
          label='Number'
          placeholder=''
          onChange={(e)=>setHnumber(e.target.value)}
        />
         </Form.Group>

<Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Contact Details</h4></Box>

            <Form.Group widths='equal'>
<Form.Field
           control={Select}
           options={optionste}
            label='Marital Status'
            placeholder=''
            onChange={(e)=>setStatus(e.target.value)}
          /><Form.Field
          control={Input}
          label='Blood Group'
          placeholder=''
          onChange={(e)=>setBldgrp(e.target.value)}
        />
        <Form.Field
            control={Input}
            label='Family Background'
            placeholder=''
            onChange={(e)=>setFbg(e.target.value)}
          />
         </Form.Group>
         <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Health Details'
            placeholder=''
            onChange={(e)=>setHealthd(e.target.value)}
          /><Form.Field
          control={Input}
          label='CNIC'
          placeholder='' required
          onChange={(e)=>setCnic(e.target.value)}
        />
        <Form.Field
        type='date'
            control={Input}
            label='Date of Issue'
            placeholder=''
            onChange={(e)=>setIssuedate(e.target.value)}
          />
          <Form.Field
type='date'
            control={Input}
            label='Valid upto'
            placeholder=''
            onChange={(e)=>setExpdate(e.target.value)}
          />
         </Form.Group>
        
   <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Educational Qualification</h4></Box>

            <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='University'
            placeholder=''
            onChange={(e)=>setUni(e.target.value)}
          /><Form.Field
          control={Input}
          label='Qualification/Program'
          placeholder=''
          onChange={(e)=>setProgram(e.target.value)}
        />
        <Form.Field
            control={Input}
            label='Level'
            placeholder=''
            onChange={(e)=>setLevel(e.target.value)}
          />
         </Form.Group> 

         <Form.Group widths='equal'>
<Form.Field
type='date'
            control={Input}
            label='Year of Passing'
            placeholder=''
            onChange={(e)=>setPassingyr(e.target.value)}
          />
         </Form.Group>
         <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Previous work Excperince</h4></Box>
         <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Company'
            placeholder=''
            onChange={(e)=>setExcomp(e.target.value)}
          />
           <Form.Field
            control={Input}
            label='Designation'
            placeholder='' value={exdesig}
            onChange={(e)=>setExdesig(e.target.value)}
          />
          <Form.Field
          control={Input}
          label='Salary'
          placeholder=''
          onChange={(e)=>setExsalary(e.target.value)}
        />
        <Form.Field
          control={Input}
          label='Address'
          placeholder=''
          onChange={(e)=>setAdd(e.target.value)}
        />
         </Form.Group>
          
             <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>History In Company</h4></Box>
          
            <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Branch'
            placeholder=''
            onChange={(e)=>setExbranch(e.target.value)}
          />
           <Form.Field
           type='date'
            control={Input}
            label='Start Date'
            placeholder=''
            onChange={(e)=>setStdate(e.target.value)}
          />
          <Form.Field
          type='date'
          control={Input}
          label='End Date'
          placeholder=''
          onChange={(e)=>setEndate(e.target.value)}
        />
         </Form.Group>

            <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Employee Grade</h4></Box>

            <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Salary Structure'
            placeholder=''
            onChange={(e)=>setSalarystructure(e.target.value)}
          />
           <Form.Field
            control={Input}
            label='Name'
            placeholder=''
            onChange={(e)=>setName(e.target.value)}
          />
         </Form.Group>

<Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Designation & Skills</h4></Box>

            <Form.Group widths='equal'>
<Form.Field
      control={Input}
      label='Designation'
      placeholder='' value={desig}
      onChange={(e)=>setDesig(e.target.value)}
    />
    <Form.Field
      control={Input}
      label='Required Skills'
      placeholder=''
      onChange={(e)=>setRqskills(e.target.value)}
    />
   <Form.Field
      control={Input}
      label='Description'
      placeholder=''
      onChange={(e)=>setDes(e.target.value)}
    />
   </Form.Group>

            <Box display="flex" justifyContent="space-between"  
        backgroundColor={colors.white[500]} color={colors.blue[900]}>
            <h4>Exit</h4></Box>


            <Form.Group widths='equal'>
<Form.Field
type='date'
            control={Input}
            label='Resignation Letter Date'
            placeholder=''
            onChange={(e)=>setResigdate(e.target.value)}
          />
           <Form.Field
type='date'
            control={Input}
            label='Exit in to Date'
            placeholder=''
            onChange={(e)=>setExdate(e.target.value)}c
          />
         <Form.Field
type='date'
            control={Input}
            label='Relieving Date'
            placeholder=''
            onChange={(e)=>setReleivingdate(e.target.value)}
          />
         </Form.Group>

         <Form.Group widths='equal'>
<Form.Field
            control={Input}
            label='Feedback'
            placeholder=''
            onChange={(e)=>setFeedback(e.target.value)}
          />
           <Form.Field
            control={Input}
            label='New work place '
            placeholder=''
            onChange={(e)=>setNewplace(e.target.value)}
          />
          <Form.Field
          control={Input}
          label='Reason for Leaving'
          placeholder=''
          onChange={(e)=>setReasonleaving(e.target.value)}
        />
         </Form.Group> */}
          {/*
            <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
</Form.Field>*/}
          <Button
            //  type="submit" disabled={!isFormValid}
            color='#0a1f2e' onClick={onSubmit}
          >Submit</Button>

        </Form>

      </Box>
    </Box>
  )

}

