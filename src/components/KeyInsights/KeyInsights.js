import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { tokens } from "../../scenes/theme";
import Header from "../Header";
import { useNavigate } from "react-router";
import { Box, useTheme } from "@mui/material";
import SelectInput from "../../components/Select/SelectInput";
import { getAsync, postAsync } from "../../helper/axiosHelper";
import Chart from 'react-apexcharts';

export default function KeyInsights() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showDiv, setShowDiv] = useState(false);
  const [businessPartnerID, setBusinessPartnerID] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [seriesData, setSeriesData] = useState(null);
  const [labelData, setLabelData] = useState(null);

  const history = useNavigate();

  const handleEmployeeChange = (selectedEmployee) => {
    setSelectedEmployee(selectedEmployee);

    getAsync('EmployeePerformance', { 'BusinessPartnerID': selectedEmployee.value.toString() })
      .then((res) => {
        let series = [];
        series.push(res.data[0].taskPoint);
        series.push(res.data[0].attendancePoint);
        series.push(res.data[0].ratingPoint);

        setSeriesData(series);
        
        setLabelData(['Task Point', 'Attendance Point', 'Rating Point']);
        setReportData(res.data);
      })
      .catch((err) => {
        alert(`Could not process report. ${err}.`)
      });
  };

  return (
    <Box m="20px">
      <Header title="KeyInsights" subtitle="Create KeyInsights" />
      <Box
        display="flex"
        justifyContent="space-between"
        backgroundColor={colors.white[500]}
        color={colors.blue[900]}
      >
        <Form className="create-form">
          <div className="mb-6">
            {/* <label for="text">Employee </label>
            <SelectInput placeholde="Select Employee" apiUrl="BusinessPartner" valueField="businessPartnerID" lableField="Employee" selectedOption={selectedEmployee} onValueChange={handleEmployeeChange} />
          */}
            <label for="text">Employee </label>
            <SelectInput
              placeholde="Select Employee"
              apiUrl="BusinessPartner"
              valueField="businessPartnerID"
              lableField="nameWithCode"
              selectedOption={selectedEmployee}
              onValueChange={handleEmployeeChange} />
          </div>
          <Box
            display="flex"
            justifyContent="space-between"
            backgroundColor={colors.white[500]}
            color={colors.blue[900]}
          >
            <h4>
              {" "}
              <Box>
                {/* <Button
                  sx={{
                    backgroundColor: colors.white[100],
                    color: colors.blue[900],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "15px",
                    boxShadow: "1px 2px 9px #aed7f4",
                  }}
                  onClick={handleSpecifyKeyInsights}
                >
                  <ArrowDropDownCircleOutlinedIcon sx={{ mr: "10px" }} />
                  Specify KeyInsights
                </Button> */}
              </Box>{" "}
              <br></br>
            </h4>
          </Box>
          <br></br>
          <br></br>
          {reportData &&
            <>
              <table className="table-stripped table-bordered">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Task Point</th>
                    <th>Attendance Point</th>
                    <th>Rating Point</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    reportData.map((report, index) => {
                      return (
                        <tr>
                          <td>{report.employeeName}</td>
                          <td>{report.department}</td>
                          <td>{report.taskPoint}</td>
                          <td>{report.attendancePoint}</td>
                          <td>{report.ratingPoint}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <div id="chart">
                <Chart
                  type="pie"
                  series={seriesData}
                  options={{ labels: labelData }}
                  width={380}
                  height={300}>
                </Chart>
              </div>
            </>
          }
        </Form>
      </Box>
    </Box>
  );
}
