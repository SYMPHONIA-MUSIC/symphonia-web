import React, {useContext, useState} from 'react';
import {styled, useTheme} from "@mui/material/styles";
import {evaluatePassword} from "../../logic/PasswordUtils";
import {checkPasswordsMatch, validatePassword} from "../../logic/FormUtils";
import AuthService from "../../logic/domain/AuthService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {UIProcessContext} from "../../contexts/UIProcessContext";
import SocialLogin from "./SocialLogin";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import StyledTextField from "../global/StyledTextField";
import {Link as RouterLink, useNavigate} from "react-router-dom";

export type RegistrationType = 'user' | 'artist';

const Registration: React.FC = () => {
    const { uiProcessContext, showMessage, setLoading, hideMessage } = useContext(UIProcessContext)
    const theme = useTheme();
    const navigate = useNavigate();

    const CustomToggleButton = styled(ToggleButton)({
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
        '&:hover': {
            backgroundColor: '#9B9B9B',
            color: theme.palette.text.primary,
        },
        border: '1px solid #9B9B9B',
        borderRadius: 5,
        color: theme.palette.text.primary
    });


    const [registrationType, setRegistrationType] = useState<RegistrationType>('user');

    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [strengthLabel, setStrengthLabel] = useState<string>("Velmi slabé heslo");
    const [conditions, setConditions] = useState({
        length: false,
        number: false,
        specialChar: false
    });

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: RegistrationType) => {
        if (newAlignment) {
            setRegistrationType(newAlignment);
        }
    };

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
            setLoading(false);
            showMessage('Heslo musí mít minimálně 8 znaků, obsahovat čísla a speciální znaky', 'error')
            return;
        }

        if (!checkPasswordsMatch(password, confirmPassword)) {
            setLoading(false);
            showMessage('Hesla se neshodují', 'error')
            return;
        }

        const isSuccessCheck = await AuthService.checkIfEmailExists(email);
        setLoading(false);
        if (isSuccessCheck) {
            setLoading(false);
            sessionStorage.setItem('registrationType', registrationType);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);

            if (registrationType === "artist") {
                navigate('/auth/artist-reg')
            } else {
                sessionStorage.setItem('credentialsType', 'BASIC');
                navigate('/auth/user-reg')
            }
        } else {
            setLoading(false);
            showMessage('E-mail je již obsazen', 'error')
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
                Začni tvořit s námi!
            </Typography>
            <Typography sx={{ mt: 1, textAlign: 'center' }}>
                Zaregistruj se a začni vytvářet svůj hudební styl!
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
                <Typography sx={{ mt: 4, textAlign: 'left' }}>
                    Kým chceš být?
                </Typography>

                <ToggleButtonGroup
                    value={registrationType}
                    exclusive
                    onChange={handleChange}
                    aria-label="text alignment"
                    fullWidth
                >
                    <CustomToggleButton value="user" aria-label="left aligned">
                        Poslouchač
                    </CustomToggleButton>
                    <CustomToggleButton value="artist" aria-label="right aligned">
                        Umělec
                    </CustomToggleButton>
                </ToggleButtonGroup>

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
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
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

                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Potvrď heslo"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
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
                        component={RouterLink}
                        to="/auth/login"
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
            {registrationType === 'user' && <SocialLogin />}
        </Box>
    )
}

export default Registration