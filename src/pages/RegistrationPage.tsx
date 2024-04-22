import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { validatePassword, checkPasswordsMatch } from '../logic/FormUtils';
import { evaluatePassword } from '../logic/PasswordUtils';
import AuthService from "../logic/domain/AuthService";
import {Backdrop, CircularProgress, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

type Props = {};

const RegistrationPage: React.FC<Props> = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('error');


    const theme = useTheme();

    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [strengthLabel, setStrengthLabel] = useState<string>("Velmi slabé heslo");
    const [conditions, setConditions] = useState({
        length: false,
        number: false,
        specialChar: false
    });

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { strength, label, conditions } = evaluatePassword(event.target.value);
        setPasswordStrength(strength);
        setStrengthLabel(label);
        setConditions(conditions);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const confirmPassword = data.get('confirmPassword') as string;

        if (!validatePassword(password)) {
            setMessage('Heslo musí mít minimálně 8 znaků, obsahovat čísla a speciální znaky');
            setSeverity('error');
            setOpen(true);
            setLoading(false);
            return;
        }

        if (!checkPasswordsMatch(password, confirmPassword)) {
            setMessage('Hesla se neshodují');
            setSeverity('error');
            setOpen(true);
            setLoading(false);
            return;
        }

        const isSuccess = await AuthService.register(email, password);
        setLoading(false);
        if (isSuccess) {
            setMessage('Registrace úspěšná!');
            setSeverity('success');
            setOpen(true);
            setTimeout(() => { window.location.href = '/login'; }, 3000);
        } else {
            setMessage('Registrace se nezdařila. Zkontrolujte prosím své údaje a zkuste to znovu.');
            setSeverity('error');
            setOpen(true);
        }
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/background/registration.jpg)',
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
                        Začni tvořit s námi!
                    </Typography>
                    <Typography sx={{ mt: 1, textAlign: 'center' }}>
                        Zaregistruj se a začni vytvářet svůj hudební styl!
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
                            autoComplete="new-password"
                            onChange={handlePasswordChange}
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
                        <Typography component="div" sx={{ width: '100%', mt: 2 }}>
                            {strengthLabel}
                        </Typography>
                        <LinearProgress variant="determinate" value={passwordStrength} sx={{ width: '100%', mb: 2 }} />
                        <Box sx={{ mt: 2 }}>
                            <FormControlLabel
                                control={<Checkbox checked={conditions.length} />}
                                label="Minimálně 8 znaků"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={conditions.number} />}
                                label="Obsahuje čísla"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={conditions.specialChar} />}
                                label="Obsahuje speciální znaky"
                            />
                        </Box>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Potvrď heslo"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Zaregistrovat se
                        </Button>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" component="span" sx={{ color: theme.palette.text.primary }}>
                                {"Už máš účet? "}
                            </Typography>

                            <Link
                                href="/artist/login"
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
                                Přihlásit se
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

export default RegistrationPage;
