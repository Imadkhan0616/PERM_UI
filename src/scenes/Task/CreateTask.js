import React, { useState } from 'react';
import { Button, checkbox, Form } from 'semantic-ui-react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { tokens } from "../theme";
import Header from '../../components/Header';
import { useNavigate } from "react-router";
import { Box, useTheme } from '@mui/material'
import { postAsync } from '../../helper/axiosHelper';
import SelectInput from '../../components/Select/SelectInput';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function CreateTask() {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const [taskID, setTaskID] = useState('');
      const [code, setCode] = useState('');
      const [paramTaskTypeID, setParamTaskTypeID] = useState('');
      const [paramTaskPriorityID, setParamTaskPriorityID] = useState('');
      const [paramTaskStatusID, setParamTaskStatusID] = useState('');
      const [taskName, setTaskName] = useState('');
      const [taskDescription, setTaskDescription] = useState('');
      const [isActive, setIsActive] = useState('');
      const [deadline, setDeadline] = useState('');
      const [targetCompletionDate, setTargetCompletiondate] = useState('');
      const [assignedto, setAssignedto] = useState(null);
      const [assignedby, setAssignedby] = useState(null);
      const [selectedTaskType, setTaskTypeID] = useState(null);
      const [selectedTaskPriority, setTaskPriority] = useState(null);
      const [selectedTaskStatus, setTaskStatus] = useState(null);

      const history = useNavigate();

      const handleAssignedToChange = (selectedValue) => {
            setAssignedto(selectedValue);
      };

      const handleAssignedByChange = (selectedValue) => {
            setAssignedby(selectedValue);
      };

      const handleTaskTypeChange = (selectedTaskType) => {
            setTaskTypeID(selectedTaskType);
      };

      const handleTaskPriorityChange = (selectedTaskPriority) => {
            setTaskPriority(selectedTaskPriority);
      };

      const handleTaskStatusChange = (selectedTaskStatus) => {
            setTaskStatus(selectedTaskStatus);
      };

      const employeeDataSourceApply = (employeeData = []) => {
            return employeeData.filter(item => item.paramLevelID > 71);
      };

      const onSubmit = async () => {
            const taskResponse = await postAsync('Tasks/Add', {
                  taskID,
                  code,
                  paramTaskTypeID,
                  paramTaskPriorityID,
                  paramTaskStatusID,
                  taskName,
                  taskDescription,
                  isActive,
                  deadline,
                  targetCompletionDate,
                  assignedby,
                  assignedto
            });
            alert(taskResponse.message);
            history('/Tasks')

      }
      return (
            <Box m="20px">
                  <Box display="flex" justifyContent="space-between" alignItems="center" >
                        <Header title="Employee Tasks" />
                        <Box>
                              <Link to={`/ReadTask`}>
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

                                          Show Tasks
                                    </Button>
                              </Link>
                        </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between"
                        backgroundColor={colors.white[100]} color={colors.blue[900]}  >
                        <Form className="create-form">
                              <div className="mb-3">

                                    <label for="text">Code:</label>
                                    <input type="text" id="txct2"
                                          placeholder="Code" name="code" sx={{ width: '20px', Height: '40px' }}
                                          onChange={(e) => setCode(e.target.value)} />

                                    <label for="text">Task Type:</label>
                                    <SelectInput
                                          placeholder="Select Task Type"
                                          searchHeader={{ 'SearchColumn': 'ApplicationParamMasterID', 'SearchValue': '4' }}
                                          apiUrl="ApplicationParam"
                                          valueField="paramApplicationDetailID"
                                          lableField="paramKey"
                                          selectedOption={selectedTaskType}
                                          onValueChange={handleTaskTypeChange} />

                                    <label for="text">Task Priority:</label>
                                    <SelectInput
                                          placeholde="Select Task Priority"
                                          searchHeader={{ 'SearchColumn': 'ApplicationParamMasterID', 'SearchValue': '5' }}
                                          apiUrl="ApplicationParam"
                                          valueField="paramApplicationDetailID"
                                          lableField="paramKey"
                                          selectedOption={selectedTaskPriority}
                                          onValueChange={handleTaskPriorityChange} />

                                    <label for="text">Task Status:</label>
                                    <SelectInput
                                          placeholde="Select Task Status"
                                          searchHeader={{ 'SearchColumn': 'ApplicationParamMasterID', 'SearchValue': '11' }}
                                          apiUrl="ApplicationParam"
                                          valueField="paramApplicationDetailID"
                                          lableField="paramKey"
                                          selectedOption={selectedTaskStatus}
                                          onValueChange={handleTaskStatusChange} />

                                    <label for="text">Title:</label>
                                    <input type="text" id="txct2"
                                          placeholder="Title" name="reason" sx={{ width: '20px', Height: '40px' }}
                                          onChange={(e) => setTaskName(e.target.value)} />

                                    <label for="text">Description:</label>
                                    <input type="text" id="txct2"
                                          placeholder="Description" name="reason" sx={{ width: '20px', Height: '40px' }}
                                          onChange={(e) => setTaskDescription(e.target.value)} />
                                    <br></br>

                                    <label for="text">Status:</label>
                                    <input type="checkbox" id="txct2"
                                          placeholder="isActive" name="reason" sx={{ width: '20px', Height: '40px' }}
                                          onChange={(e) => setIsActive(e.target.value)} />
                                    <br></br>

                                    <label for="pwd">Deadline:</label>
                                    <input type="date" id="txt1"
                                          name="fromdate" required
                                          sx={{ width: '20px', Height: '40px' }}
                                          onChange={(e) => setDeadline(e.target.value)} />

                                    <label for="pwd">Completion Date:</label>
                                    <input type="date" id="txt1"
                                          name="fromdate"
                                          onChange={(e) => setTargetCompletiondate(e.target.value)} />

                                    <label for="text">Assigned to:</label>
                                    <SelectInput
                                          placeholder="Select Employee"
                                          apiUrl="BusinessPartner"
                                          valueField="businessPartnerID"
                                          lableField="nameWithCode"
                                          selectedOption={assignedto}
                                          onValueChange={handleAssignedToChange} />

                                    <label for="text">Assigned by:</label>
                                    <SelectInput
                                          onDataSourceApply={employeeDataSourceApply}
                                          placeholder="Select Employee"
                                          apiUrl="BusinessPartner"
                                          valueField="businessPartnerID"
                                          lableField="nameWithCode"
                                          selectedOption={assignedby}
                                          onValueChange={handleAssignedByChange} />

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