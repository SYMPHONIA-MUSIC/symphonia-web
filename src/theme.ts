import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#855B9A',
        },
        secondary: {
            main: '#507F9E',
        },
        error: {
            main: '#C84545',
        },
        background: {
            default: '#1E1E1E',
        },
        text: {
            primary: '#FFF4E1',
        }
    },
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
        fontSize: 14
    },
});

export default theme;