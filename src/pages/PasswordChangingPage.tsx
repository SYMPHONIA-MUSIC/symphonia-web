import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import {styled, useTheme} from "@mui/material/styles";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import {evaluatePassword} from "../logic/PasswordUtils";
import LinearProgress from "@mui/material/LinearProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiAlert from "@mui/material/Alert";
import {checkPasswordsMatch, validatePassword} from "../logic/FormUtils";
import AuthService from "../logic/domain/AuthService";

type Props = {}

const Background = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        width: 'calc(100% + 20px)',
        height: 'calc(100% + 20px)',
        backgroundImage: 'url(/background/password.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)',
    }
}));

const Logo = styled('img')(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(10)
}));

const PasswordChangingPage: React.FC<Props> = ({}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [changeStatus, setChangeStatus] = useState<'success' | 'error' | null>(null)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('error');


    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [strengthLabel, setStrengthLabel] = useState<string>("Velmi slabé heslo");
    const [conditions, setConditions] = useState({
        length: false,
        number: false,
        specialChar: false
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

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

        if (token != null) {
            const isSuccess = await AuthService.resetPassword(password, token)
            setLoading(false);
            if (isSuccess) {
                setChangeStatus('success');
                setMessage('Heslo bylo úspěšně změněno, přesměrování na hlávní stránku');
                setTimeout(() => { window.location.href = '/login'; }, 5000);
            } else {
                setChangeStatus('error');
                setMessage('Změna hesla se nezdařila. Zkontrolujte prosím své údaje a zkuste to znovu');
            }
        }

    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box position="relative" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Background />
            <Container component="main" maxWidth="xs" sx={{
                backgroundColor: theme.palette.background.default,
                padding: '20px',
                borderRadius: '10px'
            }}>
                {changeStatus ? (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        {isMobile ? (
                            <Logo src="/logo/symphonia-logo.svg" alt="Logo" />
                        ) : (
                            <Box position="absolute" top={theme.spacing(2)} right={theme.spacing(2)}>
                                <Logo src="/logo/symphonia-logo.svg" alt="Logo" />
                            </Box>
                        )}
                        {changeStatus === 'success' ? (
                            <Box sx={{ color: 'green' }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {message}
                                </Typography>
                                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green' }} />
                            </Box>
                        ) : (
                            <Box sx={{ color: 'red' }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {message}
                                </Typography>
                                <ErrorOutlineIcon sx={{ fontSize: 60, color: 'red' }} />
                            </Box>
                        )}
                    </Box>
                ) : (<>
                        <Box display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-start'}>
                            {isMobile ? (
                                <Logo src="/logo/symphonia-logo.svg" alt="Logo" />
                            ) : (
                                <Box position="absolute" top={theme.spacing(2)} right={theme.spacing(2)}>
                                    <Logo src="/logo/symphonia-logo.svg" alt="Logo" />
                                </Box>
                            )}
                            <Typography component="h1" variant="h3" sx={{
                                color: theme.palette.text.primary,
                                mb: 3
                            }}>
                                Obnovení hesla
                            </Typography>
                            <Typography variant="body2" color="textSecondary"
                                        sx={{
                                            color: theme.palette.text.primary
                                        }} >
                                Zadej nové heslo
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit}>
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
                                <Typography component="div" sx={{ width: '100%', mt: 2, color: theme.palette.text.primary }}>
                                    {strengthLabel}
                                </Typography>
                                <LinearProgress variant="determinate" value={passwordStrength} sx={{ width: '100%', mb: 2 }} />
                                <Box sx={{ mt: 2, color: theme.palette.text.primary }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={conditions.length}
                                                           sx={{ color: theme.palette.text.primary }}/>}
                                        label="Minimálně 8 znaků"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={conditions.number}
                                                           sx={{ color: theme.palette.text.primary }}/>}
                                        label="Obsahuje čísla"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={conditions.specialChar}
                                                           sx={{ color: theme.palette.text.primary }}/>}
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
                                    Změnit heslo
                                </Button>
                            </Box>
                    </Box>
                </>)
                }
            </Container>

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
        </Box>
    );
}

export default PasswordChangingPage;