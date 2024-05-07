import React, {useEffect} from 'react';
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import {Backdrop, CircularProgress, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LogIn from "../components/auth/LogIn";
import Registration from "../components/auth/Registration";
import ArtistRegistrationPage from "./ArtistRegistrationPage";

export enum CredentialsType {
    BASIC = 'BASIC',
    GOOGLE = 'GOOGLE',
    FACEBOOK = 'FACEBOOK',
}

const AuthPage = () => {
    const[showLogin, setShowLogin] = React.useState(true);

    const theme = useTheme();

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/background/test.svg)',
                    backgroundColor: theme.palette.background.default,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ bgcolor: 'background.default' }}>
                <Routes>
                    <Route path="login" element={<LogIn />} />
                    <Route path="registration" element={<Registration />} />
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
            </Grid>
        </Grid>
    )
}

export default AuthPage;