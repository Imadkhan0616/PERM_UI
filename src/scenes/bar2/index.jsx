import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart2 from "../../components/BarChart2";

const Bar2 = () => {
  return (
    <Box m="20px">
      <Header title="Attendance" subtitle="  Today's Attendance department wise" />
      <Box height="75vh">
        <BarChart2 />
      </Box>
    </Box>
  );
};

export default Bar2;