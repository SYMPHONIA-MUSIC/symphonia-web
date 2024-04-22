import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import AuthService from '../logic/domain/AuthService';
import {Backdrop, CircularProgress, Snackbar} from "@mui/material";

type Props = {};

const LoginPage: React.FC<Props> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<'success' | 'error'>('error');


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        const isSuccess = await AuthService.login(email, password);
        setLoading(false);
        if (isSuccess) {
            setMessage('Přihlášení proběhlo úspěšně!')
            setSeverity('success')
        } else {
            setMessage('Přihlášení se nezdařilo. Zkontroluj prosím své přihlašovací údaje a zkus to znovu.')
            setSeverity('error')
        }
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent<Element, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


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
                    backgroundImage: 'url(/background/login.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: theme.palette.primary.main,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ bgcolor: 'background.default' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src="/logo/artist-logo.svg" alt="Symphonia Artist Logo" />

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 4 }}>
                        Ahoj, vítej zpět!
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        Vrať se, a udělej velké věci ve světě hudby!
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mailová adresa"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            InputLabelProps={{
                                style: { color: theme.palette.text.primary }
                            }}
                            sx={{
                                '& label.Mui-focused': {
                                    color: theme.palette.primary.main,
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: theme.palette.primary.main,
                                },
                                '& .MuiOutlinedInput-root': {
                                    transition: 'border-color 0.3s ease',
                                    '& fieldset': {
                                        borderColor: theme.palette.text.primary,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: '3px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: '3px',
                                    },
                                    '& input': {
                                        color: theme.palette.text.primary,
                                        '&:hover': {
                                            color: theme.palette.primary.main,
                                        },
                                        transition: 'color 0.3s ease',
                                    },
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Heslo"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            InputLabelProps={{
                                style: { color: theme.palette.text.primary }
                            }}
                            sx={{
                                '& label.Mui-focused': {
                                    color: theme.palette.primary.main,
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: theme.palette.primary.main,
                                },
                                '& .MuiOutlinedInput-root': {
                                    transition: 'border-color 0.3s ease',
                                    '& fieldset': {
                                        borderColor: theme.palette.text.primary,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: '3px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: '3px',
                                    },
                                    '& input': {
                                        color: theme.palette.text.primary,
                                        '&:hover': {
                                            color: theme.palette.primary.main,
                                        },
                                        transition: 'color 0.3s ease',
                                    },
                                },
                            }}
                        />
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"
                                                       sx = {{
                                                           color: theme.palette.text.primary
                                                       }}
                                    />}
                                    label= "Pamatuj si mě"
                                />
                            </Grid>

                            <Grid item>
                                <Link href="#" variant="body2">
                                    Zapomněli jsi heslo?
                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Přihlásit se
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" component="span" sx={{ color: theme.palette.text.primary }}>
                                {"Ještě nejsi zaregistrován? "}
                            </Typography>

                            <Link
                                href="/artist/registration"
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
                </Box>
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
    );
}

export default LoginPage;
