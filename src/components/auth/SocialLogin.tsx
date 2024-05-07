import React, {useContext} from 'react';
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {GoogleLogin} from "@react-oauth/google";
import {useTheme} from "@mui/material/styles";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import MyFacebookLoginButton from "../../utils/FacebookCustomButton";
import {LoginSocialFacebook, LoginSocialGoogle} from "reactjs-social-login";
import SocialAuthService from "../../logic/domain/SocialAuthService";
import {UIProcessContext} from "../../contexts/UIProcessContext";
import {CredentialsType} from "../../pages/AuthPage";
import {useNavigate} from "react-router-dom";

const SocialLogin: React.FC = () => {
    const theme = useTheme()
    const { uiProcessContext, showMessage, setLoading, hideMessage } = useContext(UIProcessContext)
    const navigate = useNavigate()


    const handleGoogleLogin = async (response: any) => {
        setLoading(true);
        console.log("Google Login Response:", response);
        const result = await SocialAuthService.sendGoogleIdToken(response.data.credential);
        if (result.authTypes === 'REGISTER') {
            sessionStorage.setItem('idToken', result.registrationData?.idToken as string)
            sessionStorage.setItem('predictableUsername', result.registrationData?.predictableUsername as string)
            sessionStorage.setItem('registrationType', 'user');
            sessionStorage.setItem('credentialsType', CredentialsType.GOOGLE);
            navigate('/auth/user-reg')
        } else if (result.authTypes === 'LOGIN') {
            navigate('/user/panel')
        } else {
            showMessage(result.errorMessage as string, 'error')
        }
        setLoading(false);
    };

    const handleFacebookLogin = async (response: any) => {
        setLoading(true);
        console.log("Facebook Login Response:", response);
        const result = await SocialAuthService.sendFacebookAccessToken(response.data.accessToken);
        if (result.authTypes === 'REGISTER') {
            sessionStorage.setItem('accessToken', result.registrationData?.accessToken as string)
            sessionStorage.setItem('predictableUsername', result.registrationData?.predictableUsername as string)
            sessionStorage.setItem('registrationType', 'user');
            sessionStorage.setItem('credentialsType', CredentialsType.FACEBOOK);
            navigate('/auth/user-reg')
        } else if (result.authTypes === 'LOGIN') {
            navigate('/user/panel')
        } else {
            showMessage(result.errorMessage as string, 'error')
        }
        setLoading(false);
    };


    const handleGoogleLoginError = (error: any) => {
        showMessage("Google Login Error: " + error.toString(), 'error');
    };

    const handleFacebookLoginError = (error: any) => {
        showMessage("Facebook Login Error: " + error.toString(), 'error');
    };

    return (
        <Box
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                width: '100%',
                textAlign: 'center',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '15px' }}>
                <Box sx={{ borderBottom: `2px solid ${theme.palette.text.primary}`, flexGrow: 1 }} />
                <Typography
                    sx={{
                        mx: 2,
                        color: theme.palette.text.primary,

                    }}
                >
                    Nebo
                </Typography>
                <Box sx={{ borderBottom: `2px solid ${theme.palette.text.primary}`, flexGrow: 1 }} />
            </Box>

            <LoginSocialGoogle
                isOnlyGetToken={true}
                typeResponse={"idToken"}
                client_id={""}
                onResolve={handleGoogleLogin}
                onReject={handleGoogleLoginError}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
            <LoginSocialFacebook
                isOnlyGetToken={true}
                appId={""}
                onResolve={handleFacebookLogin}
                onReject={handleFacebookLoginError}
            >
                <FacebookLoginButton />
            </LoginSocialFacebook>
        </Box>
    )
}

export default SocialLogin;