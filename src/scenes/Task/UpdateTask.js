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
import moment from "moment/moment";
import SelectInput from '../../components/Select/SelectInput';


export default function UpdateTask() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  const [code, setCode] = useState('');
  const [taskType, setTaskType] = useState('');
  const [taskPriority, setPriority] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isActive, setIsActive] = useState('');
  const [deadline, setDeadline] = useState('');
  const [targetCompletionDate, setTargetCompletiondate] = useState('');
  const [assignedto, setAssignedto] = useState('');
  const [assignedby, setAssignedby] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTaskType, setTaskTypeID] = useState(null);
  const [selectedTaskPriority, setTaskPriority] = useState(null);
  const [selectedTaskStatus, setTaskStatus] = useState(null);

  const fetchData = async () => {
    const taskResponse = await getAsync('Tasks', { 'SearchColumn': 'taskID', 'SearchValue': id.toString() })
      .catch((error) => {
        console.error('Error fetching tasks data:', error);
      });
    const task = taskResponse.data.list[0];

    console.log(task);
    console.log(moment(task.deadline).format('MM/DD/YYYY'));

    setCode(task.code);
    // setTaskType(task.taskType);
    // setPriority(task.taskPriority);
    setTaskName(task.taskName);
    setTaskDescription(task.taskDescription);
    setIsActive(task.isActive);
    setDeadline(moment(task.deadline).format('MM/DD/YYYY'));
    setTargetCompletiondate(moment(task.targetCompletionDate).format('MM/DD/YYYY'));
    // setAssignedto(task.assignedto);
    // setAssignedby(task.assignedby);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEmployeeChange = (selectedValue) => {
    setSelectedEmployee(selectedValue);
};

const handleTaskTypeChange = (selectedTaskType) =>{
  setTaskTypeID(selectedTaskType);
};

const handleTaskPriorityChange = (selectedTaskPriority) =>{
  setTaskPriority(selectedTaskPriority);
};

const handleTaskStatusChange = (selectedTaskStatus) =>{
  setTaskStatus(selectedTaskStatus);
};

  const onSubmit = async () => {
    await putAsync('Task/Update', {
      taskID: id,
      taskName,
      taskDescription,
      isActive,
      deadline,
      targetCompletionDate
    }).then((response) => {
      alert(response.message);
      navigate('/ReadTask')
    })
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Employee Tasks" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.white[100],
              color: colors.blue[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px", borderRadius: '15px', boxShadow: '1px 2px 9px #aed7f4'
            }} href='/ReadTask'
          >
            Show Tasks          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"
        backgroundColor={colors.white[100]} color={colors.blue[900]}  >
        <Form className="create-form">
          <div className="mb-3">

            {/* <label for="text">Employee Id</label>
      <input type="number" min="0" step="1" 
            placeholder="Enter Task ID" name="empid" required
            onChange={(e)=>setTaskID(e.target.value)} /> */}

            <label for="text">Title:</label>
            <input type="text" id="txct2"
              placeholder="Title" name="reason" sx={{ width: '20px', Height: '40px' }}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)} />

<label for="text">Task Type:</label>
                                    <SelectInput
                                          placeholde="Select Task Type"
                                          apiUrl="Tasks"
                                          valueField="paramTaskTypeID"
                                          lableField="paramTaskTypeID"
                                          selectedOption={selectedTaskType}
                                          onValueChange={handleTaskTypeChange} />

                                    <label for="text">Task Priority:</label>
                                    <SelectInput
                                          placeholde="Select Task Priority"
                                          apiUrl="Tasks"
                                          valueField="paramTaskPriorityID"
                                          lableField="paramTaskPriorityID"
                                          selectedOption={selectedTaskPriority}
                                          onValueChange={handleTaskPriorityChange} />

                                    <label for="text">Task Status:</label>
                                    <SelectInput
                                          placeholde="Select Task Status"
                                          apiUrl="Tasks"
                                          valueField="paramTaskStatusID"
                                          lableField="paramTaskStatusID"
                                          selectedOption={selectedTaskStatus}
                                          onValueChange={handleTaskStatusChange} />

            <label for="text">Description:</label>
            <input type="text" id="txct2"
              placeholder="Description" name="reason" sx={{ width: '20px', Height: '40px' }}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)} />
            <label for="text">Status:</label>
            <input type="checkbox" id="txct2"
              placeholder="isActive" name="reason" sx={{ width: '20px', Height: '40px' }}
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)} />

            {/* <label for="Type">Status</label>
<select id="Type" name="Type" onChange={(e)=>setStatus(e.target.value)} >
<option value="">Select</option>
<option value="Completed">Completed</option>
<option value="In-progress">In-progress</option>
<option value="On-hold">On-hold</option>
<option value="Over-due">Over-due</option>
<option value="Awaited Review">Awaited Review</option>

</select> */}

            {/* <label for="text">Task Priority Id</label>
      <input type="number" min="0" step="1" 
            placeholder="Enter Employee ID" name="TPid" requiredc
            onChange={(e)=>setTPid(e.target.value)} /> */}

            <label for="pwd">Deadline:</label>
            <input type="date" id="txt1"
              name="fromdate" required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value).format} />

            <label for="pwd">Completion Date:</label>
            <input type="date" id="txt1"
              name="fromdate"
              value={targetCompletionDate}
              onChange={(e) => setTargetCompletiondate(e.target.value)} />

            <label for="text">Assigned to:</label>
            <SelectInput
              placeholde="Select Employee"
              apiUrl="BusinessPartner"
              valueField="businessPartnerID"
              lableField="code"
              selectedOption={selectedEmployee}
              onValueChange={handleEmployeeChange} />

            <label for="text">Assigned by:</label>
            <SelectInput
              placeholde="Select Employee"
              apiUrl="BusinessPartner"
              valueField="businessPartnerID"
              lableField="code"
              selectedOption={selectedEmployee}
              onValueChange={handleEmployeeChange} />

            {/* <label for="text">Task Type Id</label>
      <input type="number" min="0" step="1" 
            placeholder="Enter Employee ID" name="TPid" required
            onChange={(e)=>setTypeid(e.target.value)} /> */}
          </div>
          <Button
            type="submit" color='#0a1f2e' className="btn-primary" onClick={onSubmit}
          >Submit</Button>

        </Form>

      </Box>
    </Box>

  )

}