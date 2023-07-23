import { Typography, Box, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from '../scenes/theme';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"  color={colors.blue[900]} fontWeight="bold" sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.blue[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;