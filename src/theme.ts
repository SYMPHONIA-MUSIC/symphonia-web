import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypeBackground {
        alternate?: string;
    }
}

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
            alternate: '#2E2E2E',
        },
        text: {
            primary: '#FFF4E1',
            secondary: '#686868'
        }
    },
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
        fontSize: 14
    },
});

export default theme;