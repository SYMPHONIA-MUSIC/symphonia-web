import React, {useContext, useState} from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Container,
    Box,
    ListItemSecondaryAction, ListItemText, ListItemAvatar, ListItem, List, ListItemProps
} from '@mui/material';

import UserAuthBackground from "../components/auth/background/UserAuthBackground";
import StyledTextField from "../components/global/StyledTextField";
import GradientButton from "../components/button/GradientButton";
import {styled, useTheme} from "@mui/material/styles";
import CircleImageUploader from "../components/auth/CircleImageUploader";

import SearchInput from "../components/global/SearchInput";
import CustomBackButton from "../components/global/CustomBackButton";
import AuthService from "../logic/domain/AuthService";
import {UIProcessContext} from "../contexts/UIProcessContext";

const artists = [
    { name: 'STEIN27', picture: '/mocks/stein27.jpg' },
    { name: 'DRAKE', picture: '/mocks/Scorpion_by_Drake.jpg' },
    { name: 'Alan Walker', picture: '/mocks/alanwalker.jpg' },
    { name: 'Calin', picture: '/mocks/calini.jpg' },
];

const genres = [
    { name: 'Rock', backgroundImage: '/mocks/genre/rock.jpeg' },
    { name: 'Rave', backgroundImage: '/mocks/genre/rave.jpg' },
    { name: 'Rap', backgroundImage: '/mocks/genre/rap.jpg' },
    { name: 'Rave', backgroundImage: '/mocks/genre/rave.jpg' },
    { name: 'Rap', backgroundImage: '/mocks/genre/rap.jpg' },
]

interface RegistrationState {
    username: string;
    termsAccepted: boolean;
    favoriteArtists: string[];
    favoriteGenres: string[];
}

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.grey[400],
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    justifyContent: 'space-between',
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backdropFilter: 'blur(10px)',
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1, 0),
    '& .MuiFormControlLabel-label': {
        marginRight: 'auto',
    },
}));

const StyledList = styled(List)(({ theme }) => ({
    width: '480px',
    maxHeight: '200px',
    overflow: 'auto',
    direction: 'rtl',
    '&::-webkit-scrollbar': {
        width: '0.2em',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
    },
    '& .MuiListItem-root': {
        direction: 'ltr',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            color: theme.palette.text.secondary,
        },
    },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
    },
}));

interface StyledListItemGenreProps extends ListItemProps {
    backgroundImage: string;
}

const StyledListItemGenre = styled(ListItem)<StyledListItemGenreProps>(({ theme, backgroundImage }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
    },
}));

const StyledListItemAvatar = styled(ListItemAvatar)({
    '& img': {
        width: '50px',
        height: '50px',
        borderRadius: '10%',
        objectFit: 'cover',
    },
    marginRight: '20px'
});

