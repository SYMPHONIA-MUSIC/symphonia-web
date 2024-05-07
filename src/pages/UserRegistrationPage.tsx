import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Typography} from '@mui/material';

import UserAuthBackground from "../components/auth/background/UserAuthBackground";
import {useTheme} from "@mui/material/styles";
import AuthService from "../logic/domain/AuthService";
import {UIProcessContext} from "../contexts/UIProcessContext";
import StepZero from "../components/steps/StepZero";
import StepOne from "../components/steps/StepOne";
import StepTwo from "../components/steps/StepTwo";
import StepThree from "../components/steps/StepThree";
import StepFour from "../components/steps/StepFour";
import DataService from "../logic/domain/DataService";
import {CredentialsType} from "./AuthPage";
import SocialAuthService from "../logic/domain/SocialAuthService";
import {useNavigate} from "react-router-dom";

const artists = [
    { id: 'artist-1', name: 'STEIN27', picture: '/mocks/stein27.jpg' },
    { id: 'artist-2', name: 'DRAKE', picture: '/mocks/Scorpion_by_Drake.jpg' },
    { id: 'artist-3', name: 'Alan Walker', picture: '/mocks/alanwalker.jpg' },
    { id: 'artist-4', name: 'Calin', picture: '/mocks/calini.jpg' },
];

const genres = [
    { name: 'Rock', backgroundImage: '/mocks/genre/rock.jpeg' },
    { name: 'Rave', backgroundImage: '/mocks/genre/rave.jpg' },
    { name: 'Rap', backgroundImage: '/mocks/genre/rap.jpg' },
    { name: 'Rave', backgroundImage: '/mocks/genre/rave.jpg' },
    { name: 'Rap', backgroundImage: '/mocks/genre/rap.jpg' },
]

const UserRegistrationPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { uiProcessContext, showMessage, setLoading, hideMessage } = useContext(UIProcessContext);

    // State declarations
    const [activeStep, setActiveStep] = useState(0);
    const [marketingChecked, setMarketingChecked] = useState(false);
    const [shareDataChecked, setShareDataChecked] = useState(false);
    const [username, setUsername] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // Auth types credentials
    const [credentialsType, setCredentialsType] = useState<CredentialsType>(CredentialsType.BASIC);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idToken, setIdToken] = useState('');
    const [accessToken, setAccessToken] = useState('');

    // Handlers for UI actions
    const handleMarketingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarketingChecked(event.target.checked);
    };

    const handleShareDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShareDataChecked(event.target.checked);
    };

    const handleSelectGenre = (genre: string) => {
        setSelectedGenres(prevSelected => prevSelected.includes(genre)
            ? prevSelected.filter(g => g !== genre)
            : [...prevSelected, genre]
        );
    };

    const handleSelectArtist = (artistId: string) => {
        setSelectedArtists(prevSelected => prevSelected.includes(artistId)
            ? prevSelected.filter(id => id !== artistId)
            : [...prevSelected, artistId]
        );
    };

    const handleImageChange = (file: File) => {
        setImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            navigate('/auth/registration')
        } else {
            setActiveStep(prevActiveStep => prevActiveStep - 1);
        }
    };

    const checkMarketingAndShareData = () => {
        if (marketingChecked && shareDataChecked) {
            handleNext();
        } else {
            showMessage('Prosím, potvrď obě podmínky', 'error');
        }
    };

    const checkUsernameAvailability = async () => {
        setLoading(true);
        if (username === '') {
            showMessage('Zadej jméno uživatele', 'error');
            setLoading(false);
            return;
        }

        try {
            const response = await AuthService.checkIfUsernameIsAvailable(username);
            if (response.isAvailable) {
                handleNext();
            } else {
                showMessage(response.message, 'error');
            }
        } catch (error) {
            showMessage('Při kontrole dostupnosti uživatelského jména došlo k chybě', 'error');
        }
        setLoading(false);
    };

    const handleFinalRegistration = async () => {
        setIsButtonDisabled(true);
        setLoading(true);

        let registerResult;
        if (credentialsType === CredentialsType.BASIC) {
            registerResult = await AuthService.registerUser(email, password, username, selectedArtists, selectedGenres);
        } else if (credentialsType === CredentialsType.GOOGLE) {
            registerResult = await SocialAuthService.registerUserByGoogle(idToken, username, selectedArtists, selectedGenres);
        } else if (credentialsType === CredentialsType.FACEBOOK) {
            registerResult = await SocialAuthService.registerUserByFacebook(accessToken, username, selectedArtists, selectedGenres);
        } else {
            setLoading(false);
            showMessage('Registrace selhala. Zkus to později.', 'error');
            return
        }

        if (registerResult.result) {
            if (image) {
                const photoUploadSuccess = await DataService.updatePhoto(image, "user");
                if (photoUploadSuccess) {
                    showMessage('Registrace proběhla úspěšně a fotografie byla nahrána!', 'success');
                } else {
                    showMessage('Registrace proběhla úspěšně, ale nahrání fotografie selhalo. Zkus to později', 'warning');
                }
            } else {
                showMessage('Registrace proběhla úspěšně!', 'success');
            }

            setTimeout(() => {
                navigate('/user/panel')
            }, 3000);
        } else {
            showMessage('Registrace selhala. Zkus to později.', 'error');
            setTimeout(() => {
                navigate('/auth/registration')
            }, 3000);
        }


        sessionStorage.clear();
        setLoading(false);
        setIsButtonDisabled(false);
    };

    // Effects
    useEffect(() => {
        setLoading(true);
        const registrationType = sessionStorage.getItem('registrationType');
        const storedEmail = sessionStorage.getItem('email');
        const storedPassword = sessionStorage.getItem('password');
        const storedIdToken = sessionStorage.getItem('idToken');
        const storedAccessToken = sessionStorage.getItem('accessToken');
        const storedCredentialsType = sessionStorage.getItem('credentialsType');

        if (registrationType === 'user' && storedCredentialsType !== null) {
            console.log('Registration Type:', registrationType);
            console.log('Stored Credentials Type:', storedCredentialsType);

            if (storedCredentialsType === CredentialsType.BASIC && storedEmail !== null && storedPassword !== null) {
                console.log('Setting credentials for BASIC auth:', storedEmail);
                setCredentialsType(CredentialsType.BASIC);
                setEmail(storedEmail);
                setPassword(storedPassword);
            } else if (storedCredentialsType === CredentialsType.GOOGLE && storedIdToken !== null) {
                console.log('Setting credentials for GOOGLE auth');
                setCredentialsType(CredentialsType.GOOGLE);
                setIdToken(storedIdToken);
            } else if (storedCredentialsType === CredentialsType.FACEBOOK && storedAccessToken !== null) {
                console.log('Setting credentials for FACEBOOK auth');
                setCredentialsType(CredentialsType.FACEBOOK);
                setAccessToken(storedAccessToken);
            } else {
                console.log('Redirecting to registration, conditions not met');

                clearSessionStorage()
                setLoading(false);
                navigate('/auth/registration')
            }
        } else {
            clearSessionStorage()
            console.log('Redirecting to registration, conditions not met');
            setLoading(false);
            navigate('/auth/registration')
        }

        setLoading(false);

        window.addEventListener('beforeunload', clearSessionStorage);
        return () => {
            window.removeEventListener('beforeunload', clearSessionStorage);
        };
    }, []);

    const clearSessionStorage = () => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('registrationType');
        sessionStorage.removeItem('idToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('credentialsType');
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <StepZero
                        marketingChecked={marketingChecked}
                        handleMarketingChange={handleMarketingChange}
                        shareDataChecked={shareDataChecked}
                        handleShareDataChange={handleShareDataChange}
                        onNext={checkMarketingAndShareData}
                    />
                );
            case 1:
                return (
                    <StepOne
                        username={username}
                        setUsername={setUsername}
                        checkUsernameAvailability={checkUsernameAvailability}
                    />
                );
            case 2:
                return (
                    <StepTwo
                        image={image}
                        setImage={setImage}
                        onNext={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                    />
                );
            case 3:
                return (
                    <StepThree
                        artists={artists}
                        selectedArtists={selectedArtists}
                        handleSelectArtist={handleSelectArtist}
                        onNext={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                    />
                );
            case 4:
                return (
                    <StepFour
                        genres={genres}
                        selectedGenres={selectedGenres}
                        handleSelectGenre={handleSelectGenre}
                        onNext={handleFinalRegistration}
                        isButtonDisabled={isButtonDisabled}
                    />
                );
            default:
                return (
                    <>
                        <Typography variant="h5" component="h3">
                            CHYBA! VRAŤ SE ZPÁTKY
                        </Typography>
                    </>
                );
        }
    };

    return (
        <>
            <Button style={{ position: 'absolute', top: 10, left: 10, fontSize: '17px', fontWeight: 'bold' }} onClick={handleBack} disabled={isButtonDisabled}>Zpět</Button>
            {/*<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>*/}
                <Container component="main" maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px' }}>
                    <UserAuthBackground />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px' }}>
                        <img src="/logo/symphonia-logo.svg" alt="Logo" style={{ width: '175px' }} />
                        <Typography variant="h4" align="center" style={{ margin: '20px 0', color: theme.palette.text.primary}}>
                            {activeStep === 0 && 'Přijetí smluvních podmínek'}
                            {activeStep === 1 && 'Vytvoř si své uživatelské jméno'}
                            {activeStep === 2 && 'Zbylo jen trochu'}
                            {activeStep === 3 && 'Vyber si svého nejlepšího umělce'}
                            {activeStep === 4 && 'Vyber si své oblíbené žánry'}
                        </Typography>
                        <Typography variant="body1" align="center" style={{ marginBottom: '20px', color: theme.palette.text.primary }}>
                            {activeStep === 0 && 'Pokud chceš pokračovat, přečti si prosím podmínky a souhlas s nimi'}
                            {activeStep === 1 && 'Vyber si jedinečné uživatelské jméno pro svůj účet'}
                            {activeStep === 2 && 'Výběr profilového obrázku'}
                            {activeStep === 3 && 'Vyber si jednoho nebo 3 další umělce. To je nutné pro osobní doporučení'}
                            {activeStep === 4 && 'Vyber si jeden nebo tři žánry. To je nutné pro osobní doporučení'}
                        </Typography>

                        {getStepContent(activeStep)}
                    </div>
                </Container>
            {/*</div>*/}
        </>
    );
};

export default UserRegistrationPage;