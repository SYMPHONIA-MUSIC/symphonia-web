import React, {useState} from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    useMediaQuery,
    Backdrop,
    CircularProgress,
    Snackbar
} from "@mui/material";
import {styled, useTheme} from '@mui/material/styles';
import MuiAlert from "@mui/material/Alert";
import AuthService from "../logic/domain/AuthService";

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

type Props = {};

const PasswordResetPage: React.FC<Props> = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;

        const isSuccess = await AuthService.requestResetLink(email);
        setLoading(false);
        if (isSuccess) {
            setMessage('E-mail byl odeslán do vaší schránky pokud jste byl zaregistrován')
        } else {
            setMessage('Chyba při odesílání, zkuste to později')
        }
        setOpen(true);
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                        Zadej svou e-mailovou adresu a požádej o obnovení hesla
                    </Typography>
                    <TextField
                        variant="outlined"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Odeslat odkaz pro resetování
                    </Button>
                </Box>
            </Box>
            </Container>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress size={68} sx={{
                    color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
                }} />
            </Backdrop>

            <Snackbar open={open} autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="info">
                    {message}
                </MuiAlert>
            </Snackbar>

        </Box>
    );
}

export default PasswordResetPage;