const UserRegistrationPage: React.FC = () => {
    const theme = useTheme()
    const { uiProcessContext, showMessage, setLoading, hideMessage } = useContext(UIProcessContext);

    const [marketingChecked, setMarketingChecked] = useState(false);
    const [shareDataChecked, setShareDataChecked] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const [state, setState] = useState<RegistrationState>({
        username: '',
        termsAccepted: false,
        favoriteArtists: [],
        favoriteGenres: [],
    });

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const handleSelectGenre = (genre: string) => {
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(genre)
                ? prevSelected.filter((g) => g !== genre)
                : [...prevSelected, genre]
        );
    };

    const checkUsernameAvailability = async () => {
        setLoading(true);
        try {
            const response = await AuthService.checkIfUsernameIsAvailable(state.username);
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

    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

    const handleSelectArtist = (artist: string) => {
        setSelectedArtists((prevSelected) =>
            prevSelected.includes(artist)
                ? prevSelected.filter((a) => a !== artist)
                : [...prevSelected, artist]
        );
    };


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, username: e.target.value });
    };

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, termsAccepted: e.target.checked });
    };

    const handleArtistsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, favoriteArtists: [...state.favoriteArtists, e.target.value] });
    };

    const handleGenresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, favoriteGenres: [...state.favoriteGenres, e.target.value] });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleMarketingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarketingChecked(event.target.checked);
    };

    const handleShareDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShareDataChecked(event.target.checked);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            window.location.href = '/other-page';
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <StyledTextField
                            label="Username"
                            value={state.username}
                            onChange={(e) => setState({ ...state, username: e.target.value })}
                            margin="normal"
                            fullWidth
                        />
                        <GradientButton variant="contained" onClick={checkUsernameAvailability}>
                            Další krok
                        </GradientButton>
                    </>
                );
            case 1:
                return (
                    <>
                        <CustomFormControlLabel
                            control={<CustomCheckbox checked={marketingChecked} onChange={handleMarketingChange} />}
                            label="Nechci dostávat marketingové zprávy od společnosti Symphonia"
                            labelPlacement="start"
                        />
                        <CustomFormControlLabel
                            control={<CustomCheckbox checked={shareDataChecked} onChange={handleShareDataChange} />}
                            label="Sdílet mé registrační údaje s poskytovateli obsahu společnosti Symphonia pro marketingové účely"
                            labelPlacement="start"
                        />
                        <GradientButton fullWidth onClick={handleNext}>
                            Další krok
                        </GradientButton>
                    </>
                );
            case 2:
                return (
                    <>
                        <CircleImageUploader onChange={() => {}} />
                        <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary, textAlign: 'center' }}>
                            V tuto chvíli si můžeš vybrat svůj profilový obrázek, pokud to v tuto chvíli nechceš udělat, nevadí, můžeš ho změnit v nastavení
                        </Typography>
                        <GradientButton variant="contained" onClick={handleNext}>
                            Další krok
                        </GradientButton>
                    </>
                );
            case 3:
                return (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            {/*<SearchIcon sx={{ mr: 1 }} />*/}
                            {/*<TextField fullWidth placeholder="Zadej jméno umělce" />*/}
                            <SearchInput />
                        </Box>

                        <StyledList>
                            {artists.map((artist, index) => (
                                <StyledListItem key={index}>
                                    <StyledListItemAvatar>
                                        <img src={artist.picture} alt={artist.name} />
                                    </StyledListItemAvatar>
                                    <ListItemText primary={artist.name} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            checked={selectedArtists.includes(artist.name)}
                                            onChange={() => handleSelectArtist(artist.name)}
                                        />
                                    </ListItemSecondaryAction>
                                </StyledListItem>
                            ))}
                        </StyledList>
                        <GradientButton variant="contained" sx={{ mt: 2 }} onClick={handleNext}>
                            Pokračovat
                        </GradientButton>
                        <Button color="secondary" onClick={handleNext}>Přeskočit</Button>
                    </>
                );
            case 4:
                return (
                    <>
                        <StyledList>
                            {genres.map((genre, index) => (
                                <StyledListItemGenre key={index} backgroundImage={genre.backgroundImage}>
                                    <ListItemText primary={genre.name} sx={{
                                        color: theme.palette.text.primary,
                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                    }} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            checked={selectedGenres.includes(genre.name)}
                                            onChange={() => handleSelectGenre(genre.name)}
                                        />
                                    </ListItemSecondaryAction>
                                </StyledListItemGenre>
                            ))}
                        </StyledList>
                        <GradientButton variant="contained" sx={{ mt: 2 }} onClick={handleNext}>
                            Pokračovat
                        </GradientButton>
                        <Button color="secondary" onClick={handleNext}>Přeskočit</Button>
                    </>
                );
            default:
                return (
                    <>
                        <Typography variant="h5" component="h3">
                            Registration complete!
                        </Typography>
                        <Button variant="contained" onClick={() => console.log(state)}>
                            Submit
                        </Button>
                    </>
                );
        }
    };

    return (
        <>
            <Button style={{ position: 'absolute', top: 10, left: 10, fontSize: '17px', fontWeight: 'bold' }} onClick={handleBack}>Zpět</Button>
            {/*<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>*/}
                <Container component="main" maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px' }}>
                    <UserAuthBackground />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px' }}>
                        <img src="/logo/symphonia-logo.svg" alt="Logo" style={{ width: '175px' }} />
                        <Typography variant="h4" align="center" style={{ margin: '20px 0', color: theme.palette.text.primary}}>
                            {activeStep === 0 && 'Vytvoř si své uživatelské jméno'}
                            {activeStep === 1 && 'Přijetí smluvních podmínek'}
                            {activeStep === 2 && 'Zbylo jen trochu'}
                            {activeStep === 3 && 'Vyber si svého nejlepšího umělce'}
                            {activeStep === 4 && 'Vyber si své oblíbené žánry'}
                        </Typography>
                        <Typography variant="body1" align="center" style={{ marginBottom: '20px', color: theme.palette.text.primary }}>
                            {activeStep === 0 && 'Vyber si jedinečné uživatelské jméno pro svůj účet'}
                            {activeStep === 1 && 'Pokud chceš pokračovat, přečti si prosím podmínky a souhlas s nimi'}
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