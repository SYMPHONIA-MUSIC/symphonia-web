import React, {useContext, useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Container,
    Typography,
    useMediaQuery
} from '@mui/material';
import { UIProcessContext } from '../contexts/UIProcessContext';
import Background from '../components/auth/background/Background';
import LogoBackground from '../components/auth/background/LogoBackground';
import StyledTextField from '../components/global/StyledTextField';
import CircleImageUploader from '../components/auth/CircleImageUploader';
import AuthService from "../logic/domain/AuthService";
import {RegistrationType} from "../components/auth/Registration";
import DataService from "../logic/domain/DataService";

const ArtistRegistrationPage: React.FC = () => {
    const { uiProcessContext, showMessage, setLoading, hideMessage } = useContext(UIProcessContext);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [authorImage, setAuthorImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleImageChange = (file: File) => {
        setAuthorImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        setLoading(true)
        const registrationType = sessionStorage.getItem('registrationType');
        const storedEmail = sessionStorage.getItem('email');
        const storedPassword = sessionStorage.getItem('password');


        if (!registrationType || !storedEmail || !storedPassword || registrationType !== 'artist') {
            setLoading(false)
            window.location.href = '/auth/registration';
        }
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
        }
        setLoading(false)

        window.addEventListener('beforeunload', clearSessionStorage);

        return () => {
            window.removeEventListener('beforeunload', clearSessionStorage);
        };
    }, []);

    const clearSessionStorage = () => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('registrationType');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username || !description) {
            showMessage('Vyplň prosím všechna povinná pole', 'error');
            return;
        }
        setLoading(true);
        setIsButtonDisabled(true);

        const isSuccess = await AuthService.registerArtist(email, password, username, description);

        if (isSuccess.result) {
            if (authorImage) {
                const uploadSuccess = await DataService.updateArtistPhoto(authorImage);
                if (uploadSuccess) {
                    showMessage('Umělec byl úspěšně zaregistrován a fotografie byla úspěšně nahrána', 'success');
                } else {
                    showMessage('Umělec byl úspěšně zaregistrován ale nepodařilo se nahrát fotografie. Zkuste to znovu později.', 'warning');
                }
            } else {
                showMessage('Umělec byl úspěšně zaregistrován', 'success');
            }
            setLoading(false);
            setTimeout(function() {
                window.location.href = '/artist/panel';
            }, 3000);
        } else {
            showMessage('Registrace nebyla úspěšná. Zkuste to znovu později.', 'error');
            clearSessionStorage()
            setLoading(false);
            setTimeout(function() {
                window.location.href = '/auth/registration';
            }, 3000);
        }
    };

    return (
        <Box position="relative" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Background />
            <Container component="main" maxWidth="xs" sx={{
                backgroundColor: theme.palette.background.default,
                padding: '20px',
                borderRadius: '10px'
            }}>
                <Box display="flex" flexDirection="column" alignItems={isMobile ? 'center' : 'flex-start'}>
                    <LogoBackground src="/logo/symphonia-logo.svg" alt="LogoBackground" theme={theme} isMobile={isMobile} />
                    <Typography component="h1" variant="h3" sx={{
                        color: theme.palette.text.primary,
                        mb: 1
                    }}>
                        Řekni nám něco o sobě!
                    </Typography>
                    <Typography sx={{
                        color: theme.palette.text.primary,
                        mb: 2
                    }}>
                        To nám pomůže představit tě tvým posluchačům.
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexDirection: 'column' }}>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                                Nahraj svou fotografii
                            </Typography>
                            <CircleImageUploader onChange={handleImageChange} />
                        </Box>
                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="Tvoje uživatelské jméno"
                            type="text"
                            id="username"
                            autoComplete="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Řekni nám něco o sebe"
                            type="text"
                            id="description"
                            autoComplete="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isButtonDisabled}
                        >
                            Zaregistrovat se
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ArtistRegistrationPage;
