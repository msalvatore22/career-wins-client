import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6a6a6a',
      main: '#454545',
      dark: '#303030',
      contrastText: '#fff',
    },
    secondary: {
      light: '#008394',
      main: '#00bcd4',
      dark: '#33c9dc',
      contrastText: '#000',
    }
  },
});

export default theme
