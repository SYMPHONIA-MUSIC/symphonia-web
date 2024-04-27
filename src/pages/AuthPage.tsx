import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import SocialLogin from "../components/auth/SocialLogin";
import {Backdrop, CircularProgress, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LogIn from "../components/auth/LogIn";

const AuthPage = () => {
    const[showLogin, setShowLogin] = React.useState(true);
    const { type } = useParams();
    const navigate = useNavigate();

    const theme = useTheme();

    useEffect(() => {
        if (type === "login") {
            setShowLogin(true);
        } else if (type === "register") {
            setShowLogin(false);
        } else {
            navigate("/not-found")
        }
    }, [type, navigate])

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/background/test.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: theme.palette.primary.main,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ bgcolor: 'background.default' }}>
                {showLogin ? <LogIn theme={theme} /> : null}
            </Grid>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress size={68} sx={{
                    color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
                }} />
            </Backdrop>

            <Snackbar open={open} autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
                    {message}
                </MuiAlert>
            </Snackbar>

        </Grid>
    )
}