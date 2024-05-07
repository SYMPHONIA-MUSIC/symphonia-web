import { Box } from '@mui/material';
import React, {useContext} from 'react';
import Typography from "@mui/material/Typography";
import AuthService from "../../logic/domain/AuthService";
import {UIProcessContext} from "../../contexts/UIProcessContext";
import {useTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SocialLogin from "./SocialLogin";
import StyledTextField from "../global/StyledTextField";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";


const LogIn: React.FC = () => {
    const { uiProcessContext, showMessage, setLoading, hideMessage } = useContext(UIProcessContext)
    const theme = useTheme()
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        const isSuccess = await AuthService.login(email, password);
        setLoading(false);
        if (isSuccess.result) {
            if (isSuccess.type === 'artist') {
                navigate('/artist/panel')
            } else {
                navigate('/user/panel')
            }
        } else {
            if (isSuccess.messageOnAlert != null) {
                showMessage(isSuccess.messageOnAlert, 'error')
            } else {
                showMessage('Přihlášení se nezdařilo. Zkontroluj prosím své přihlašovací údaje a zkus to znovu', 'error')
            }
        }
    };

    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img src="/logo/artist-logo.svg" alt="Symphonia Artist LogoBackground" />

            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 4 }}>
                Ahoj, vítej zpět!
            </Typography>
            <Typography sx={{ mt: 1 }}>
                Vrať se, a udělej velké věci ve světě hudby!
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mailová adresa"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />

                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Heslo"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <Grid container alignItems="center" justifyContent="flex-end">

                    <Grid item>
                        <Link component={RouterLink} to="/password-reset" variant="body2">
                            Zapomněli jsi heslo?
                        </Link>
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Přihlásit se
                </Button>

                <Box sx={{textAlign: 'center', mt: 2}}>
                    <Typography variant="body2" component="span" sx={{color: theme.palette.text.primary}}>
                        {"Ještě nejsi zaregistrován? "}
                    </Typography>

                    <Link
                        component={RouterLink}
                        to="/auth/registration"
                        variant="body2"
                        sx={{
                            color: theme.palette.secondary.main,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                                textDecorationColor: theme.palette.secondary.main,
                            }
                        }}
                    >
                        Vytvořit účet
                    </Link>
                </Box>
            </Box>
            <SocialLogin />
        </Box>
    )
}

export default LogIn;