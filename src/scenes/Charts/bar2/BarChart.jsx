import { Box } from "@mui/material";
import Header from "../../../components/Header";
import TotalAttendanceBarChart from "../../../components/Charts/Chartsjs/TotalAttendanceBarChart";

const Bar2 = () => {
  return (
    <Box m="20px">
      <Header title="Attendance" subtitle="  Today's Attendance department wise" />
      <Box height="75vh">
        <TotalAttendanceBarChart />
      </Box>
    </Box>
  );
};

export default Bar2;      