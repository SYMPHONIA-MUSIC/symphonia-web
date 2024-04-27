import {Box, Theme} from '@mui/material';
import React from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AuthService from "../../logic/domain/AuthService";

type Props = {
    theme: Theme
};

const LogIn: React.FC<Props> = () => {


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
            <img src="/logo/artist-logo.svg" alt="Symphonia Artist Logo" />

            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 4 }}>
                Ahoj, vítej zpět!
            </Typography>
            <Typography sx={{ mt: 1 }}>
                Vrať se, a udělej velké věci ve světě hudby!
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
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
                        style: {color: theme.palette.text.primary}
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
                        style: {color: theme.palette.text.primary}
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
                                               sx={{
                                                   color: theme.palette.text.primary
                                               }}
                            />}
                            label="Pamatuj si mě"
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
                    sx={{mt: 3, mb: 2}}
                >
                    Přihlásit se
                </Button>

                <Box sx={{textAlign: 'center', mt: 2}}>
                    <Typography variant="body2" component="span" sx={{color: theme.palette.text.primary}}>
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

            <SocialLogin />
        </Box>
    )
}

export default LogIn;